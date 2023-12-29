import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: 'Mobail',
      uv: 31.47,
      pv: 2400,
      fill: 'red',
    },
    {
      name: 'Tablet',
      uv: 26.69,
      pv: 4567,
      fill: 'blue',
    },
    {
      name: 'E-Reader',
      uv: 15.69,
      pv: 1398,
      fill: 'green',
    },
    {
      name: 'Unknown',
      uv: 8.22,
      pv: 9800,
      fill:"orange",
    }
  ];
  
  const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
  };
  
  
const Piecahrt = (props: any) => {
 

  return (
    <RadialBarChart
      width={500}
      height={300}
      cx={150}
      cy={150}
      innerRadius={20}
      outerRadius={140}
      barSize={10}
      data={data}
    >
      <RadialBar
       
        label={{ position: "insideStart", fill: "#fff" }}
        background
        
        dataKey="uv"
      />
      <Legend
        iconSize={10}
        width={120}
        height={140}
        layout="vertical"
        verticalAlign="middle"
        wrapperStyle={style}
      />
    </RadialBarChart>
  );
}

export default Piecahrt