import React, { useState } from "react";
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
  ButtonGroup,useToast
} from "@chakra-ui/react";

import {
  FaCopy,
  FaEdit,
  FaTag,
  FaTrash,
  FaEye,
  FaEllipsisV,
} from "react-icons/fa";
import { MdOutlineBarChart, MdOutlineDateRange } from "react-icons/md";
import { useNavigate } from "react-router-dom";
interface LinkCardProps {
  link: {
    title: string;
    originalUrl: string;
    shortUrl: string;
    linkDescription?: string;
    tags?: string[];
    createdAt: string;
    _id:string;
  };
}

const LinkCard2: React.FC<LinkCardProps> = ({ link }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditOpen, setEditOpen] = useState(false);
  const toast = useToast()
  const navigate=useNavigate()
  const handleCopy = () => {
    navigator.clipboard.writeText(`${process.env.REACT_APP_APILINK}/url/${link.shortUrl}`);
    toast({
      title: `Url copied to clipboard..`,
      position: "bottom-right",
      isClosable: true,
      status:"success"
    })
  };

  const handleEdit = () => {
    setEditOpen(true);
  };

  const handleView = () => {
    onOpen();
  };

  const handleDelete = () => {};

  const handleModalClose = () => {
    setEditOpen(false);
    onClose();
  };
  const handleLinkClick = () => {
    const newUrl = `http://localhost:8080/url/${link.shortUrl}`;
    window.open(newUrl, '_blank'); 
  };

  return (
    <Flex
      w="99%"
      p="25px"
      borderWidth="1px"
      borderRadius="lg"
      mt="5px"
      justifyContent="space-between"
      bg="white"
    >
      <Box textAlign="left" ml="15px">
        <Heading as="h4" size="md">
          {link.title}
        </Heading>
        <Link  onClick={handleLinkClick} color="blue.500" as="b">
          {link.shortUrl}
        </Link>
        <br />
        <Link href={link.originalUrl}>{link.originalUrl}</Link>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>More Options</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button leftIcon={<FaTrash />} onClick={handleDelete}>
              Delete
            </Button>
            <Button leftIcon={<FaEye />} onClick={handleView}>
              View More
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Flex
        justifyContent="flex-end"
        flexDirection={{ base: "column", md: "row" }}
      >
        <IconButton
          icon={<FaCopy />}
          aria-label="Copy Link"
          onClick={handleCopy}
          bg="green.500"
          color="white" 
        />
           <IconButton
              icon={<FaEye />}
              aria-label="View More Options"
              ml="2"
              bg="blue.500"
              color="white"
              onClick={()=>navigate(`/dashboard/links/${link._id}`)}
            />
        
      </Flex>
    </Flex>
  );
};

export default LinkCard2;
