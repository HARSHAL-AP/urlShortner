import React, { useState, useCallback,useEffect } from "react";
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
  Text,Image
} from "@chakra-ui/react";
type Props = {}

const AdUrlAnalytics = (props: Props) => {
  return (
    <Box mx="auto" w="100%">
    <Heading as="h3" size="lg" textAlign="left" mt="20px" ml="30px">
    URL Analytics
    </Heading>
    <Box mt="5">
    
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
              
              <Heading fontSize="30px">{654998} </Heading>
            </Flex>
            <Flex alignItems="center" m="auto" justifyContent="center">
              
              <Heading fontSize="24px" color="green">
               {589}+ Clikcs
              </Heading>
            </Flex>
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
          
          
          </Flex>
        </Box>
        <Box
          w="100%"
          bg="white"
          borderRadius="25px"
          p="20px"
          h="600px"
          mt="20px"
          overflow="auto"
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          }}
        >
          <Flex>
            <Heading size="sm">Clicks by Location</Heading>
           
          </Flex>
         
        </Box>
      </Box>
    </Flex>
  </Box>
  )
}

export default AdUrlAnalytics