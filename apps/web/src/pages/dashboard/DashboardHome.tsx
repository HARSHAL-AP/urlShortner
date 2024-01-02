import React, { FC,useEffect,useState } from "react";
import { Box, Text, Heading, Grid, Flex, IconButton } from "@chakra-ui/react";
import AnalysisCard from "../../components/Dashboard/Analytics/AnalysisCard";
import AcccesTokencard from "../../components/Dashboard/AcccesTokencard";
import TodaysStats from "../../components/Dashboard/Analytics/TodaysStats";
import { getData } from "../../services/api";
import { RootState } from "../../redux/store";
import { useDispatch,useSelector } from "react-redux";
import AnalysisCard2 from "../../components/Dashboard/Analytics/AnalysisCard2";


const DashboardHome: FC = () => {
  const [data,setdata]=useState([])
  const accestoken = useSelector(
    (state: RootState) => state.auth.accessToken
  );
  useEffect(()=>{
    const getdata = async () => {
      try {
        const response= await getData(`/url/getweaklystats?accessToken=${accestoken}`);
        setdata(response)
        console.log(data)
      } catch (error) {
        alert("Internal Server Error");
      }
    };

    getdata();


  },[accestoken])




  return (
    <>
      <Box
        w={{ base: "95%", lg: "99%" }}
        m="auto"
        display="flex"
        flexDirection="column"
        textAlign="left"
        color="blue.600"
        p="30px"
        borderRadius="5px"
        mb={8}
        borderWidth="1px"
        bg="white"
      >
        {/* Heading with dynamic username */}
        <Heading as="h3" size="xl" mb={4}>
          Welcome, 🖐️!
        </Heading>

        <Text fontSize="md">Track your links with every detail here.</Text>
      </Box>

      {/* Grid of 3 boxes */}
      <Grid
        templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
        gap={4}
        width={{ base: "95%", lg: "99%" }}
        margin="auto"
      >
        <AnalysisCard data={data} title="Url Gernated" />
        <AnalysisCard2 data={data}  title=""/>
        <TodaysStats/>
      </Grid>
      <AcccesTokencard />
    </>
  );
};

export default DashboardHome;
