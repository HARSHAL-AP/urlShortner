import React, { useState } from "react";
import {
  chakra,
  Box,
  Flex,
  SimpleGrid,
  GridItem,
  VisuallyHidden,
  Button,
  Stack,
  Icon,
  Heading,FormControl,
  FormLabel,
  Input,Textarea
} from "@chakra-ui/react";
import Longurlbox from "./Longurlbox";
import { getData, postData } from "../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";


interface FeatureProps {
  children: React.ReactNode;
}

const Feature: React.FC<FeatureProps> = (props: FeatureProps) => (
  
  <Flex alignItems="center" _dark={{ color: "black" }}>
    <Icon
      boxSize={4}
      mr={1}
      color="green.600"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      ></path>
    </Icon>
    {props.children}
  </Flex>
);

const Hero: React.FC = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shorturl, setshorturl] = useState("");
 const navigate=useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongUrl(e.target.value);
  };
  const accessToken: any = useSelector(
    (state: RootState) => state.auth.accessToken
  );
  const isAuthenticated: any = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const clickHandler = () => {
    //postData({originalUrl:longUrl}).then((r)=>{
    //  console.log(r)
    //  setshorturl(r.shortUrl)
    //}).catch((e)=>{
    //  console.log(e)
    //})
  };

  return (
    <Box px={4} py={32} mx="auto" bg="white" >
      <Box
        w={{ base: "full", md: 11 / 12, xl: 8 / 12 }}
        textAlign={{ base: "left", md: "center" }}
        mx="auto"
     
      >
        <chakra.h1
          mb={3}
          fontSize={{ base: "4xl", md: "6xl" }}
          bgClip="text"
          fontWeight={{ base: "bold", md: "extrabold" }}
          bgGradient="linear(to-r, green.400,purple.500)"
        >
          Unleash the Power of Shortened URLs .
        </chakra.h1>
        <chakra.p
          mb={6}
          fontSize={{ base: "xl", md: "2xl" }}
          color="gray.900"
          lineHeight="base"
        >
          Create short Links. Share them anywhere with tracking.
        </chakra.p>
        <Box
          w={{ base: "98%", md: "70%" }}
          m="auto"
         
          border="2px solid blue"
          mt="30px"
          borderRadius="10px"
          boxShadow='2xl'
          p="7"
        >
          <Heading textAlign="left" fontSize="2xl">Shorten a long link</Heading>
          <form>
          <FormControl mb={{ base: 4, md: 6 }}>
          <FormLabel mt="30px" fontWeight="700" fontSize="md">Paset a long URL</FormLabel>
          <Input
            type="url"
            placeholder="https://myexample.com/long-url"
            h="45px"
          
          />
         
        </FormControl>
        <FormControl mb={{ base: 4, md: 6 }}>
          <FormLabel mt="30px" fontWeight="700" fontSize="md">Title</FormLabel>
          <Input
            type="text"
            placeholder="Enter title for your url"
            h="45px"
          
          />
         
        </FormControl>
        <FormControl mb={{ base: 4, md: 6 }}>
          <FormLabel mt="30px" fontWeight="700" fontSize="md">Description</FormLabel>
          <Textarea
            placeholder="Enter description (optional)"
           
          />
         
        </FormControl>
        {isAuthenticated&&<Button mb="5" colorScheme="blue" variant="outline">Creaet </Button>}
        {!isAuthenticated&&<Button mb="5" colorScheme="blue" variant="outline">Signup and get your link </Button>}
        
        
      
          </form>
          <Stack
            display="flex"
            direction={{ base: "column", md: "row" }}
            justifyContent={{ base: "start", md: "center" }}
            mb={3}
            spacing={{ base: 2, md: 8 }}
            fontSize="xs"
            color="gray.600"
          >
            <Feature>Custom Short URLs </Feature>
            <Feature>Links Management </Feature>
            <Feature>Link Analytics </Feature>
          </Stack>
        </Box>

        {shorturl && (
          <Longurlbox
            linkUrl={`http://localhost:8080/url/${shorturl}`}
            description="Plese click on url or Click Button to visit ."
          />
        )}
      </Box>
    </Box>
  );
};

export default Hero;
