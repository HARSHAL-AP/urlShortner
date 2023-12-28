import React from 'react';
import { Box, VStack, Text, Divider, IconButton,Heading ,Flex} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaHome, FaLink, FaChartBar, FaCog, FaPlus } from 'react-icons/fa'; 

const Sidebar: React.FC = () => {
  return (
    <Box
      bg="white"
      color="black"
      minH="95vh"
      w="18%"
      m="10px"
      position="fixed"
      zIndex="sticky"
      borderRadius={10}
      display={{ base: 'none', md: 'block' }}
    >
       <Flex fontSize="xl" fontWeight="bold" w="100%" h="80px" alignItems="center" justifyContent="center">
          SwiftLink
        </Flex>
      <VStack spacing={2} p={4} align="start">
        
        <Box as={RouterLink} to="/dashboard/home"  display="flex" alignItems="center" mt="15px">
          <IconButton
            aria-label="Dashboard"
            icon={<FaHome />}
            size="md"
            colorScheme="purple"
            mr={3} 
          
          />
          <Text as="b" fontSize="md" color="grey">Home</Text>
        </Box>

        <Box as={RouterLink} to="/dashboard/create-new"  display="flex" alignItems="center" mt="15px">
          <IconButton
            aria-label="Create New URL"
            icon={<FaPlus />}
            size="md"
            colorScheme="purple"
            mr={3} 
           
          />
          <Text as="b" fontSize="md" color="grey">Create New URL</Text>
        </Box>

        <Box as={RouterLink} to="/dashboard/analytics"  display="flex" alignItems="center" mt="15px">
          <IconButton
            aria-label="Analytics"
            icon={<FaChartBar />}
            size="md"
            colorScheme="purple"
            mr={3} 
           
          />
          <Text as="b" fontSize="md" color="grey">Analytics</Text>
        </Box>

        <Box as={RouterLink} to="/dashboard/links"  display="flex" alignItems="center" mt="15px">
          <IconButton
            aria-label="Custom URLs"
            icon={<FaLink />}
            size="md"
            colorScheme="purple"
            mr={3} 
          
          />
          <Text as="b" fontSize="md" color="grey">Links</Text>
        </Box>

        <Box as={RouterLink} to="/dashboard/home" display="flex" alignItems="center" mt="15px">
          <IconButton
            aria-label="API Integration"
            icon={<FaCog />}
            size="md"
            colorScheme="purple"
            mr={3} 
            
          />
          <Text as="b" fontSize="md" color="grey">API Integration</Text>
        </Box>

       
        <Divider />
      </VStack>
    </Box>
  );
};

export default Sidebar;
