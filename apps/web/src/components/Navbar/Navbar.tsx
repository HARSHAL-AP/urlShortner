import React from "react";
import { Button, Flex, Spacer, Box, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";

interface NavbarProps {
  //navbar
}

const Navbar: React.FC<NavbarProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuth: any = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  
  return (
    <Flex
      as="nav"
      align="center"
      justify="center"
     
      padding="1.5rem"
     gap="30px"
      color="blue.600"
      bg="white"
    >
      <Box>
        <Heading color="blue.900">Swiftlinks</Heading>
      </Box>
      <Flex w="50%" display={{base:"none",md:"block"}}></Flex>
      {!isAuth && (
        <Flex align="center" justify="center">
          <Button
            variant="outline"
            
            colorScheme="voilet"
            mr={2}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            colorScheme="voilet"
            variant="outline"
            onClick={() => navigate("/signup")}
          >
            Signup
          </Button>
        </Flex>
      )}
      {isAuth && (
        <Flex align="center" justify="center">
          <Button
            colorScheme="voilet"
            variant="outline"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
