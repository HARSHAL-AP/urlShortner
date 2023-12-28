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
import Filters from "../../components/Dashboard/Filters";
import Piecahrt from "../../components/Dashboard/Piecahrt";
import { MdOutlineTrendingUp } from "react-icons/md";
import LinkCard2 from "../../components/Dashboard/Linkcards2";
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
const Analytics = () => {
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  const today = new Date();
  const formattedDate = today.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Box mx="auto" w="100%">
      <Heading as="h3" size="lg" textAlign="left" mt="20px" ml="30px">
        Analytics
      </Heading>
      <Box>
        <Filters />
      </Box>
      <Flex w="98%" ml="20px" mt="25px" gap="20px">
        <Box w="50%">
          <Box
            w="100%"
            bg="white"
            borderRadius="25px"
            p="20px"
            h="200px"
            mt="20px"
          >
            <Flex>
              <Heading size="sm">Clicks over Time</Heading>
            </Flex>
            <Box w="100%" mt="20px">
              <Flex alignItems="center" m="auto" justifyContent="center">
                {" "}
                <Heading fontSize="30px">{formattedDate} </Heading>
              </Flex>
              <Flex alignItems="center" m="auto" justifyContent="center">
                {" "}
                <Heading fontSize="24px" color="green">
                  85+ Clikcs{" "}
                </Heading>
              </Flex>
            </Box>
          </Box>
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
          <Box
            w="100%"
            bg="red.100"
            borderRadius="25px"
            p="20px"
            h="400px"
            mt="20px"
          >
            <Flex>
              <Heading size="sm" color="red">
                Expiring soon
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
        </Box>
        <Box w="50%">
          <Box
            w="100%"
            bg="white"
            borderRadius="25px"
            p="20px"
            h="400px"
            mt="20px"
          >
            <Flex>
              <Heading size="sm">Clicks by Divice</Heading>
            </Flex>
            <Flex
              m="auto"
              alignItems="center"
              justifyContent="center"
              w="100%"
              mt="20px"
            >
              {" "}
              <Piecahrt />
            </Flex>
          </Box>
          <Box
            w="100%"
            bg="white"
            borderRadius="25px"
            p="20px"
            h="600px"
            mt="20px"
          >
            <Flex>
              <Heading size="sm">Clicks by Location</Heading>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Analytics;
