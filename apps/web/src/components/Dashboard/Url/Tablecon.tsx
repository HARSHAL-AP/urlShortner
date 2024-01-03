import React from 'react'
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
    Text, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from "@chakra-ui/react";

interface Tablecon {
  data:any;
}

const Tablecon:React.FC<Tablecon> = ({data}) => {
  return (
    <TableContainer mt="20px" w="100%" >
    <Table >
     
      <Tbody>
        <Tr>
          <Td><Text as="b" fontSize="md">Location</Text></Td>
          <Td><Text as="b" fontSize="md">Clicks</Text></Td>
        </Tr>
        {data&&data.map((el:any,index:number)=>{
            return <Tr key={index}>
            <Td>{el.name}</Td>
            <Td>{el.frequency}</Td>
          </Tr>
        })}
      </Tbody>
      
    </Table>
  </TableContainer>
  )
}

export default Tablecon