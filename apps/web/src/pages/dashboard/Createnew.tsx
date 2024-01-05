import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Box,
  Tag,
  TagLabel,
  HStack,
  Heading,
  FormErrorMessage,
  Flex,useToast
} from "@chakra-ui/react";
import { postData } from "../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
interface UrlFormProps {}

interface FormData {
  originalUrl: string;
  title: string;
  tags: string[];
  linkDescription: string;
  expiryDate: string;
}

const Createnew: React.FC<UrlFormProps> = () => {
  const [formData, setFormData] = React.useState<FormData>({
    originalUrl: "",
    title: "",
    tags: [],
    linkDescription: "",
    expiryDate: "",
  });

  const [newTag, setNewTag] = React.useState<string>("");
  const [urlError, setUrlError] = React.useState<string | null>(null);
  const navigate=useNavigate()
  const accessToken: any = useSelector(
    (state: RootState) => state.auth.accessToken
  );
  const toast = useToast()
  const handleChange = (key: keyof FormData, value: string | string[]) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));


    if (key === "originalUrl") {
      setUrlError(null);
    }
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      handleChange("tags", [...formData.tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    handleChange(
      "tags",
      formData.tags.filter((t) => t !== tag)
    );
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (
      formData.originalUrl.trim() === "" ||
      !urlRegex.test(formData.originalUrl)
    ) {
      setUrlError("Invalid URL format");
      return;
    }
    try {
      toast({
        title: 'Loading...',
        status: 'info',
        duration: null, 
        isClosable: false,
      });
      const res=await postData(formData, `/url/shortner?accessToken=${accessToken}`)
      toast.closeAll();

      
      toast({
        title: 'URL shortened successfully',
        status: 'success',
        duration: 5000, 
        isClosable: true,
      });
      navigate(`/dashboard/links/${res.url._id}`)
    } catch (error) {
      toast.closeAll();

    toast({
      title: 'An error occurred while shortening the URL',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
    }
  
  };

  return (
    <Box maxW="90%" m="auto" p="20px" bg="white">
      <Heading as="h3" size="lg" textAlign="left" color="blue.800">
        Create new
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={{ base: 4, md: 6 }}>
          <FormLabel mt="30px">Destination</FormLabel>
          <Input
            type="url"
            placeholder="https://myexample.com/long-url"
            value={formData.originalUrl}
            onChange={(e) => handleChange("originalUrl", e.target.value)}
            borderColor={urlError ? "red.500" : undefined}
          />
          {urlError && <FormErrorMessage>{urlError}</FormErrorMessage>}
        </FormControl>

        <FormControl mb={{ base: 4, md: 6 }}>
          <FormLabel>Title (optional)</FormLabel>
          <Input
            type="text"
            placeholder="Enter custom Title "
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </FormControl>

        <FormControl mb={{ base: 4, md: 6 }}>
          <FormLabel>Tags</FormLabel>
          <HStack spacing={2}>
            <Input
              type="text"
              placeholder="Add new tag"
              value={newTag}
              onChange={handleTagChange}
            />
            <Button
              size="md"
              colorScheme="teal"
              variant="outline"
              onClick={handleAddTag}
            >
              Add Tag
            </Button>
          </HStack>
          <Box mt={10}>
            {formData.tags.map((tag, index) => (
              <Tag
                key={index}
                size="md"
                variant="subtle"
                colorScheme="teal"
                cursor="pointer"
                ml="10px"
                mt="10px"
                onClick={() => handleRemoveTag(tag)}
              >
                <Flex h="30px" alignItems="center" justifyContent="center">
                  {tag}
                </Flex>
              </Tag>
            ))}
          </Box>
        </FormControl>

        <FormControl mb={{ base: 4, md: 6 }}>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Enter description (optional)"
            value={formData.linkDescription}
            onChange={(e) => handleChange("linkDescription", e.target.value)}
          />
        </FormControl>
        <FormControl mb={{ base: 4, md: 6 }}>
          <FormLabel>Expiry Date</FormLabel>
          <Input
            type="datetime-local"
            value={formData.expiryDate}
            onChange={(e) => handleChange("expiryDate", e.target.value)}
          />
        </FormControl>

        <Box mt={4}>
          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Createnew;
