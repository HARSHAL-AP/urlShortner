import { Flex,Heading,Text,Box,Image,VStack} from '@chakra-ui/react'
import React from 'react'
import ApidocsSidebar from '../../components/Dashboard/Apidocs/ApidocsSidebar'
import { Outlet } from "react-router-dom";
import ApidocsFotter from '../../components/Dashboard/Apidocs/ApidocsFotter';
type Props = {}

const ApiDocumentation = (props: Props) => {
  return (
    <Box w="100%" bg="white" >
    <Flex alignItems="center" bg="white" gap="10px" h="100px"  >
        <Heading ml="20px">
          Swiftlink 
        </Heading>
        <Text>
            developer
        </Text>
    </Flex>
    <Box w="100%"  >
     <Flex w="100%"  >
         <Box w="18%"  h="100vh" display={{ base: 'none', md: 'block' }}  >
         <ApidocsSidebar/>

         </Box>
         <Box w={{ base: '100%', md: '100%' }}  >
            <Outlet/>
        
         </Box>
     </Flex>
    </Box>
    <ApidocsFotter/>
    </Box>  
  )
}

export default ApiDocumentation