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
  data:any
  
}

const Mostview:React.FC<ShortenedLink> = ({data}) => {
  return (
    <Box
    w="100%"
    bg="green.100"
    borderRadius="25px"
    p="20px"
    h="600px"
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
     {data&&data.map((el:any)=>{
          return <LinkCard2 key={el._id} link={el}/>
         })}
    </Box>
  </Box>
  )
}

export default Mostview