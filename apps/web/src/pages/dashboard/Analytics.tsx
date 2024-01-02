import React, { useState, useCallback,useEffect } from "react";
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
  Text,Image
} from "@chakra-ui/react";
import Filters from "../../components/Dashboard/Filters";
import Piecahrt from "../../components/Dashboard/Analytics/Piecahrt";
import { MdOutlineTrendingUp } from "react-icons/md";
import LinkCard2 from "../../components/Dashboard/Analytics/Linkcards2";
import Expirinurls from "../../components/Dashboard/Analytics/Expirinurls";
import Mostview from "../../components/Dashboard/Analytics/Mostview";
import { RootState } from "../../redux/store";
import { getData } from "../../services/api";
import { useDispatch,useSelector } from "react-redux";
import { getAllstats } from "../../redux/urlSlice";
import Clickbylocation from "../../components/Dashboard/Analytics/Clickbylocation";
import { useLocation } from "react-router-dom";

const Analytics = () => {
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  const location = useLocation();
  const [prevQueryParams, setPrevQueryParams] = useState<string>("");

  const accestoken = useSelector(
    (state: RootState) => state.auth.accessToken
  );
  const analyticsData = useSelector(
    (state: RootState) => state.urls.analytics
  );
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const today = new Date();
  const formattedDate = today.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  useEffect(()=>{
   
    const getdata = async () => {
      try {
        setLoading(true)
        const queryParams = location.search ? `${location.search}&accessToken=${accestoken}` : `?accessToken=${accestoken}`;
        const response= await getData(`/url/getallstats${queryParams}`);
        dispatch(getAllstats(response))
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
    
  },[dispatch, location.search, prevQueryParams])
  if(loading){
    return <Box w="5%" m="auto" mt="25vh">
      <Image w="100%" src="https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-06-428_512.gif" alt="" />
    </Box>
  }

  return (
    <Box mx="auto" w="100%">
      <Heading as="h3" size="lg" textAlign="left" mt="20px" ml="30px">
        Analytics
      </Heading>
      <Box>
        <Filters />
      </Box>
      <Flex w="98%" ml="20px" mt="25px" gap="20px">
        <Box w="50%">
          <Box
            w="100%"
            bg="white"
            borderRadius="25px"
            p="20px"
            h="200px"
            mt="20px"
          >
            <Flex>
              <Heading size="sm">Clicks over Time</Heading>
            </Flex>
            <Box w="100%" mt="20px">
              <Flex alignItems="center" m="auto" justifyContent="center">
                
                <Heading fontSize="30px">{formattedDate} </Heading>
              </Flex>
              <Flex alignItems="center" m="auto" justifyContent="center">
                
                <Heading fontSize="24px" color="green">
                 {analyticsData.totalClicks}+ Clikcs
                </Heading>
              </Flex>
            </Box>
          </Box>
         <Expirinurls data={analyticsData.expiringSoonUrls}/>
         <Mostview data={analyticsData.mostTrendingLinks}/>
          </Box>
        
        <Box w="50%">
          <Box
            w="100%"
            bg="white"
            borderRadius="25px"
            p="20px"
            h="400px"
            mt="20px"
          >
            <Flex>
              <Heading size="sm">Clicks by Divice</Heading>
            </Flex>
            <Flex
              m="auto"
              alignItems="center"
              justifyContent="center"
              w="100%"
              mt="20px"
            >
            
              <Piecahrt />
            </Flex>
          </Box>
          <Box
            w="100%"
            bg="white"
            borderRadius="25px"
            p="20px"
            h="600px"
            mt="20px"
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
            <Clickbylocation/>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Analytics;
