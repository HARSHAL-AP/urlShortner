import React from "react";
import { Box, VStack, Text, Divider, IconButton, Flex } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { FaHome, FaLink, FaChartBar, FaCog, FaPlus } from "react-icons/fa";
type Props = {};

const AdSidebar = (props: Props) => {
  const location = useLocation();

  const data = [
    { path: "/admin/home", pathName: "Home", icon: <FaHome /> },
    { path: "/admin/urls", pathName: "Link", icon: <FaLink /> },
    {
      path: "/admin/urls_analytics",
      pathName: "Url Analytics",
      icon: <FaChartBar />,
    },
    { path: "/admin/users", pathName: "Users", icon: <FaHome /> },
    {
      path: "/admin/users_analytics",
      pathName: "User Analytics",
      icon: <FaChartBar />,
    },
  ];

  const isRouteActive: any = (pathname: string) => {
    return location.pathname === pathname;
  };
  return (
    <Box
      bg="white"
      color="black"
      minH="95vh"
      w="18%"
      m="10px"
      position="fixed"
      zIndex="sticky"
      borderRadius={10}
      display={{ base: "none", md: "block" }}
    >
      <Flex
        fontSize="3xl"
        fontWeight="bold"
        w="100%"
        h="80px"
        alignItems="center"
        justifyContent="center"
      >
        SwiftLink
      </Flex>
      <VStack spacing={2} p={4} align="start">
        {data &&
          data.map((el, index) => {
            return (
              <Box
                key={index}
                as={RouterLink}
                to={el.path}
                display="flex"
                alignItems="center"
               
              >
                <IconButton
                  aria-label="Dashboard"
                  icon={el.icon}
                  size="md"
                  colorScheme="blue"
                  mr={3}
                  variant={isRouteActive(el.path) ? "solid" : ""}
                />
                <Text
                  as="b"
                  fontSize="md"
                  color={isRouteActive(el.path) ? "black" : "gray"}
                >
                  {el.pathName}
                </Text>
              </Box>
            );
          })}
      </VStack>
    </Box>
  );
};

export default AdSidebar;
