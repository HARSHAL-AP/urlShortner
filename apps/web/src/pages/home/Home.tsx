import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import Accordian from '../../components/Hero/Accordian'
import {Box,Flex} from "@chakra-ui/react"
import Hero2 from '../../components/Hero/Hero2'
import Fotter from '../../components/Fotter/Fotter'

const Home = () => {
  return (
    <Box bg="white">
    <Navbar/>
    <Hero/>
    <Hero2/>
    <Box w="100%" bg="white"><Accordian/></Box>
    <Fotter/>
    </Box>
  )
}

export default Home