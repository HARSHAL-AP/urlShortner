import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Text,
  Heading,
  Grid,
  Flex,
  IconButton,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,Tag
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import LineChart from "../../components/Charts/LineChart";

type Props = {};

const AdHome = (props: Props) => {
  const chartData = {
    labels: ['sunday', 'monday', 'tuesday', 'wednesday', 'friday',"saturday"],
    datasets: [{
      label: 'User Acitivity',
      borderColor: 'rgb(75, 192, 192)',
      data: [10, 30, 45, 25, 60,50,90],
      fill: false,
    }],
  };
  return (
    <Box w="99%">

       {/* This is Todays or daoly stat  */}
       <Flex w="100%"  flexDirection={{base:"column",md:"row"}}>  
       <Box w="98%" m="auto" h="400px" bg="white" ml="10px" >
       <Flex w="100%" h="50%" border="1px solid red">
        <Box w="100%" h="100%" border="1px solid red" p="3" textAlign="left">
          <Flex align="center" justify="space-between"  m="auto"> 
            <Text fontSize="md" fontWeight="600">Total Urls </Text>   <BsThreeDotsVertical/>
          </Flex>
          <Heading mt="25px" color="green">2650+</Heading>
          <Tag  mt="10px" colorScheme="green">+80%</Tag>
        </Box>
        <Box w="100%" h="100%" border="1px solid red" p="3" textAlign="left">
          <Flex align="center" justify="space-between"  m="auto"> 
            <Text fontSize="md" fontWeight="600">Total Users</Text>   <BsThreeDotsVertical/>
          </Flex>
          <Heading mt="25px" color="green">29+</Heading>
          <Tag  mt="10px" colorScheme="blue">Sample Tag</Tag>
        </Box>
       </Flex>
       <Flex w="100%" h="50%" border="1px solid red">
       <Box w="100%" h="100%" border="1px solid red" p="3" textAlign="left">
          <Flex align="center" justify="space-between"  m="auto"> 
            <Text fontSize="md" fontWeight="700">Total Cliks </Text>   <BsThreeDotsVertical/>
          </Flex>
          <Heading mt="25px" color="green">2650+</Heading>
          <Tag  mt="10px" colorScheme="red">Sample Tag</Tag>
        </Box>
        <Box w="100%" h="100%" border="1px solid red" p="3" textAlign="left">
          <Flex align="center" justify="space-between"  m="auto"> 
            <Text fontSize="md" fontWeight="600">Todays Expiring </Text>   <BsThreeDotsVertical/>
          </Flex>
          <Heading mt="25px" color="green">2650+</Heading>
          <Tag  mt="10px">Sample Tag</Tag>
        </Box>
       </Flex>
      </Box>
      <Box w="98%" m="auto" h="400px" bg="white" ml="10px" p="3">
      <Flex align="center" justify="space-between"  m="auto"> 
            <Text fontSize="md" fontWeight="600">User Activity </Text>   <BsThreeDotsVertical/>
          </Flex>
          <Box>
          <LineChart data={chartData} /></Box>
          </Box>
        
       </Flex>
      
    </Box>
  );
};

export default AdHome;
