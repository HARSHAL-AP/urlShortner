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
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  FormErrorMessage,
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

interface HeroProps {
  signufun: () => void;
}
interface FormData {
  originalUrl: string;
  title: string;
  tags?: string[];
  linkDescription: string;
  expiryDate?: string;
}

const Hero: React.FC<HeroProps> = ({ signufun }) => {
  const [formData, setFormData] = React.useState<FormData>({
    originalUrl: "",
    title: "",
    tags: [],
    linkDescription: "",
    expiryDate: "",
  });
  const toast = useToast();
  const [urlError, setUrlError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const accessToken: any = useSelector(
    (state: RootState) => state.auth.accessToken
  );

  const isAuthenticated: any = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleChange = (key: keyof FormData, value: string | string[]) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));

    if (key === "originalUrl") {
      setUrlError(null);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (
      formData.originalUrl.trim() === "" ||
      !urlRegex.test(formData.originalUrl)
    ) {
      setUrlError("Invalid URL format");
      return;
    }
    try {
      toast({
        title: "Loading...",
        status: "info",
        duration: null,
        isClosable: false,
      });
      const res = await postData(
        formData,
        `/url/shortner?accessToken=${accessToken}`
      );
      toast.closeAll();
      
      toast({
        title: "URL shortened successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(`/dashboard/links/${res.url._id}`)
    } catch (error) {
      toast.closeAll();

      toast({
        title: "An error occurred while shortening the URL",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box px={4} py={32} mx="auto" bg="white">
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
          boxShadow="2xl"
          p="7"
        >
          <Heading textAlign="left" fontSize="2xl">
            Shorten a long link
          </Heading>
          <form>
            <FormControl mb={{ base: 4, md: 6 }}>
              <FormLabel mt="30px" fontWeight="700" fontSize="md">
                Past your long URL
              </FormLabel>
              <Input
                type="url"
                placeholder="https://myexample.com/long-url"
                h="45px"
                value={formData.originalUrl}
                onChange={(e) => handleChange("originalUrl", e.target.value)}
                borderColor={urlError ? "red.500" : undefined}
              />
              {urlError && <FormErrorMessage>{urlError}</FormErrorMessage>}
            </FormControl>
            <FormControl mb={{ base: 4, md: 6 }}>
              <FormLabel mt="30px" fontWeight="700" fontSize="md">
                Title
              </FormLabel>
              <Input
                type="text"
                placeholder="Enter title for your url"
                h="45px"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </FormControl>
            <FormControl mb={{ base: 4, md: 6 }}>
              <FormLabel mt="30px" fontWeight="700" fontSize="md">
                Description
              </FormLabel>
              <Textarea
                placeholder="Enter description (optional)"
                value={formData.linkDescription}
                onChange={(e) =>
                  handleChange("linkDescription", e.target.value)
                }
              />
            </FormControl>
            {isAuthenticated && (
              <Button
                mb="5"
                colorScheme="blue"
                variant="outline"
                onClick={handleSubmit}
              >
                Creaet{" "}
              </Button>
            )}
            {!isAuthenticated && (
              <Button
                mb="5"
                colorScheme="blue"
                variant="solid"
                onClick={signufun}
              >
                Signup and get your link{" "}
              </Button>
            )}
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
      </Box>
    </Box>
  );
};

export default Hero;
