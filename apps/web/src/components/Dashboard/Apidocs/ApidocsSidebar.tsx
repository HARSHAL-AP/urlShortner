import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink, useLocation } from 'react-router-dom';
type Props = {};

const ApidocsSidebar = (props: Props) => {
  const location = useLocation();

  const isRouteActive = (pathname: string) => {
    return location.pathname === pathname;
  };
  return (
    <Box w="100%" pl="3">
      <Flex
        h="35px"
        mt="2"
        w="100%"
        pl="2"
        alignItems="center"
        fontSize="0.9rem"
        cursor="pointer"
        fontWeight="500"
        bg={isRouteActive('/apidocs/introduction')?"blue.100":"white"}
        borderLeft={isRouteActive('/apidocs/introduction')?"3px solid blue":"0px"}
        as={RouterLink}
        to="/apidocs/introduction"
      >
       Introduction
      </Flex>
      
      <Flex
        h="40px"
        w="100%"
        pl="2"
        alignItems="center"
        fontSize="0.9rem"
        cursor="pointer"
        fontWeight="500"
        bg={isRouteActive('/apidocs/authontication')?"blue.100":"white"}
        borderLeft={isRouteActive('/apidocs/authontication')?"3px solid blue":"0px"}
        as={RouterLink}
        to="/apidocs/authontication"
      >
        Authontication
      </Flex>
      <Flex
        h="40px"
        w="100%"
        pl="2"
        alignItems="center"
        fontSize="0.9rem"
        cursor="pointer"
        fontWeight="500"
        bg={isRouteActive('/apidocs/shorten_link')?"blue.100":"white"}
        borderLeft={isRouteActive('/apidocs/shorten_link')?"3px solid blue":"0px"}
        as={RouterLink}
        to="/apidocs/shorten_link"
      >
       Shorten Link
      </Flex>
      <Flex
        h="40px"
        w="100%"
        pl="2"
        alignItems="center"
        fontSize="0.9rem"
        cursor="pointer"
        fontWeight="500"
        bg={isRouteActive('/apidocs/retriving_matrix')?"blue.100":"white"}
        borderLeft={isRouteActive('/apidocs/retriving_matrix')?"3px solid blue":"0px"}
        as={RouterLink}
        to="/apidocs/retriving_matrix"
      >
        Retriving Matrix
      </Flex>
      <Flex
        h="40px"
        w="100%"
        pl="2"
        alignItems="center"
        fontSize="0.9rem"
        cursor="pointer"
        fontWeight="500"
        bg={isRouteActive('/apidocs/redireacting')?"blue.100":"white"}
        borderLeft={isRouteActive('/apidocs/redireacting')?"3px solid blue":"0px"}
        as={RouterLink}
        to="/apidocs/redireacting"
      >
       Redireacting To Url
      </Flex>
      <Flex
        h="40px"
        w="100%"
        pl="2"
        alignItems="center"
        fontSize="0.9rem"
        cursor="pointer"
        fontWeight="500"
        bg={isRouteActive('/apidocs/truboolshoting')?"blue.100":"white"}
        borderLeft={isRouteActive('/apidocs/truboolshoting')?"3px solid blue":"0px"}
        as={RouterLink}
        to="/apidocs/truboolshoting"
      >
       Trubleshotin & Tips
      </Flex>
    </Box>
  );
};

export default ApidocsSidebar;
