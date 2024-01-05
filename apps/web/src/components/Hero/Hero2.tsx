import React from "react";
import { Box, Flex, Text, Heading, Image } from "@chakra-ui/react";
type Props = {};

const Hero2 = (props: Props) => {
  return (
    <Box w="100%" bg="white" h="auto"> 
      <Heading>One short link,infinite possibilites</Heading>
      <Text fontSize="16px" w={{ base: "80%", md: "40%" }} m="auto" mt="25px" textColor="pink.800">
        A short link is powerfull marketing tool when you use it carefully.it is
        not just a linnk but a medium between your customer and thieir
        destination.
      </Text>
      <Flex
        w={{base:"90%",md:"60%"}}
        m="auto"
        mt="30px"
        alignItems="center"
        justifyContent="center"
        gap="30px"
        flexDirection={{base:"column",md:"row"}}
      >
        <Box
          w="80%"
          gap="10px"
          textAlign="left"
          p="7"
          boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        >
          <Image src="https://rx.link/assets/img/services-icon1.svg" alt="" />
          <Heading fontSize="xl" mt="5">Smart Targeting</Heading>
          <Text mt="5">
            Target your customers to increase your reach and redirect them to a
            relevant page. Add a pixel to retarget them in your social media ad
            campaign to capture them.
          </Text>
        </Box>
        <Box w="80%"
          gap="10px"
          textAlign="left"
          p="7"
          boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)">
          <Image src="https://rx.link/assets/img/services-icon2.svg" alt="" />
          <Heading fontSize="xl" mt="5">In-Depth Analytics</Heading>
          <Text mt="5">
            Share your links to your network and measure data to optimize your
            marketing campaign's performance. Reach an audience that fits your
            needs.
          </Text>
        </Box>
        <Box w="80%"
          gap="10px"
          textAlign="left"
          p="7"
          boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)">
          <Image src="https://rx.link/assets/img/services-icon3.svg" alt="" />
          <Heading fontSize="xl" mt="5">Digital Experience</Heading>
          <Text mt="5">
            Use various powerful tools increase conversion and provide a
            non-intrusive experience to your customers without disengaging them.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Hero2;
