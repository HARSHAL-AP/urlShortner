import React from "react";
import { Box, Heading, Text, Divider, Code ,Image} from "@chakra-ui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import errpage from "./errpage.png"

type Props = {};

const RedirectingLink = (props: Props) => {
  return (
    <Box p={4} textAlign="justify" maxW="900px">
      <Heading as="h1" size="md" mb={4}>
        Redirecting to Link:
      </Heading>
      <Divider orientation="horizontal" />
      <Box>
        {/* HTTP Method */}
        <Text fontSize="xl" mt="25px" fontWeight="600">
          Method:{" "}
          <Code colorScheme="yellow" children="GET" p="2" fontSize="md" />
        </Text>

        {/* API Endpoint */}
        <Text fontSize="xl" mt="25px" fontWeight="600">
          URL:{" "}
          <Code children="/url/:shorturl" p="1" fontSize="md" />
        </Text>

        {/* Tips for using the GET method */}
        <Text fontSize="md" mt="25px" fontWeight="600">
          Tips for using the GET method:
        </Text>
        <Text fontSize="md" mt="10px">
          - Include the short URL parameter in the URL path.
        </Text>

        {/* Redirect Behavior */}
        <Text fontSize="md" mt="25px" fontWeight="600">
          Redirect Behavior:
        </Text>
        <Text fontSize="md" mt="10px">
          - If the URL is not expired, the user will be redirected to the original link.
        </Text>
        <Text fontSize="md" mt="10px">
          - If the link has expired or there is an error, the user will see a "Page expired" page in their browser.
        </Text>
        <Image src={errpage} w="70%" mt="5" ml="20px"></Image>

        <Text fontSize="md" mt="25px" fontWeight="600">
          Status: 500 Sucsess
        </Text>
        <SyntaxHighlighter language="json">
          {`{ isError: true, errrolog:"Internal Server Error"  }`}
        </SyntaxHighlighter>
      </Box>
    </Box>
  );
};

export default RedirectingLink;
