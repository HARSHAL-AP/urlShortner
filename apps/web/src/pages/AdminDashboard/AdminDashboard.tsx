import React, { FC, ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import AdSidebar from "../../components/Admindashboard/AdSidebar";
import AdNavbar from "../../components/Admindashboard/AdNavbar";

type Props = {}

const AdminDashboard = (props: Props) => {
  return (
    <Flex w="100%"   bg="#f4f6fa">
       <Box w="20%"  h="100vh" display={{ base: 'none', md: 'block' }}>
       <AdSidebar/>
       </Box>
       <Box w={{ base: '100%', md: '80%' }}  >
       <AdNavbar />
       <Outlet/>
       </Box>
    </Flex>
  )
}

export default AdminDashboard