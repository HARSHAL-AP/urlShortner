import React from "react";
import { Box, Heading,Image,Spinner } from "@chakra-ui/react";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AnalysisCardProps {
  title: string;
  data: {
    date: string;
    dayName: string;
    newUrls: number[];
    totalClicksForCurrentDay: number;
    expiringUrls: string[];
  }[];
}

const AnalysisCard2: React.FC<AnalysisCardProps> = ({ title, data }) => {
    if(data.length===0){
        return <Box><Spinner color='blue.500' /></Box>
      }
  return (
    <Box
      w="100%"
      h="300px"
      bg="white"
      p={4}
      borderRadius="15px"
      
    >
      <Heading fontSize="xl" mb={4} color="teal.500">
      Total Cliks
      </Heading>

      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data}>
         
          <XAxis dataKey="dayName" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalClicksForCurrentDay"
            stroke="#8884d8"
            fill="green"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AnalysisCard2;
