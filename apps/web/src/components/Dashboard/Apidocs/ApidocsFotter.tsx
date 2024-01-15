import React from "react";
import {
  Box,
  VStack,
  Text,
  Divider,
  IconButton,
  Flex,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
type Props = {}

const ApidocsFotter = (props: Props) => {
    const navigate=useNavigate()
  return (
    <Box w="100%" pt="50px">
    <Flex w="80%" m="auto" flexDirection={{ base: "column", md: "row" }}>
      <Flex gap="20px" w="100%">
        <Text as="b">Integration & API</Text>
        <Text as="b">URL Shortner</Text>
        <Text as="b">About</Text>
      </Flex>
      <Flex w="100%" justifyContent={{ base: "center", md: "flex-end" }}>
        {" "}
        <Text fontSize="xl" as="b" onClick={()=>navigate("/")}>
          Swiflink
        </Text>
      </Flex>
    </Flex>
    <Flex
      w="100%"
      alignItems="center"
      justifyContent="center"
      mt="25px"
      bgColor="gray"
      color="white"
    >
      <Text>@2024 swifltlink.</Text>
    </Flex>
  </Box>
  )
}

export default ApidocsFotter