import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeBlockProps {
  code: string;
}

const Codeblock: React.FC<CodeBlockProps> = ({ code }) => {
  return (
    <Box
      mt={{ base: 2, md: 4 }}
      p={4}
    
      borderRadius="md"
      overflow="auto"
      maxW="full"               
      mx={{ base: 2, md: 'auto' }} 
    >
      <Text fontSize={{ base: 'sm', md: 'md' }} mb={2} fontWeight="bold">
        Code Example
      </Text>
      <SyntaxHighlighter language="jsx" style={docco}>
        {code}
      </SyntaxHighlighter>
    </Box>
  );
};

export default Codeblock;
