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
  Portal,
  PopoverFooter,Badge,useToast
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
    title:string;
    originalUrl: string;
    shortUrl: string;
    linkDescription?: string;
    tags?: string[];
    createdAt:string;
  };
}

const formatdate=(inputDateString:string)=>{
  const inputDate = new Date(inputDateString);
  const formattedDate = inputDate.toLocaleDateString('en-US',{ month: 'short', day: 'numeric', year: 'numeric' });
 
  return formattedDate;
}

const LinkCard: React.FC<LinkCardProps> = ({ link }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditOpen, setEditOpen] = useState(false);
  const toast = useToast()
  const navigate=useNavigate()
  const handleCopy = () => {
    
    navigator.clipboard.writeText(link.shortUrl);
    toast({
      title: `Url copied to clipboard..`,
      position: "bottom-right",
      isClosable: true,
      status:"success"
    })
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
      <Box w="70%" textAlign="left" ml="15px">
        <Heading as="h4" size="md">
        {link.title}
        </Heading>
        <Link
          href={`${process.env.REACT_APP_APILINK}/url/${link.shortUrl}`}
          color="blue.500"
          as="b"
        >
          {link.shortUrl}
        </Link>

        <Flex w="70%"  overflow="hidden">
          <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
            {link.originalUrl}
          </Text>
        </Flex>
        <Flex
          mt="5"
          w="100%"
          alignItems="left"
          gap="30px"
          flexWrap="wrap"
        >
          <Flex alignItems="center" gap="3px" >
            <MdOutlineBarChart />
            Total Clicks
          </Flex>
          <Flex alignItems="center" gap="3px">
            <MdOutlineDateRange />
           { formatdate(link.createdAt)}
          </Flex>
          <Flex alignItems="center" gap="3px">
            <FaTag />
            {link.tags?.map((el, index) => <Badge key={index} colorScheme='purple'> {el}</Badge>)}
          </Flex>
        </Flex>
      </Box>

      <Flex w="10%" justifyContent="flex-end"  gap="5px">
        <IconButton
          icon={<FaCopy />}
          aria-label="View More Options"
          ml="2"
          w="35px"
          bg="pink.500"
          color="white" 
          onClick={handleCopy}
        />
        <IconButton
          icon={<FaEye />}
          aria-label="View More Options"
          ml="2"
          w="35px"
          bg="blue.500"
          color="white"
          onClick={()=>navigate(`/dashboard/links/${link.shortUrl}`)}
        />
      </Flex>
    </Flex>
  );
};

export default LinkCard;
