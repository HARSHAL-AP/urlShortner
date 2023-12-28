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
  FormErrorMessage,Flex
} from "@chakra-ui/react";

interface UrlFormProps {}

interface FormData {
  longUrl: string;
  title: string;
  tags: string[];
  description: string;
}

const Createnew: React.FC<UrlFormProps> = () => {
  const [formData, setFormData] = React.useState<FormData>({
    longUrl: "",
    title: "",
    tags: [],
    description: "",
  });

  const [newTag, setNewTag] = React.useState<string>("");
  const [urlError, setUrlError] = React.useState<string | null>(null);

  const handleChange = (key: keyof FormData, value: string | string[]) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));

    // Clear the URL error when the user modifies the URL
    if (key === 'longUrl') {
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
    handleChange("tags", formData.tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (formData.longUrl.trim() === '' || !urlRegex.test(formData.longUrl)) {
      setUrlError('Invalid URL format');
      return;
    }

 
    console.log('Form submitted successfully!');
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
            value={formData.longUrl}
            onChange={(e) => handleChange("longUrl", e.target.value)}
            borderColor={urlError ? "red.500" : undefined} 
          />
          {urlError && (
            <FormErrorMessage>{urlError}</FormErrorMessage>
          )}
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
              colorScheme='teal' variant='outline'
              onClick={handleAddTag}
            >
              Add Tag
            </Button>
          </HStack>
          <Box mt={10} >
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
                <Flex h="30px" alignItems="center" justifyContent="center">{tag}</Flex>
              </Tag>
            ))}
          </Box>
        </FormControl>

        <FormControl mb={{ base: 4, md: 6 }}>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Enter description (optional)"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </FormControl>
        <FormControl mb={{ base: 4, md: 6 }}>
          <FormLabel>Expiry Date</FormLabel>
          <Input
              type="date"
              
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
