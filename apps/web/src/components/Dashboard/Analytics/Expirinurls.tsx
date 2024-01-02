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
import { elements } from "chart.js";
interface ShortenedLink {
    data:any
    
  }

const Expirinurls:React.FC<ShortenedLink> = ({data}) => {
   if(data&&data.length==0){
    return <Box display="none"></Box>
   }
    return (
        <Box
        w="100%"
        bg="red.100"
        borderRadius="25px"
        p="20px"
        h="400px"
        mt="20px"
      >
        <Flex>
          <Heading size="sm" color="red.500">
            {" "}
            Expiring Soon 
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
        

         {data&&data.map((el:any)=>{
          return <LinkCard2 key={el._id} link={el}/>
         })}
        </Box>
      </Box>
      )
}

export default Expirinurls