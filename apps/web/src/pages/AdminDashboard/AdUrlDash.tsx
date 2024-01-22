import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Button,
  Image,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,useToast
} from "@chakra-ui/react";
import Herourl from "../../components/Dashboard/Url/Herourl";
import { IoIosArrowBack } from "react-icons/io";
import { Link as RouterLink, useLocation ,useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getData ,deletData} from "../../services/api";
import { RootState } from "../../redux/store";
import Linechart from "../../components/Dashboard/Url/Linechart";
import Tablecon from "../../components/Dashboard/Url/Tablecon";
import { getSinleurl } from "../../redux/urlSlice";
import { MdDelete } from "react-icons/md";
type Props = {}

const AdUrlDash = (props: Props) => {
    const { id } = useParams();
    const toast = useToast();
    const accestoken = useSelector((state: RootState) => state.auth.accessToken);
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const data = useSelector((state: RootState) => state.urls.singleurl);
    useEffect(() => {
      const getdata = async () => {
        try {
          setLoading(true);
  
          const response = await getData(
            `/url/get/${id}?accessToken=${accestoken}`
          );
  
          dispatch(getSinleurl(response));
        } catch (error) {
          alert("Internal Server Error");
        } finally {
          setLoading(false);
        }
      };
  
      getdata();
    }, [id, accestoken,dispatch]);
    
    const handleDelet=async()=>{
      try {
        const response = await deletData(
          `/url/delete/${id}?accessToken=${accestoken}`
        );
        toast({
          title: 'URL Deleted successfully',
          status: 'success',
          duration: 5000, 
          isClosable: true,
        });
        
      } catch (error) {
        toast({
          title: 'An error occurred while Deleting the URL',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        navigate("/dashboard/links");
      }
   
  
  
    }
  
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
      <>
        <Flex
          w="200px"
          alignItems="center"
          gap="10px"
          cursor="pointer"
          as={RouterLink}
          to="/dashboard/links"
        >
          <IoIosArrowBack />
          <Text as="b">Back to Links..</Text>
        </Flex>
  
        <Herourl link={data.url} />
        <Linechart data={data.statsForLastthirtyDays} />
        <Flex w="99%" gap="15px">
          <Box
            w="50%"
            bg="white"
            borderRadius="25px"
            p="20px"
            h="400px"
            mt="20px"
            mb="25px"
            overflow="auto"
            css={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
            }}
          >
            <Flex>
              <Heading size="sm">Clicks by Devices</Heading>
            </Flex>
            <TableContainer mt="20px" w="100%">
              <Table>
                <Tbody>
                  <Tr>
                    <Td>
                      <Text as="b" fontSize="md">
                        Location
                      </Text>
                    </Td>
                    <Td>
                      <Text as="b" fontSize="md">
                        Clicks
                      </Text>
                    </Td>
                  </Tr>
                  {data &&
                    data.devices.map((el: any, index: number) => {
                      return (
                        <Tr key={index}>
                          <Td>{el.name}</Td>
                          <Td>{el.frequency}</Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <Box
            w="50%"
            bg="white"
            borderRadius="25px"
            p="20px"
            h="400px"
            mt="20px"
            mb="20px"
            overflow="auto"
            css={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
            }}
          >
            <Flex>
              <Heading size="sm">Clicks by Location</Heading>
            </Flex>
            <Tablecon data={data.locations} />
          </Box>
          
        </Flex>
        <Flex w="99%" justifyContent="flex-end" mb="20px" alignItems="center" gap="20px"><Text as="b">Delet this Url</Text><Button colorScheme="red" leftIcon={<MdDelete />} onClick={handleDelet}>Delet</Button></Flex>
      </>
    );
  };
export default AdUrlDash