import React, { FC } from "react";
import { Box, Text, Heading, Grid, Flex, IconButton } from "@chakra-ui/react";
import AnalysisCard from "../../components/Dashboard/Analytics/AnalysisCard";
import AcccesTokencard from "../../components/Dashboard/AcccesTokencard";
import { FaHourglassEnd } from "react-icons/fa";
import { LiaExternalLinkSquareAltSolid } from "react-icons/lia";
import { MdAdsClick } from "react-icons/md";

const data = [
  { name: "Jan", uv: 100 },
  { name: "Feb", uv: 200 },
  { name: "Mar", uv: 300 },
  { name: "Apr", uv: 250 },
  { name: "May", uv: 359 },
  { name: "Jun", uv: 400 },
  { name: "Jul", uv: 250 },
];
const DashboardHome: FC = () => {
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
        <AnalysisCard data={data} title="Total Cliks" />
        <AnalysisCard data={data} title="Url Gernated" />
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
                200
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
                200
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
                50
              </Text></Box>
          </Flex>
        </Flex>
      </Grid>
      <AcccesTokencard />
    </>
  );
};

export default DashboardHome;
