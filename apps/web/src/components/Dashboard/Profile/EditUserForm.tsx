import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Box,
  Tag,
  TagLabel,
  HStack,
  Heading,
  FormErrorMessage,
  Flex,useToast
} from "@chakra-ui/react";
type Props = {}

const EditUserForm = (props: Props) => {
  return (
    <Box>
      <FormLabel mt="30px">User Name </FormLabel>
          <Input
            type="text"
            placeholder="user Name "
            
          />
          <Button w="100%" mt="5" variant="outline" colorScheme="blue">Submit</Button>
    </Box>
  )
}

export default EditUserForm