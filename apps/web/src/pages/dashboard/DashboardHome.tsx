import React, { FC } from 'react';
import { Box, Text, Heading, Grid } from '@chakra-ui/react';
import AnalysisCard from '../../components/Dashboard/AnalysisCard';
import AcccesTokencard from '../../components/Dashboard/AcccesTokencard';

const DashboardHome: FC = () => {
  
  return (
    <>
      <Box
       
        w={{ base: "95%", lg: "99%" }}
        m="auto"
        display="flex"
        flexDirection="column"
        textAlign="left"
        color="blue.600"
        p="30px"
        borderRadius="5px"
        mb={8}
        borderWidth='1px'
        bg="white"
      >
        {/* Heading with dynamic username */}
        <Heading as="h3" size="xl" mb={4}>
          Welcome,  🖐️!
        </Heading>

        <Text fontSize="md">Track your links with every detail here.</Text>
      </Box>

      {/* Grid of 3 boxes */}
      <Grid
        templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }}
        gap={4}
        width={{ base: '95%', lg: '99%' }}
        margin="auto"
        bg="white"
      >
       <AnalysisCard/>
       <AnalysisCard/>
       <AnalysisCard/>
      
      </Grid>
      <AcccesTokencard/>
    </>
  );
};

export default DashboardHome;
