import React from "react";
import { Box, Heading, Text, Divider,Code } from "@chakra-ui/react";

type Props = {};

const Authontication = (props: Props) => {
  return (
    <Box p={4} textAlign="justify" maxW="900px">
      <Heading as="h1" size="md" mb={4}>
        Authontication
      </Heading>
      <Divider orientation="horizontal" />
      <Box>
        <Text fontSize="xl" mt="25px" fontWeight="600">
          Generic access token:-
        </Text>
        <Text fontSize="lg" mt="25px">
          At SwifLink, we prioritize your experience. Upon signing up, you
          receive a personalized generic access token, your key to unlock our
          API's full potential. This unique token simplifies authentication,
          granting seamless access to various endpoints for data retrieval and
          posting. Just include your token in query parameters to access API
          features easily, prioritizing security and streamlining integration.
          Focus on utilizing SwifLink's features without complex authentication
          hassles.
        </Text>
        <Text fontSize="md" mt="25px" fontWeight="600">
          Base Url
        </Text>
        <Code children='http://localhost:8080/url' p="2" mt="3" w="100%" fontWeight="800"/>
        <Text fontSize="md" mt="25px" fontWeight="600">
        Code to pass this access token in query parms :-
        </Text>
        <Code children='http://localhost:8080/url?accesstoken=youraccestoken' p="2" mt="3" w="100%" fontWeight="800"/>
      </Box>
    </Box>
  );
};

export default Authontication;
