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
     
      p={4}
    
      borderRadius="md"
      overflow="auto"
      maxW="full"               
      mx={{ base: 2, md: 'auto' }} 
    >
      
      <SyntaxHighlighter language="jsx" style={docco}>
        {code}
      </SyntaxHighlighter>
    </Box>
  );
};

export default Codeblock;
