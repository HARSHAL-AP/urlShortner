import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Modal,
  IconButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spacer,
  Image,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getData } from "../../services/api";
import { getUrl } from "../../redux/urlSlice";
import { useLocation } from "react-router-dom";
import NoData from "../../components/NoData";

type Props = {};

const AdUsers = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const [data, setdata] = useState([]);
  const [prevQueryParams, setPrevQueryParams] = useState<string>("");
  useEffect(() => {
    const getdata = async () => {
      try {
        setLoading(true);
        //const queryParams = location.search
        //  ? `${location.search}&accessToken=${accestoken}`
        //  : `?accessToken=${accestoken}`;
        const response = await getData(`/user/getall`);
        setdata(response.data);
      } catch (error) {
        alert("Internal Server Error");
      } finally {
        setLoading(false);
      }
    };

    getdata();
    if (location.search !== prevQueryParams) {
      setPrevQueryParams(location.search);
    }
  }, [dispatch, location.search, prevQueryParams]);

  console.log(data);

  if (loading) {
    return (
      <Box w="5%" m="auto" mt="25vh">
        <Image
          w="100%"
          src="https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-06-428_512.gif"
          alt=""
        />
      </Box>
    );
  }
  return (
    <Box mx="auto" w="100%">
      <Heading as="h3" size="md" textAlign="left" mt="30px" ml="20px">
        Users
      </Heading>
      

     
      
        
        <TableContainer w="98%" bg="white" ml="15px" p="3" mt="15px">
          <Table >
            <Thead>
              <Tr>
                <Th>User Name</Th>
                <Th>Email</Th>
                <Th>Acive since </Th>
                <Th>dumy</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data &&
                data.map((el: any) => {
                  return (
                    <Tr key={el._id} >
                      <Td>{el.userName}</Td>
                      <Td>{el.email}</Td>
                      <Td>{el.createdAt}</Td>
                      <Td>tect</Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      
    </Box>
  );
};

export default AdUsers;
