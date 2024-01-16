import React, { FC, ReactNode } from "react";
import DashboardNav from "../../components/Dashboard/DashboardNav";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar";
interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  return (
    <Flex w="100%"   bg="#f4f6fa">
       <Box w="20%"  h="100vh" display={{ base: 'none', md: 'block' }}>
       <Sidebar/>
       </Box>
       <Box w={{ base: '100%', md: '80%' }}  >
       <DashboardNav />
       <Outlet/>
       </Box>
    </Flex>
  );
};

export default Dashboard;


