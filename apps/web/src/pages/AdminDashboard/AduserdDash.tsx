import React, { useEffect, useState } from "react";

import Adusercard from "../../components/Admindashboard/Adusercard";
import {
    Box,
    Avatar,
    Flex,
    Text,
    Badge,
    Heading,
    useToast,Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from "@chakra-ui/react";
  import LoginActs from "../../components/Dashboard/Profile/LoginActs";
  import { getData } from "../../services/api";
import { updateData } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
type Props = {}
interface User {
    accessToken: string;
    createbyIp: string;
    createdAt: string;
    email: string;
    userName: string;
    loginLogs: any;
    updatedAt: string;
  }
  
const AduserdDash = (props: Props) => {
    const [loading, setLoading] = useState(false);
    const [urls,seturls]=useState([])
    const navigate=useNavigate()
  const [user, setuser] = useState<User>({
    accessToken: "",
    createbyIp: "",
    createdAt: "",
    email: "",
    userName: "",
    loginLogs: "",
    updatedAt: "",
  });
  const {id} =useParams();      
  const toast =useToast();
  const getdata = async () => {
    try {
      setLoading(true);

      const response = await getData(`/user/get_user_analytics/${id}`);
      setuser(response.userDetails._doc);
     
    } catch (error) {
      alert("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    

    getdata();
  }, []);
  useEffect(() => {
    const geturldata = async () => {
      try {
        setLoading(true);
  
        const response = await getData(`/url/geturls?accessToken=${user.accessToken}`);
        seturls(response.data);
        console.log(response)

      } catch (error) {
        alert("Internal Server Error");
      } finally {
        setLoading(false);
      }
    };
   
    if(user.accessToken!==""){

      geturldata();
    }

  }, [user]);
  return (
    <Box w="99%" p="5" bg="white" textAlign="left">
      <Heading size="md" textAlign="left">
        Profile
      </Heading>

      <Adusercard {...user} />
      <Text as="b" ml="15px" pt="30px">
        Urls
      </Text>

      <Box w="100%" h="600px"  mt="15px" overflow="auto" >
      <TableContainer w="98%" bg="white" ml="15px" p="3" mt="15px" >
          <Table >
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Shot Url</Th>
                <Th>Total Clicks </Th>
                <Th>Created at </Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {urls &&
                urls.map((el: any,index:number) => {
                  return (
                    <Tr key={el._id} >
                      <Td>{index+1}</Td>
                      <Td>{el.shortUrl}</Td>
                      <Td>{el.accessCount}</Td>
                      <Td>{el.createdAt}</Td>
                      <Td cursor="pointer" onClick={()=>navigate(`/admin/links`)}><BsThreeDotsVertical/></Td>
                    </Tr>
                  );
                })}

            </Tbody>
          </Table>
        </TableContainer>


      </Box>


      <Box w="100%" mt="35px">
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
              <LoginActs key={el._id} item={el} onLogout={()=>alert("Update fun trigered")} />
            );
          })}
      </Box>
    </Box>
  )
}

export default AduserdDash