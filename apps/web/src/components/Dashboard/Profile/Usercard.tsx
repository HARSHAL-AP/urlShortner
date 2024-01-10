import React, { useState } from "react";
import {
  Box,
  Avatar,
  Flex,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Heading,
  IconButton,Center
} from "@chakra-ui/react";
import { FaEdit, FaCopy } from "react-icons/fa";
import { BsQuestion } from "react-icons/bs";
import EditUserForm from "./EditUserForm";
import ResetPassword from "./ResetPassword";

interface UserCardProps {
  
  email: string;
  name: string;
  organization?: string;
  domain?: string;
  accessToken: string;
}






const UserCard: React.FC<UserCardProps> = ({

  email,
  name,
  organization,
  domain,
  accessToken,
}) => {
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  const { isOpen: isResetPasswordModalOpen, onOpen: onResetPasswordModalOpen, onClose: onResetPasswordModalClose } = useDisclosure();

  return (
    <>
      <Flex
        w={{ base: "100%", md: "100%" }}
        border="1px"
        borderColor="gray.200"
        boxShadow='lg'
        alignItems="center"
        p="5"
        mt="25px"
        borderRadius="10px"
      >
        <Center w="100px" h="100px" borderRadius="50%" bg="blue.800">
          <Heading color="white">{name[0]}</Heading>
        </Center>
        <Box ml="15px">
          <Heading size="xl" textAlign="left">
            {name}
          </Heading>
          <Box w="100%">{email}</Box>
        </Box>
      </Flex>
      <Box  borderRadius="5px" p="4" mt="30px" mb="30px" bg="white" w="99%">
      <Text fontSize="sm" fontWeight="bold" textAlign="left">
        ACCESS TOKEN
      </Text>
      <Flex w="100%" mt="25px" gap="20px">
        <Heading fontSize="2xl" mb="2">
          {accessToken}
        </Heading>
        <Button size="sm" colorScheme="green">
        <FaCopy />
        </Button>
      </Flex>
    
      
    </Box>
      <Flex
        w={{ base: "100%", md: "100%" }}
       
        bg="white"
        alignItems="center"
        p="5"
        mt="25px"
        borderRadius="10px"
      >
    
        <Button onClick={onEditModalOpen}>Edit User</Button>
        <Text ml="10px " textDecoration="underline" onClick={onResetPasswordModalOpen}>
          Reset Password
        </Text>
      </Flex>

      {/* Edit User Modal */}
      <Modal isOpen={isEditModalOpen} onClose={onEditModalClose}>
        <ModalOverlay />
        <ModalContent>
         
          <ModalCloseButton />
          <ModalBody>
           <EditUserForm/>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Reset Password Modal */}
      <Modal isOpen={isResetPasswordModalOpen} onClose={onResetPasswordModalClose}>
        <ModalOverlay />
        <ModalContent>
          
          <ModalCloseButton />
          <ModalBody>
           <ResetPassword/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserCard;
