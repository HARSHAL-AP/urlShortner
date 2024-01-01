import React from 'react';
import { Button, Flex, Spacer,Box ,Heading} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

interface NavbarProps {
  //navbar 
}

const Navbar: React.FC<NavbarProps> = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch();

  const isAuth: any = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  console.log(isAuth)
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Box ><Heading>Swiftlinks</Heading> </Box>

      {!isAuth&&<Flex align="center" justify="center">
        <Button variant="outline" color="white" mr={2} onClick={()=>navigate("/login")}>
          Login
        </Button>
        <Button colorScheme="teal" variant="solid" onClick={()=>navigate("/signup")}>
          Signup
        </Button>
      </Flex>}
      {isAuth&&<Flex align="center" justify="center">
        
        <Button colorScheme="voilet" variant="outline" onClick={()=>navigate("/dashboard")}>
          Dashboard
        </Button>
      </Flex>}
    </Flex>
  );
};

export default Navbar;
