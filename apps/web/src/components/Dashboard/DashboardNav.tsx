import React, { useState, useEffect } from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  useColorMode,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Heading,
  useBreakpointValue,
  Box,
  Spacer,VStack,Divider,Button,InputRightElement,useToast
} from "@chakra-ui/react";
import { SearchIcon, MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import Sidebar from "./Sidebar";
import { logout } from "../../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate ,useLocation} from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import { FaHome, FaLink, FaChartBar, FaCog, FaPlus } from 'react-icons/fa'; 
import { FaUser } from "react-icons/fa6";
import { getUrl } from "../../redux/urlSlice";
import { getData } from "../../services/api";
import {userLogout} from "../../services/api"

const DashboardNav = () => {
  const [ismobail,setismobail]=useState(false)
  const [text,settext]=useState("")
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading,setloading]=useState(false)
  const user: any = useSelector((state: RootState) => state.auth.user);
  const authtoken=useSelector((state: RootState) => state.auth.authToken)

  const accesToken: any = useSelector((state: RootState) => state.auth.accessToken);
  const handleSidebarToggle = () => {
    setismobail(!ismobail)
  };
  const toast = useToast()
  const handleSubmit=async()=>{
   
   
   
    navigate(`/dashboard/links?search=${text}`)
  
}
const handleLogout=async()=>{
  try {
    const responce =await userLogout(`/user/logout?token=${authtoken}`)
    if(responce.isError===false){
      dispatch(logout())
      toast({
        title: 'User Logout Success...!',
        status: 'success',
        duration: 5000, 
        isClosable: true,
      });
      navigate("/")
    }
  } catch (error) {
    toast({
      title: 'Error While loging out...!',
      status: 'error',
      duration: 5000, 
      isClosable: true,
    });
  }
}
 


  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        
      >
        <IconButton
          display={{ base: "block", md: "none" }}
          icon={<HamburgerIcon />}
          aria-label="Toggle menu"
          variant="ghost"
          size="md"
          onClick={handleSidebarToggle}
        />
       <Text size="2xl" as="b" display={{ base: "block", md: "none" }}>
        Swiftlink
       </Text>
    
      
          <InputGroup maxW="350px" bg="white" >
          
            <Input type="text" placeholder="Search..." value={text} onChange={(e)=>settext(e.target.value)}/>
            <InputRightElement  children={<SearchIcon />} onClick={handleSubmit} cursor="pointer"/>
          </InputGroup>

          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="User menu"
              icon={<FaUser />}
              display={{ base: "none", md: "inline-flex" }}
            />
            <MenuList>
              <MenuItem>
                <Text fontWeight="bold">{user.userName}</Text>
              </MenuItem>
              <MenuItem onClick={()=>navigate("/dashboard/profile")}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
   {  ismobail&&  <Box  display={{ base: "block", md: "none" }} position="fixed" w="100vw" h="100vh" bg="white" zIndex="999" top="0">
        <VStack spacing={2} p={4} align="start">
        <Button  onClick={handleSidebarToggle}>close</Button>
        <Box as={RouterLink} to="/dashboard/home"  display="flex" alignItems="center" mt="15px"  onClick={handleSidebarToggle}>
          <IconButton
            aria-label="Dashboard"
            icon={<FaHome />}
            size="md"
            colorScheme="purple"
            mr={3} 
          
          />
          <Text as="b" fontSize="md" color="grey">Home</Text>
        </Box>

        <Box as={RouterLink} to="/dashboard/create-new"  display="flex" alignItems="center" mt="15px"  onClick={handleSidebarToggle}>
          <IconButton
            aria-label="Create New URL"
            icon={<FaPlus />}
            size="md"
            colorScheme="purple"
            mr={3} 
           
          />
          <Text as="b" fontSize="md" color="grey">Create New URL</Text>
        </Box>

        <Box as={RouterLink} to="/dashboard/home"  display="flex" alignItems="center" mt="15px"  onClick={handleSidebarToggle}>
          <IconButton
            aria-label="Analytics"
            icon={<FaChartBar />}
            size="md"
            colorScheme="purple"
            mr={3} 
           
          />
          <Text as="b" fontSize="md" color="grey">Analytics</Text>
        </Box>

        <Box as={RouterLink} to="/dashboard/links"  display="flex" alignItems="center" mt="15px"  onClick={handleSidebarToggle}>
          <IconButton
            aria-label="Custom URLs"
            icon={<FaLink />}
            size="md"
            colorScheme="purple"
            mr={3} 
          
          />
          <Text as="b" fontSize="md" color="grey">Links</Text>
        </Box>

        <Box as={RouterLink} to="/dashboard/home" display="flex" alignItems="center" mt="15px"  onClick={handleSidebarToggle}>
          <IconButton
            aria-label="API Integration"
            icon={<FaCog />}
            size="md"
            colorScheme="purple"
            mr={3} 
            
          />
          <Text as="b" fontSize="md" color="grey">API Integration</Text>
        </Box>

       
        <Divider />
      </VStack>
        </Box>}
    </>
  );
};

export default DashboardNav;
