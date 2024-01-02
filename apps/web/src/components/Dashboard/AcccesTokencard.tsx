import React, { useState } from "react";
import { Box, Text, Heading, Button, Flex, Divider, IconButton } from "@chakra-ui/react";
import { BsQuestion } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const AcccesTokencard: React.FC = () => {

  const accessToken: any = useSelector((state: RootState) => state.auth.accessToken);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(accessToken);
  };

   


  return (
    <Box  borderRadius="5px" p="4" mt="30px" mb="30px" bg="white" w="99%">
      <Text fontSize="sm" fontWeight="bold" textAlign="left">
        ACCESS TOKEN
      </Text>
      <Flex w="100%" mt="25px" gap="20px">
        <Heading fontSize="2xl" mb="2">
          {accessToken}
        </Heading>
        <Button size="sm" onClick={handleCopyToClipboard}>
          Copy to Clipboard
        </Button>
      </Flex>
      <Divider mt="20px"></Divider>
      <Text fontSize="lg" fontWeight="bold" textAlign="left" mt='30px'>
        How to Use
      </Text>
      <Flex w="100%" mt="25px" gap="30px" alignItems="center">
       <Box  as='button' w="45px" h="45px"  >
       <IconButton
            aria-label="Dashboard"
            icon={<BsQuestion/>}
            bg="orange.300"
            size="lg"
            isRound
            mr={3} 
          />
       </Box>
       <Box textAlign="left">
        <Text color="teal.400" as="b" fontSize='md'>
            QUERY PARAMETER
        </Text>
        <br/>
        <Text fontSize='md' as="b">{`http://localhost:8080/url?token=${accessToken}`}</Text>
       </Box>

      </Flex>
    </Box>
  );
};

export default AcccesTokencard;
