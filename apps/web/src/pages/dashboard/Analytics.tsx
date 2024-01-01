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
import Piecahrt from "../../components/Dashboard/Analytics/Piecahrt";
import { MdOutlineTrendingUp } from "react-icons/md";
import LinkCard2 from "../../components/Dashboard/Analytics/Linkcards2";
import Expirinurls from "../../components/Dashboard/Analytics/Expirinurls";
import Mostview from "../../components/Dashboard/Analytics/Mostview";


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
                
                <Heading fontSize="30px">{formattedDate} </Heading>
              </Flex>
              <Flex alignItems="center" m="auto" justifyContent="center">
                
                <Heading fontSize="24px" color="green">
                  85+ Clikcs
                </Heading>
              </Flex>
            </Box>
          </Box>
          <Expirinurls/>
          <Mostview/>
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
