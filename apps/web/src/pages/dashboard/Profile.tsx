import React, { useEffect, useState } from "react";
import Usercard from "../../components/Dashboard/Profile/Usercard";
import {
  Box,
  Avatar,
  Flex,
  Text,
  Badge,
  Heading,
  useToast,
} from "@chakra-ui/react";
import Longurlbox from "../../components/Hero/Longurlbox";
import LoginActs from "../../components/Dashboard/Profile/LoginActs";
import { getData } from "../../services/api";
import { updateData } from "../../services/api";

type Props = {};

interface User {
  accessToken: string;
  createbyIp: string;
  createdAt: string;
  email: string;
  userName: string;
  loginLogs: any;
  updatedAt: string;
}

const Profile = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [user, setuser] = useState<User>({
    accessToken: "",
    createbyIp: "",
    createdAt: "",
    email: "",
    userName: "",
    loginLogs: "",
    updatedAt: "",
  });
  const toast = useToast();
  const getdata = async () => {
    try {
      setLoading(true);

      const response = await getData(`/user/getuser`);
      setuser(response.user);
    } catch (error) {
      alert("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    

    getdata();
  }, []);

  const updateLoginact = async (id: string) => {
    try {
      const response = await updateData(
        { objectid: id },
        `/user/updateloginactivity`
      );
      getdata()
      toast({
        title: " updation Succsess",
        description: "You have succsessfully loged out from you session.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: " updation error",
        description: "Unable to Update loginactivity.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  if (loading) {
    return <h1>Loading....</h1>;
  }
  return (
    <Box w="99%" p="5" bg="white" textAlign="left">
      <Heading size="md" textAlign="left">
        Profile
      </Heading>

      <Usercard {...user} />

      <Box w="100%" mt="25px">
        <Text as="b" ml="15px" pt="30px">
          Login Activity
        </Text>
        <Text ml="15px">
          (Manage and log out your active sessions on other browsers and
          devices.)
        </Text>
        {user.loginLogs &&
          user.loginLogs.map((el: any) => {
            return (
              <LoginActs key={el._id} item={el} onLogout={updateLoginact} />
            );
          })}
      </Box>
    </Box>
  );
};

export default Profile;
