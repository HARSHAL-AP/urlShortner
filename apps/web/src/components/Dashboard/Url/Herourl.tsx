import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Flex,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  Heading,
  Link,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  ButtonGroup,
  Portal,
  PopoverFooter,
  Badge,
  useToast,
  Divider,FormControl,FormLabel,HStack,Tag,Textarea,Image
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import LinkCard from "../Linkcards";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  FaCopy,
  FaEdit,
  FaTag,
  FaTrash,
  FaEye,
  FaEllipsisV,
} from "react-icons/fa";
import { MdOutlineBarChart, MdOutlineDateRange } from "react-icons/md";
import { HiOutlineCursorClick } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import {updateData,getData} from "../../../services/api"
import {getSinleurl} from "../../../redux/urlSlice"

interface Herourl {
  link: {
    _id: string;
    title: string;
    originalUrl: string;
    shortUrl: string;
    linkDescription?: string;
    tags?: string[];
    createdAt: string;
    accessCount: number;
    expiryDate?: string;
    accessLogs: any;
  };
}
interface FormData {
  originalUrl: string;
  title: string;
  tags: string[];
  linkDescription: string;
  expiryDate: string;
}

const formatdate = (inputDateString: string) => {
  const inputDate = new Date(inputDateString);
  const formattedDate = inputDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return formattedDate;
};

const Herourl: React.FC<Herourl> = ({ link }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditOpen, setEditOpen] = useState(false);
  const [formData, setFormData] = React.useState<FormData>({
    originalUrl:link.originalUrl|| "",
    title:link.title|| "",
    tags:link.tags|| [],
    linkDescription:link.linkDescription|| "",
    expiryDate:link.expiryDate|| "",
  }); 
  const [newTag, setNewTag] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const accestoken = useSelector((state: RootState) => state.auth.accessToken);
  const data = useSelector((state: RootState) => state.urls.singleurl);
  const toast = useToast();
  const navigate = useNavigate();
  const handleCopy = () => {
    navigator.clipboard.writeText(link.shortUrl);
    toast({
      title: `Url copied to clipboard..`,
      position: "bottom-right",
      isClosable: true,
      status: "success",
    });
  };
  const handleLinkClick = () => {
    const newUrl = `http://localhost:8080/url/${link.shortUrl}`;
    window.open(newUrl, '_blank'); 
  };

  const handleChange = (key: keyof FormData, value: string | string[]) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));

    // Clear the URL error when the user modifies the URL
 
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
  const handleEditClick = () => {
 
    setEditOpen(true);
    onOpen();
  };
  const handleSubmit=async()=>{
  
  try {
   setLoading(true)
   const responce=await updateData(formData,`/url/update/${id}?accessToken=${accestoken}`)
   if(responce){
     getddata()
     toast({
      title: 'URL Updated successfully',
      status: 'success',
      duration: 5000, 
      isClosable: true,
    });
   }
  } catch (error) {
    toast({
      title: 'An error occurred while Updating the URL',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }finally{
   onClose()
   setLoading(false);
  }
}

  const getddata = async () => {
    try {
      setLoading(true);

      const response = await getData(
        `/url/get/${id}?accessToken=${accestoken}`
      );

      dispatch(getSinleurl(response));
    
    } catch (error) {
      alert("Internal Server Error");
    } finally {
      setLoading(false);

    }
  };
  if(loading){
    return <Box w="5%" m="auto" mt="25vh">
      <Image w="100%" src="https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-06-428_512.gif" alt="" />
    </Box>
  }
  return (
    <Box w="99%" borderWidth="1px" borderRadius="lg" mt="25px" bg="white">
      <Flex w="100%" p="25px" mt="5px" justifyContent="space-between">
        <Box w="70%" textAlign="left" ml="15px">
          <Heading as="h4" fontSize="25px" mb="23px">
            {link.title}
          </Heading>
          <Link
            
            color="blue.500"
            as="b"
            fontSize="18px"
            onClick={handleLinkClick}
          >
            {link.shortUrl}
          </Link>

          <Flex w="70%" overflow="hidden">
            <Text
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              fontSize="15px"
            >
              {link.originalUrl}
            </Text>
          </Flex>
          <Flex mt="5" w="100%" alignItems="left" gap="30px" flexWrap="wrap">
            <Button colorScheme="blue" variant="outline" h="30px">
              Total Clicks: {link.accessCount}
            </Button>
            <Flex alignItems="center" gap="3px">
              <MdOutlineDateRange />
              {formatdate(link.createdAt)}
            </Flex>
            <Flex alignItems="center" gap="3px">
              <FaTag />
              {link.tags?.length === 0 && (
                <Badge colorScheme="red">No Tag Present</Badge>
              )}
              {link.tags?.map((el, index) => (
                <Badge key={index} colorScheme="purple">
                  {" "}
                  {el}
                </Badge>
              ))}
            </Flex>
          </Flex>
        </Box>

        <Flex w="10%" justifyContent="flex-end" gap="5px">
          <IconButton
            icon={<FaCopy />}
            aria-label="View More Options"
            ml="2"
            w="35px"
            bg="green.500"
            color="white"
            onClick={handleCopy}
          />
          <IconButton
            icon={<FaEdit />}
            aria-label="View More Options"
            ml="2"
            w="35px"
            bg="blue.500"
            color="white"
            onClick={handleEditClick}
          />
        </Flex>
      </Flex>
      <Divider w="99%" m="auto" />
      <Box mt="15px" textAlign="left" pl="30px" pb="25px"><Text as="b" w="100%">Description: </Text><Text color="grey.900">{link.linkDescription}</Text></Box>
      <Box mt="15px" textAlign="left" pl="30px" pb="25px" ><Text as="b" w="100%">Expiry Date: </Text><Text color="red.500">{link.expiryDate}</Text></Box>
      <Modal isOpen={isOpen && isEditOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Link</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <form >
        

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

        
      </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
   
    </Box>
  );
};

export default Herourl;
