import React, { useState } from "react";
import {
  chakra,
  Box,
  Flex,
  SimpleGrid,
  GridItem,
  VisuallyHidden,
  Input,
  Button,
  Stack,
  Icon,
} from "@chakra-ui/react";
import Longurlbox from "./Longurlbox";
import { getData,postData } from "../../services/api";

interface FeatureProps {
  children: React.ReactNode;
}

const Feature: React.FC<FeatureProps> = (props: FeatureProps) => (
  <Flex alignItems="center" _dark={{ color: "black" }}>
    <Icon boxSize={4} mr={1} color="green.600" viewBox="0 0 20 20" fill="currentColor">
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
  const [shorturl,setshorturl]=useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongUrl(e.target.value);
  };

  const clickHandler = () => {
   //postData({originalUrl:longUrl}).then((r)=>{
   //  console.log(r)
   //  setshorturl(r.shortUrl)
   //}).catch((e)=>{
   //  console.log(e)
   //})
  };

  return (
    <Box px={4} py={32} mx="auto">
      <Box w={{ base: "full", md: 11 / 12, xl: 8 / 12 }} textAlign={{ base: "left", md: "center" }} mx="auto">
        <chakra.h1
          mb={3}
          fontSize={{ base: "4xl", md: "5xl" }}
          fontWeight={{ base: "bold", md: "extrabold" }}
          color="gray.900"
          _dark={{ color: "gray.100" }}
          lineHeight="shorter"
        >
          SwiftLinks
        </chakra.h1>
        <chakra.p mb={6} fontSize={{ base: "lg", md: "xl" }} color="gray.500" lineHeight="base">
          Unleash the Power of Shortened URLs for Seamless Sharing and Maximum Impact.
        </chakra.p>
        <SimpleGrid
          as="form"
          w={{ base: "full", md: 7 / 12 }}
          columns={{ base: 1, lg: 6 }}
          spacing={3}
          pt={1}
          mx="auto"
          mb={8}
        >
          <GridItem as="label" colSpan={{ base: "auto", lg: 4 }}>
            <VisuallyHidden>Paste your long URL here...</VisuallyHidden>
            <Input
              mt={0}
              size="lg"
              type="url"
              placeholder="Paste your long URL here..."
              required
              value={longUrl}
              onChange={handleChange}
            />
          </GridItem>
          <Button
            as={GridItem}
            w="full"
            variant="solid"
            colSpan={{ base: "auto", lg: 2 }}
            size="lg"
            type="button" // Use "button" type for non-form submit buttons
            colorScheme="blue"
            cursor="pointer"
            onClick={clickHandler}
          >
            Shorten URL
          </Button>
        </SimpleGrid>
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
