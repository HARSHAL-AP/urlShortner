import React, { useState, useCallback } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Modal,
  IconButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spacer,
  Text,
} from "@chakra-ui/react";
import LinkCard2 from "./Linkcards2";
interface ShortenedLink {
    longUrl: string;
    shortUrl: string;
    description?: string;
    customDomain?: string;
    tags?: string[];
  }
const shortenedLinks: ShortenedLink[] = [
    {
      longUrl: "https://example.com/long-url-1",
      shortUrl: "https://sho.rt/abc123",
      description: "This is a test link with a description.",
      customDomain: "mycustomdomain.com",
      tags: ["tag1", "tag2"],
    },
  ];

const Mostview = () => {
  return (
    <Box
    w="100%"
    bg="blue.100"
    borderRadius="25px"
    p="20px"
    h="400px"
    mt="20px"
  >
    <Flex>
      <Heading size="sm" color="blue.600">
        {" "}
        Most Views
      </Heading>
    </Flex>
    <Box
      overflow="auto"
      h="90%"
      mt="10px"
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
      }}
    >
      <LinkCard2 link={shortenedLinks[0]} />
      <LinkCard2 link={shortenedLinks[0]} />
      <LinkCard2 link={shortenedLinks[0]} />
    </Box>
  </Box>
  )
}

export default Mostview