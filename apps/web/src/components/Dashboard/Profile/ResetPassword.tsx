import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
  FormErrorMessage,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { updateData } from '../../../services/api';


const ResetPassword = () => {
  const [formData, setFormData] = useState({
    oldpassword: "",
    newpassword: "",
    confirmPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState({
    isStrong: false,
    message: "",
  });

  const [passwordMatchError, setPasswordMatchError] = useState("");

  const toast = useToast();

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Check password strength
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isStrong = strongRegex.test(value);

    setPasswordStrength({
      isStrong,
      message: isStrong
        ? "Password is strong!"
        : "Password should be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.",
    });
  };

  const handleSubmit = async() => {
   
    if (formData.newpassword !== formData.confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      return;
    }
try {
  let res=await updateData(formData,`/user/updatepassword`)

  toast({
    title: "Password Reset Successful",
    description: "Your password has been reset successfully.",
    status: "success",
    duration: 5000,
    isClosable: true,
  });
} catch (error) {
  toast({
    title: " Password updation error",
    description: "Unable to Update Password.",
    status: "error",
    duration: 5000,
    isClosable: true,
  });
}

    
  };

  return (
    <Box>
      <FormControl>
        <FormLabel mt="30px">Old Password (mandatory) </FormLabel>
        <Input
          type="password"
          name="oldpassword"
          value={formData.oldpassword}
          onChange={handleInputChange}
          placeholder="Old Password"
          isRequired
        />
      </FormControl>

      <FormControl>
        <FormLabel mt="30px">New Password </FormLabel>
        <Input
          type="password"
          name="newpassword"
          value={formData.newpassword}
          onChange={handleInputChange}
          placeholder="New Password"
          isRequired
        />
        <Text color={passwordStrength.isStrong ? "green" : "red"} mt="2">
          {passwordStrength.message}
        </Text>
      </FormControl>

      <FormControl isInvalid={passwordMatchError !== ""}>
        <FormLabel mt="30px">Confirm Password</FormLabel>
        <Input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm Password"
          isRequired
        />
        <FormErrorMessage>{passwordMatchError}</FormErrorMessage>
      </FormControl>

      <Button
        w="100%"
        mt="5"
        variant="outline"
        colorScheme="blue"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default ResetPassword;
