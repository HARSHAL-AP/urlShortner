import React, { useState } from 'react';
import { Box, Flex, Heading, Button, Modal,IconButton, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Spacer } from '@chakra-ui/react';
import { FaRegCalendarAlt ,FaFilter} from "react-icons/fa";

const Filters = () => {
  return (
    
    <Flex  justify="left" mt="5" gap="10px" ml="20px" >
    <Button variant='outline' gap="5px" bg="white"><FaRegCalendarAlt />  Filter By Created Date </Button>
    <Button variant='outline' gap="5px" bg="white"><FaFilter /> Add Filter </Button>

    </Flex>
  )
}

export default Filters