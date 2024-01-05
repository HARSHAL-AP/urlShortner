import React, { FC,useEffect,useState } from "react";
import { Box, Text, Heading, Grid, Flex, IconButton } from "@chakra-ui/react";
import { FaHourglassEnd } from "react-icons/fa";
import { LiaExternalLinkSquareAltSolid } from "react-icons/lia";
import { MdAdsClick } from "react-icons/md";
import { getData } from "../../../services/api"
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface Props {}
interface State{
    newUrls:any;
    totalClicksToday:number;
    expiringUrls:any;
}

const TodaysStats = (props: Props) => {
    const [data,setdata]=useState<State>({newUrls:[],
        totalClicksToday:0,
        expiringUrls:[]})
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(()=>{
    const fetchData = async () => {
        try {
          const response = await getData(
            `/url/gettodaystats?accessToken=${accessToken}`
          );
          setdata(response);
          
        } catch (error) {
          alert("Internal Server Error");
        }
      };
  
      fetchData();


  },[accessToken])


  return (
    <Flex
          alignItems="center"
          justifyContent="space-between"
          w="100%"
          h="300px"
          flexDirection="column"
        >
          <Flex
            w="100%"
            h="85px"
            bg="green.100"
            borderRadius="15px"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex w="60%" ml="20px" alignItems="center" justifyContent="left" gap="15px">
              <IconButton
                variant="outline"
                colorScheme="blue"
                aria-label='new links'
                size='lg'
                isRound
                icon={<LiaExternalLinkSquareAltSolid />}
              />
              <Text as="b" fontSize='xl' >
                Todays New Url
              </Text>
            </Flex>

            <Box mr="20px"><Text as="b" fontSize='xl'>
              {data.newUrls.length}
              </Text></Box>
          </Flex>
          <Flex
            w="100%"
            h="85px"
            bg="blue.100"
            borderRadius="15px"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex w="60%" ml="20px" alignItems="center" justifyContent="left" gap="15px">
              <IconButton
                variant="outline"
                colorScheme="blue"
                aria-label='new links'
                size='lg'
                isRound
                icon={<MdAdsClick />}
              />
              <Text as="b" fontSize='xl' >
                Todays Clicks
              </Text>
            </Flex>

            <Box mr="20px"><Text as="b" fontSize='xl'>
               {data.totalClicksToday}
              </Text></Box>
          </Flex>
          <Flex
            w="100%"
            h="85px"
            bg="red.100"
            borderRadius="15px"
            alignItems="center"
            justifyContent="space-between"
           
          >
            <Flex w="60%" ml="20px" alignItems="center" justifyContent="left" gap="15px" >
              <IconButton
                variant="outline"
                colorScheme="red"
                aria-label='new links'
                size='lg'
                isRound
                icon={<FaHourglassEnd />}
              />
              <Text as="b" fontSize='xl' >
                Today Expiring
              </Text>
            </Flex>

            <Box mr="20px"><Text as="b" fontSize='xl'>
              {data.expiringUrls.length}
              </Text></Box>
          </Flex>
        </Flex>
  )
}

export default TodaysStats