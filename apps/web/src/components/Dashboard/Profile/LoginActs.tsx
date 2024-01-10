import React from 'react';
import { Box, Flex, Text, Button,Avatar,Heading,Tag,TagLabel,TagRightIcon} from "@chakra-ui/react";
import { MdLogout,MdLaptopWindows } from "react-icons/md";
const LoginActs = () => {
  return (
    <Flex w="100%"   p="10px" mt="20px" bg="gray.100" borderRadius="10px">
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <MdLaptopWindows/>

        <Box>
          <Heading size='sm' textAlign="left">Chrome 120.0 (Windows 10.0.0)</Heading>
          <Text textAlign="left"> 10 Jan, 2024 at 1:44 PM</Text>
        </Box>
      </Flex>
      <Tag size="md" variant='outline' colorScheme='blue'>
      <TagLabel>SignOut</TagLabel>
      <TagRightIcon as={MdLogout} />
    </Tag>
    </Flex>
  );
};

export default LoginActs;
