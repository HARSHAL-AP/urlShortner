import React, { useEffect, useState } from "react";
import Usercard from "../../components/Dashboard/Profile/Usercard";
import { Box, Avatar, Flex, Text, Badge, Heading } from "@chakra-ui/react";
import Longurlbox from "../../components/Hero/Longurlbox";
import LoginActs from "../../components/Dashboard/Profile/LoginActs";
import { getData } from "../../services/api";

type Props = {};

const Profile = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const dummyUserData = {
    email: "dummy@example.com",
    name: "John Doe",
    organization: "Dummy Corp",
    domain: "dummycorp.com",
    accessToken: "your_access_token_here",
  };

  useEffect(() => {
    const getdata = async () => {
      try {
        setLoading(true);

        const response = await getData(`/user/getuser`);
        console.log(response);
      } catch (error) {
        alert("Internal Server Error");
      } finally {
        setLoading(false);
      }
    };

    getdata();
  }, []);

  return (
    <Box w="99%" p="5" bg="white">
      <Heading size="md" textAlign="left">
        Profile
      </Heading>

      <Usercard {...dummyUserData} />
    </Box>
  );
};

export default Profile;
