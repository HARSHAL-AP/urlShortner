import React from "react";
import { Box, Text, Heading, Grid } from "@chakra-ui/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


interface AnalysisCardProps{
  title:string,
  data:any,



}



const AnalysisCard: React.FC<AnalysisCardProps> = ({title,data}) => {
  return (
    <Box
      w="100%"
      h="300px"
      bg="white"
      p={4}
      borderRadius="15px" 
    
    >
      <Heading fontSize="xl" mb={4} color="teal.500">{title}</Heading>

      <ResponsiveContainer width="100%" height="90%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{ top: 30, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            fill="teal" // Set the area chart fill color
            fillOpacity={0.8} // Adjust the fill opacity
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AnalysisCard;
