import React from "react";
import { Box, Heading, Text, Divider, Code } from "@chakra-ui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
type Props = {}

const RetrivingMatrix = (props: Props) => {
  const codeSnippet = `{
    originalUrl:"string",
    linkDescription:"string",   // Optional
    title:"string",             // Optional
    tags: ["string"],           // Optional
    expiryDate:"Date"           // Optional
  }`;
  return (
    <Box p={4} textAlign="justify" maxW="900px">
      <Heading as="h1" size="md" mb={4}>
        Shorten Links:-
      </Heading>
      <Divider orientation="horizontal" />
      <Box>
        <Text fontSize="xl" mt="25px" fontWeight="600">
          Method :-{" "}
          <Code colorScheme="yellow" children="POST" p="2" fontSize="md" />
        </Text>

        <Text fontSize="md" mt="25px" fontWeight="600">
          Request Body Schema:-
        </Text>
        <SyntaxHighlighter language="json" style={tomorrow}>
          {codeSnippet}
        </SyntaxHighlighter>
        <Text fontSize="md" mt="25px" fontWeight="600">
          Response :
        </Text>
        <Text fontSize="md" mt="25px" fontWeight="600">
          Status: 200 Sucsess
        </Text>
        <SyntaxHighlighter language="json">
          {`{ isError: false, shortUrl:Shortne URL  }`}
        </SyntaxHighlighter>
        <Text fontSize="md" mt="25px" fontWeight="600">
          Status: 400 error
        </Text>
        <SyntaxHighlighter language="json">
          {`{ isError: true, errrolog:"Original URL is required"  }`}
        </SyntaxHighlighter>
        <Text fontSize="md" mt="25px" fontWeight="600">
          Status: 500 Sucsess
        </Text>
        <SyntaxHighlighter language="json">
          {`{ isError: true, errrolog:"Internal Server Error"  }`}
        </SyntaxHighlighter>
        <Text fontSize="md" mt="25px" fontWeight="600">
          Description: The Shorten Link API allows you to generate a shortened
          URL by providing the original URL along with optional parameters for
          additional information. Utilize this endpoint to streamline the
          process of creating concise and shareable links.
        </Text>
        <Text fontSize="md" mt="25px" fontWeight="600">
          Usage:
        </Text>
        <Box p={4} textAlign="left">
          <Box>
            <Text fontSize="lg" mt="25px">
              To interact with the SwifLink API, follow these steps:
            </Text>
            <ol>
              <li>
                <Text fontSize="md" mt="10px">
                  <strong>Endpoint:</strong> Use the POST method with the
                  specified URL and include your access token as a query
                  parameter.
                </Text>
                <Code>
                  {`POST /api/shorten?url={originalUrl}&access_token={yourAccessToken}`}
                </Code>
              </li>
              <li>
                <Text fontSize="md" mt="10px">
                  <strong>Request Body:</strong> Provide the original URL and
                  optionally include a link description, title, tags, and expiry
                  date.
                </Text>
              </li>
              <li>
                <Text fontSize="md" mt="10px">
                  <strong>Response Handling:</strong>
                </Text>
                <ul padding-left="20px">
                  <li>
                    <Text fontSize="md" mt="5px">
                      <strong>Status 200 (Success):</strong> Retrieve the
                      shortened URL from the response.
                    </Text>
                  </li>
                  <li>
                    <Text fontSize="md" mt="5px">
                      <strong>Status 400 (Bad Request):</strong> Check the error
                      log for details on missing required parameters.
                    </Text>
                  </li>
                  <li>
                    <Text fontSize="md" mt="5px">
                      <strong>Status 500 (Internal Server Error):</strong>{" "}
                      Handle unexpected errors by checking the error log.
                    </Text>
                  </li>
                </ul>
              </li>
            </ol>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default RetrivingMatrix