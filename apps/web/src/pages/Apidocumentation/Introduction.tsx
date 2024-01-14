import React from "react";
import { Box, Heading, Text, Divider } from "@chakra-ui/react";

type Props = {};

const Introduction = (props: Props) => {
  return (
    <Box p={4} textAlign="justify" maxW="900px">
      <Heading as="h1" size="md" mb={4}>
        Introduction
      </Heading>
      <Divider orientation="horizontal" />
      <Box>
        <Text fontSize="xl" mt="25px" fontWeight="600">
          Welcome to SwifLink – Your Ultimate URL Shortener Solution!
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
          click-through rates, geographical location of users, and more, enabling
          you to make data-driven decisions for your online presence.
        </Text>
        <Text fontSize="lg" mt="25px">
          Additionally, SwifLink prioritizes security. Enjoy peace of mind with
          features like link expiration, password protection, and access controls.
          Whether you're sharing links personally or for business, SwifLink ensures
          that your data and links are secure.
        </Text>
        
      </Box>
    </Box>
  );
};

export default Introduction;
