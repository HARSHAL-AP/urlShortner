import React from 'react'
import { Box, VStack, Text, Divider, IconButton, Flex,Heading,Button } from '@chakra-ui/react';


type Props = {}

const Fotter = (props: Props) => {
  return (
    <>
     <Box
     w="100%"
     h="300px"
     bgColor="blue.900"
    
     >
    <Heading pt="50px" color="white">Get closer to your audience and customers today</Heading>
    <Button mt="35px" h="50px" colorScheme='blue'>Start for free</Button>
    </Box>
    <Box w="100%"  pt="50px">
     <Flex w="80%" m="auto"   flexDirection={{base:"column",md:"row"}}>
       <Flex gap="20px" w="100%" >
        <Text as="b">
          Integration & API
        </Text>
        <Text as="b">
          URL Shortner 
        </Text>
        <Text as="b">
          About
        </Text>
       </Flex>
       <Flex  w="100%" justifyContent={{base:"center",md:"flex-end"}}> <Text fontSize="xl" as="b">Swiflink</Text></Flex>
      
     </Flex>
     <Flex w="100%" alignItems="center" justifyContent="center" mt="25px" bgColor="black" color="white">
      <Text>
      @2024 swifltlink. 
      </Text>
    
     </Flex>

    </Box>
    </>
   
  )
}

export default Fotter