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

interface LoginProps {
  onSignupLinkClick: () => void;
}

const Login: React.FC<LoginProps> = ({ onSignupLinkClick }) => {
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
 
     
        
          <VStack spacing={8} w="100%" p={8}  mt="20vh">
            <Heading
              textAlign="center"
              size="md"
              fontWeight="bold"
              
             
            >
              Sign In
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
            <Button colorScheme="blue" variant="solid" onClick={handleLogin} w="100%">
              Log in
            </Button>
            <Text fontSize="sm" textAlign="center">
              Don't have an account?{' '}
              <Link color="blue" onClick={onSignupLinkClick}>
                Sign up
              </Link>
            </Text>
          </VStack>
   
  );
};

export default Login;
    