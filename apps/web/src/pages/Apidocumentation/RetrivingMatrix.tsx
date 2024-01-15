import React from "react";
import { Box, Heading, Text, Divider, Code } from "@chakra-ui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {};

const RetrievingMatrix = (props: Props) => {
 


  return (
    <Box p={4} textAlign="justify" maxW="900px">
      <Heading as="h1" size="md" mb={4}>
        Retrieve Shorten URL:
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
          <Code
            children="/url/geturl/:shorturl?accesstoken=youraccesstoken"
            p="1"
            fontSize="md"
          />
        </Text>

       

        {/* Tips for using the GET method */}
        <Text fontSize="md" mt="25px" fontWeight="600">
          Tips for using the GET method:
        </Text>
        <Text fontSize="md" mt="10px">
          - Include the short URL parameter in the URL path.
        </Text>
        <Text fontSize="md" mt="10px">
          - Provide the access token as a query parameter.
        </Text>
        <Text fontSize="md" mt="10px">
          - Ensure proper error handling for different response statuses.
        </Text>

        {/* Example Response */}
        <Text fontSize="md" mt="25px" fontWeight="600">
          Example Response:
        </Text>

        {/* 200 Success Response */}
        <Text fontSize="md" mt="25px" fontWeight="600">
          Status: 200 Success
        </Text>
        <SyntaxHighlighter language="json">
          {`{ isError: false, 
  url:{
 originalUrl:string,
 shortUrl:string,
 title:string,
 linkDescripttion:string,
 accessCount:string,
 tags:[string],
 expiryDate:string 
}
}`}
        </SyntaxHighlighter>

        {/* 404 Error Response */}
        <Text fontSize="md" mt="25px" fontWeight="600">
          Status: 404 Error
        </Text>
        <SyntaxHighlighter language="json">
          {`{ isError: true, errorLog: "URL not found" }`}
        </SyntaxHighlighter>

        {/* 500 Success Response */}
        <Text fontSize="md" mt="25px" fontWeight="600">
          Status: 500 Success
        </Text>
        <SyntaxHighlighter language="json">
          {`{ isError: true, errorLog: "Internal Server Error" }`}
        </SyntaxHighlighter>
      </Box>
    </Box>
  );
};

export default RetrievingMatrix;
