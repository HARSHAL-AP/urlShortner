import { Flex,Heading,Text,Box,Image,VStack} from '@chakra-ui/react'
import React from 'react'
import ApidocsSidebar from '../../components/Dashboard/Apidocs/ApidocsSidebar'

type Props = {}

const ApiDocumentation = (props: Props) => {
  return (
    <Box w="100%" bg="white" border="1px solid red">
    <Flex alignItems="center" bg="white" gap="10px" h="100px"  border="1px solid red">
        <Heading ml="20px">
          Swiftlink 
        </Heading>
        <Text>
            developer
        </Text>
    </Flex>
    <Box w="100%"  border="1px solid red">
     <Flex w="100%"  border="1px solid red">
         <Box w="20%"  h="100vh" display={{ base: 'none', md: 'block' }}  border="1px solid red">
         <ApidocsSidebar/>

         </Box>
         <Box w={{ base: '100%', md: '80%' }}  border="1px solid red">
            

         </Box>
     </Flex>
    </Box>
    </Box>
  )
}

export default ApiDocumentation