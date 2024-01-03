import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { Box ,Heading} from '@chakra-ui/react';

interface LineChartProps {
  data: any;
}

const Linechart: React.FC<LineChartProps> = ({ data }) => {
  return (
    <Box w="99%" bg="white" h="450px" mt="35px" pt="20px" pb="15px" borderRadius="5px" >
        <Heading size="sm" color="green"> Trend Of Last 30 Days</Heading>
      <ResponsiveContainer width="100%" height="100%">
      <BarChart width={150} height={40} data={data}>
          <Bar dataKey="totalClicksForCurrentDay" fill="green" />
          <XAxis dataKey="dayName" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default Linechart;

