import React, { useState,ReactNode, useEffect } from "react";
import style from "./Home.module.css"
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import Accordian from '../../components/Hero/Accordian'
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import Hero2 from '../../components/Hero/Hero2'
import Fotter from '../../components/Fotter/Fotter'
import { getData } from "../../services/api";
import { useDispatch,useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { checkAuth } from "../../redux/authSlice";
import { logout } from "../../redux/authSlice";
import { Button, Flex, Spacer, Box, Heading ,  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,useDisclosure,Input,
} from "@chakra-ui/react";
import { MdPodcasts } from "react-icons/md";
const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [drawerContent, setDrawerContent] = useState<React.ReactNode | null>(null);
  const dispatch = useDispatch();
  const isAuth: boolean = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    const checkAuthentication = async () => {
      setLoading(true);
      try {
        const response= await getData(`/user/check-auth`);
        dispatch(checkAuth(response));
      } catch (error) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };
    
      if(isAuth){
        checkAuthentication();
    
      }
     
  }, [isAuth]);
  const openDrawer = (content: React.ReactNode, onCloseCallback?: () => void) => {
    setDrawerContent(content);
    onOpen();
    onCloseCallback && onCloseCallback(); 
  };
  const closeDrawer = () => {
    setDrawerContent(null);
    onClose();
  };

 
  const openSignupDrawer = () => {
    openDrawer(<Signup onLoginLinkClick={openLoginDrawer} />);
  };
  const openLoginDrawer = () => {
    openDrawer(<Login onSignupLinkClick={openSignupDrawer} />);
  };


  return (
    <div className={style.home}>
    <Navbar loginfun={openLoginDrawer} signupfun={openSignupDrawer} loading={loading}/>
    <Hero signufun={openSignupDrawer}/>
    <Hero2/>
    <Box w="100%" bg="white"><Accordian/></Box>
    <Fotter signupfun={openSignupDrawer}/>
    <Drawer placement="right" onClose={onClose} isOpen={isOpen}  size="sm">
        <DrawerOverlay />
        <DrawerContent>
         
          <DrawerBody>
          <DrawerBody>{drawerContent}</DrawerBody>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Home