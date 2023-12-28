import React, { useState } from 'react';
import { Box, Flex, Heading, Button, Modal,IconButton, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Spacer } from '@chakra-ui/react';
import Filters from '../../components/Dashboard/Filters';
import Linkcard from '../../components/Dashboard/Linkcards';

interface ShortenedLink {
  longUrl: string;
  shortUrl: string;
  description?: string;
  customDomain?: string;
  tags?: string[];
  
}

const Links = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLink, setSelectedLink] = useState<ShortenedLink | null>(null);
 

  // Dummy data for testing
  const shortenedLinks: ShortenedLink[] = [
    {
      longUrl: 'https://example.com/long-url-1',
      shortUrl: 'https://sho.rt/abc123',
      description: 'This is a test link with a description.',
      customDomain: 'mycustomdomain.com',
      tags: ['tag1', 'tag2']
      
    }
  ];

 
  const handleCopy = (url: string) => {
    // Copy logic (you can use a library like clipboard.js)
    console.log(`Copying ${url} to clipboard`);
  };

  return (
    <Box mx="auto" w="100%">
      <Heading as="h3" size="md" textAlign="left" mt="30px" ml="20px">
        Links
      </Heading>
      <Filters/>
      

      <Box mt="30px"  w="100%" pl="20px">
      <Linkcard link={shortenedLinks[0]}/>
      </Box>
      
    </Box>
  );
};

export default Links;
