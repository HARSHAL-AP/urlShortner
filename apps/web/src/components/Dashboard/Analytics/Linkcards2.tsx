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
  ButtonGroup,
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

interface LinkCardProps {
  link: {
    title:string;
    originalUrl: string;
    shortUrl: string;
    linkDescription?: string;
    tags?: string[];
    createdAt:string;
  };
}

const LinkCard2: React.FC<LinkCardProps> = ({ link }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditOpen, setEditOpen] = useState(false);

  const handleCopy = () => {
    // Implement copy to clipboard logic here
    navigator.clipboard.writeText(link.shortUrl);
  };

  const handleEdit = () => {
    setEditOpen(true);
    // You may want to pass the link data to the modal for editing
  };

  const handleView = () => {
    // Implement view more options logic here
    // For simplicity, just toggle the modal
    onOpen();
  };

  const handleDelete = () => {
    // Implement delete logic here
  };

  const handleModalClose = () => {
    setEditOpen(false);
    onClose();
  };

  return (
    <Flex w="99%" p="25px" borderWidth="1px" borderRadius="lg" mt="5px" justifyContent="space-between" bg="white">
      <Box textAlign="left" ml="15px">
        
        <Heading as="h4" size="md">
          {link.title}
        </Heading>
        <Link href={link.shortUrl} color="blue.500" as="b">
          {link.shortUrl}
        </Link>
        <br />
        <Link href={link.originalUrl}>{link.originalUrl}</Link>
    
      </Box>

      
     
      {/* View Modal */}
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

      <Flex justifyContent="flex-end" flexDirection={{ base: "column", md: "row"} }>
          <IconButton
            icon={<FaCopy />}
            aria-label="Copy Link"
            onClick={handleCopy}
          />
          
          <Popover>
            <PopoverTrigger>
              <IconButton
                icon={<FaEllipsisV />}
                aria-label="View More Options"
                ml="2"
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>More Options</PopoverHeader>
              <PopoverBody>
                <ButtonGroup>
                  <Button leftIcon={<FaTrash />} onClick={handleDelete}>
                    Delete
                  </Button>
                  <Button leftIcon={<FaEye />} >
                    View More
                  </Button>
                </ButtonGroup>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
    </Flex>
  );
};

export default LinkCard2;
