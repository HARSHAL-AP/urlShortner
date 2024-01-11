import React from 'react';
import { Box, Flex, Text, Button,Avatar,Heading,Tag,TagLabel,TagRightIcon} from "@chakra-ui/react";
import { MdLogout,MdLaptopWindows } from "react-icons/md";

interface LoginActsProps{
  item:any;
  onLogout:any;
}


const LoginActs:React.FC<LoginActsProps> = ({item,onLogout}) => {
  
  return (
    <Flex w="100%"   p="10px" mt="20px" bg="gray.100" borderRadius="10px">
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <MdLaptopWindows/>

        <Box>
          <Heading size='sm' textAlign="left">{item.device.type}</Heading>
          <Text textAlign="left">{item.timestamp}</Text>
        </Box>
      </Flex>
      <Tag size="md" variant='outline' colorScheme='blue'>
      <TagLabel onClick={()=>onLogout(item._id)}>SignOut</TagLabel>
      <TagRightIcon as={MdLogout} />
    </Tag>
    </Flex>
  );
};

export default LoginActs;
