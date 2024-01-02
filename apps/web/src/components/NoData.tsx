// NoData.tsx
import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { FaExclamationCircle } from 'react-icons/fa';

interface NoDataProps {
  message?: string;
}

const NoData: React.FC<NoDataProps> = ({ message = 'No data found in the database.' }) => {
  return (
    <Flex align="center" justify="center" h="20vh">
      <Box textAlign="center">
        <FaExclamationCircle style={{ fontSize: '3em',margin:"auto", marginBottom: '0.5em', color: 'green' }} />
        <Text fontSize="xl" fontWeight="bold">
          {message}
        </Text>
      </Box>
    </Flex>
  );
};

export default NoData;
