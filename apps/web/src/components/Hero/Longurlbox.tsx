import React, { useState } from 'react';
import { Box, Button, Link, Text, CloseButton } from '@chakra-ui/react';

interface LongurlboxProps {
  linkUrl: string;
  description: string;
}

const Longurlbox: React.FC<LongurlboxProps> = ({ linkUrl, description }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleButtonClick = () => {
    // You can customize the navigation logic here
    window.location.href = linkUrl;
  };

  const handleCloseButtonClick = () => {
    setIsVisible(false);
  };

  return isVisible ? (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} mb={4} bgColor="blue.100" position="relative">
      <CloseButton position="absolute" top={1} right={1} onClick={handleCloseButtonClick} />
      <Link href={linkUrl} isExternal fontSize="lg" mb={2} display="block" color="black">
        {linkUrl}
      </Link>
      <Text color="gray.600" fontSize="md" mb={4}>
        {description}
      </Text>
      <Button colorScheme="teal" onClick={handleButtonClick}>
        Go to Link
      </Button>
    </Box>
  ) : null;
};

export default Longurlbox;
