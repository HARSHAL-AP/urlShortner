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
  FormControl,
  FormLabel,
  FormHelperText,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { postData } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
interface SignupProps {
  onLoginLinkClick: () => void;
}

const Signup: React.FC<SignupProps> = ({ onLoginLinkClick }) => {

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handlePasswordChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, password: value }));

    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    const isStrong = strongRegex.test(value);
    setPasswordStrength(isStrong ? 100 : 0);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = () => {
    postData({...formData},"/user/register").then((r)=>{
      if(!r.isError){
        console.log(r)
        dispatch(login(r))
        alert("Registration successful")
        navigate("/dashboard/home")
       
      }
     
     }).catch((e)=>{
      console.log(e)
     
     })
  };
 
 

  return (
    
   
        <VStack spacing={8} w="100%" p={8} bg="white" >
          <Heading textAlign="center" size="xl" fontWeight="bold">
           Create Account
          </Heading>

          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Username"
              variant="filled"
              onChange={(e) => handleInputChange('userName', e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email"
              variant="filled"
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                type="password"
                placeholder="Password"
                variant="filled"
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Text color={passwordStrength === 100 ? 'green.500' : 'red.500'}>
                  {passwordStrength === 100 ? 'Strong' : 'Weak'}
                </Text>
              </InputRightElement>
            </InputGroup>
            <FormHelperText textAlign="center" fontSize="sm" color="gray.500">
              Strong password includes uppercase, lowercase, numbers, and symbols.
            </FormHelperText>
          </FormControl>

          <Button w="100%" colorScheme="blue" variant="solid" onClick={handleFormSubmit}>
            Sign up
          </Button>

          <Text fontSize="sm" textAlign="center">
            Already have an account?{' '}
            <Link color="blue"  onClick={onLoginLinkClick}>
              Log in
            </Link>
          </Text>
        </VStack>
     
  );
};

export default Signup;
