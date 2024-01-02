import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Input,
  Button,
  Text,
  Link,
  Heading,
  ColorModeScript,
} from '@chakra-ui/react';
import { RootState } from "../../redux/store";
import { postData } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/authSlice';
import { useDispatch,useSelector } from 'react-redux';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [iserror,setiserror]=useState(false)
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const isAuth: any = useSelector(
    (state: RootState) => state.auth
  );
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setiserror(false)
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

   
    if (isSubmitted && name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmailValid(emailRegex.test(value));
    }
  };

  const handleLogin = () => {
    setIsSubmitted(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(formData.email));

    if (isEmailValid) {
     postData({...formData},"/user/login").then((r)=>{
      if(!r.isError){
        setiserror(false)
        dispatch(login(r))
    
        console.log("loginisauth",isAuth)
        navigate("/dashboard/home")
      }
     
     }).catch((e)=>{
      console.log(e)
      if(e){
        setiserror(true)
      
      }
     })
    } else {
      console.log('Invalid email');
     
    }
  };

  return (
    <>
      <ChakraProvider>
        <ColorModeScript initialColorMode="light" />
        <Box
          width="100vw"
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgGradient="linear(to-r, teal.500, green.500)"
        >
          <VStack spacing={8} w="400px" p={8} bg="white" borderRadius="xl" boxShadow="md">
            <Heading
              textAlign="center"
              size="xl"
              fontWeight="bold"
              bgGradient="linear(to-r, teal.500, green.500)"
              bgClip="text"
            >
              SwiftLink
            </Heading>
            {iserror&& <Text color="red" as="b">Invalid Credentials....</Text>}
           
            <Input
              placeholder="Email"
              variant="outline"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              isInvalid={!isEmailValid && isSubmitted}
            />
            {!isEmailValid && isSubmitted && (
              <Text color="red.500" fontSize="sm" textAlign="left">
                Invalid email format
              </Text>
            )}
            <Input
              placeholder="Password"
              type="password"
              variant="outline"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Button colorScheme="teal" variant="solid" onClick={handleLogin}>
              Log in
            </Button>
            <Text fontSize="sm" textAlign="center">
              Don't have an account?{' '}
              <Link color="teal.500" href="/signup">
                Sign up
              </Link>
            </Text>
          </VStack>
        </Box>
      </ChakraProvider>
    </>
  );
};

export default Login;
    