import React, { useState, useCallback } from "react";
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
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

type Props = {}

const Clickbylocation = (props: Props) => {
    const data=useSelector(
        (state: RootState) => state.urls.analytics.clicksByLocation
      );
      
  return (
    <TableContainer mt="20px" >
    <Table >
     
      <Tbody>
        <Tr>
          <Td><Text as="b" fontSize="md">Location</Text></Td>
          <Td><Text as="b" fontSize="md">Clicks</Text></Td>
        </Tr>
        {data&&data.map((el:any,index:number)=>{
            return <Tr key={index}>
            <Td>{el._id}</Td>
            <Td>{el.totalClicks}</Td>
          </Tr>
        })}
      </Tbody>
      
    </Table>
  </TableContainer>
  )
}

export default Clickbylocation