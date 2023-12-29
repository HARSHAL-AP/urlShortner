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
  PopoverFooter,
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
    originalUrl: string;
    shortUrl: string;
    linkDescription?: string;
    tags?: string[];
  };
}

const LinkCard: React.FC<LinkCardProps> = ({ link }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditOpen, setEditOpen] = useState(false);

  const handleCopy = () => {
    // Implement copy to clipboard logic here
    navigator.clipboard.writeText(link.shortUrl);
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
          Title
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
          
        >
          <Flex alignItems="center" gap="3px">
            <MdOutlineBarChart />
            Total Clicks
          </Flex>
          <Flex alignItems="center" gap="3px">
            <MdOutlineDateRange />
            Dec 19, 2023
          </Flex>
          <Flex alignItems="center" gap="3px">
            <FaTag />
            {link.tags?.map((el, index) => el)}
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
        />
        <IconButton
          icon={<FaEye />}
          aria-label="View More Options"
          ml="2"
          w="35px"
          bg="blue.500"
          color="white"
        />
      </Flex>
    </Flex>
  );
};

export default LinkCard;
