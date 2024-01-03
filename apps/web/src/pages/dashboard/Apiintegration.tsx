import React from "react";
import {
  Box,
  Text,
  Flex,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  Heading,
  Link,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  ButtonGroup,
  Portal,
  PopoverFooter,

} from "@chakra-ui/react";
import Codeblock from "../../components/Dashboard/Codeblock";
const Apiintegration = () => {
  const schimaforPostreq = `{
  originalUrl:"string",
  linkDescription:"string",
  title:"string",
  tags: ["string"],
  expiryDate:"Date"
}`;
const reponce=`{ isError: false, shortUrl:Shortne URL  }`

  return (
    <Box w="99%" bg="white" borderRadius="15px" p="15px" textAlign="left">
      <Box w="100%" textAlign="left" ml="22px" mt="15px" fontSize="3xl">
        <Text as="b">API Intigration</Text>
      </Box>

      <Box w="99%" ml="18px" mt="30px" fontSize="xl">
        <Text>
          Welcome to the URL Shortning API documentation! This API procvides a
          simple and efficient way to shorten long URL's, Making them more
          convenient for sharing. Follow the instructions below to integrate the
          URL shortning functinality into your projects.
        </Text>
      </Box>
      <Heading size="md" ml="22px" mt="30px" color="blue.800">
        Base url
      </Heading>
      <Codeblock code="http://localhost:8080/url" />
      <Heading size="md" ml="22px" mt="30px" color="blue.800">
        Authentication
      </Heading>
      <Box w="99%" ml="18px" mt="15px" fontSize="18px">
        <Text>
          You'll need an API Access token, which you can acquire upon signing up
          with us. Once registered, the token is assigned to your account,
          enabling seamless integration and access to our services. To utilize
          these services, it's essential to pass this access token with your
          queries in the URL for authentication and secure usage.
        </Text>
      </Box>

      <Codeblock code="http://localhost:8080/url?accessToken=youraccessToken" />
      <Heading size="md" ml="22px" mt="30px" color="blue.800">
        Create Shorten Url
      </Heading>

      <Flex w={{ base: "80%", md: "50%" }} ml="5%" mt="25px">
        <Box w="30%">
          <Text fontSize="17px" as="b">
            Method:
          </Text>
        </Box>
        <Box w="70%">
          <Text fontSize="17px" as="b" ml="4">
            POST
          </Text>
        </Box>
      </Flex>
      <Flex w={{ base: "80%", md: "50%" }} ml="5%" mt="15px" alignItems="center">
        <Box w="30%">
          <Text fontSize="17px" as="b">
            Endpoint
          </Text>
        </Box>
        <Box w="70%">
          <Codeblock code="/shortner" />
        </Box>
      </Flex>
      <Flex w={{ base: "80%", md: "50%" }} ml="5%">
        <Box w="30%" mt="15px">
          <Text fontSize="17px" as="b" >
            Request Body Schema
          </Text>
        </Box>
        <Box w="70%">
          <Codeblock code={schimaforPostreq} />
        </Box>
      </Flex>
      <Flex w={{ base: "80%", md: "50%" }} ml="5%">
        <Box w="30%" mt="15px">
          <Text fontSize="17px" as="b" >
            Responce
          </Text>
        </Box>
        <Box w="70%">
          <Codeblock code={reponce} />
        </Box>
      </Flex>

      <Heading size="md" ml="22px" mt="30px" color="blue.800">
        How To visit Shortne URL
      </Heading>

      <Flex w={{ base: "80%", md: "50%" }} ml="5%" mt="25px">
        <Box w="30%">
          <Text fontSize="17px" as="b">
            Method:
          </Text>
        </Box>
        <Box w="70%">
          <Text fontSize="17px" as="b" ml="4">
           GET
          </Text>
        </Box>
      </Flex>
      <Flex w={{ base: "80%", md: "50%" }} ml="5%" mt="15px" alignItems="center">
        <Box w="30%">
          <Text fontSize="17px" as="b">
            Endpoint
          </Text>
        </Box>
        <Box w="70%">
          <Codeblock code="http://localhost:8080/url/shortUrl" />
        </Box>
      </Flex>
    </Box>
  );
};

export default Apiintegration;
