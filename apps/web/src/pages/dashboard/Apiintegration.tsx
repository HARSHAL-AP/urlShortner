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
  Center,
} from "@chakra-ui/react";
import Codeblock from "../../components/Dashboard/Codeblock";
import { useNavigate } from "react-router-dom";
const Apiintegration = () => {
  const navigate=useNavigate()
  return (
    <Box w="99%" bg="white" borderRadius="15px" p="15px" textAlign="left">
      <Box w="100%" textAlign="left" ml="22px" mt="15px" fontSize="3xl">
        <Text as="b">API Intigration</Text>
      </Box>

      <Box w="75%" ml="18px" mt="30px" fontSize="xl" textAlign="justify">
        <Text fontSize="xl" mt="25px" fontWeight="600">
          Welcome to SwifLink APIs– Your Ultimate URL Shortener Solution!
        </Text>
        <Text fontSize="lg" mt="25px">
          In the fast-paced digital landscape, where brevity and efficiency
          reign supreme, SwifLink emerges as your go-to URL shortening platform.
          Designed with simplicity and user-friendliness in mind, SwifLink
          empowers users to effortlessly create concise and shareable shortened
          URLs, streamlining the way we share information online.
        </Text>
        <Text fontSize="lg" mt="25px">
          SwifLink isn't just a conventional URL shortener; it's a dynamic
          platform equipped with a robust API, allowing seamless integration
          into your projects and applications. Whether you're a developer
          looking to enhance user experience or a business aiming to optimize
          link management, SwifLink's API provides a versatile solution tailored
          to your specific needs.
        </Text>
        <Text fontSize="lg" mt="25px">
          Beyond simplifying URL management, SwifLink offers advanced analytics
          to track the performance of your shortened links. Gain insights into
          click-through rates, geographical location of users, and more,
          enabling you to make data-driven decisions for your online presence.
        </Text>
        <Text fontSize="lg" mt="25px">
          Additionally, SwifLink prioritizes security. Enjoy peace of mind with
          features like link expiration, password protection, and access
          controls. Whether you're sharing links personally or for business,
          SwifLink ensures that your data and links are secure.
        </Text>
        <Center
          w="30%"
          h="35px"
          bg="blue.400"
          m="auto"
          mt="25px"
          color="white"
          p="2"
          borderRadius="10px"
          cursor="pointer"
          onClick={()=>navigate("/apidocs")}
        >
          Visit Documetation now
        </Center>
      </Box>
    </Box>
  );
};

export default Apiintegration;
