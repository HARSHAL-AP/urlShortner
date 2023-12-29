import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import Filters from "../../components/Dashboard/Filters";
import Linkcard from "../../components/Dashboard/Linkcards";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getData } from "../../services/api";
import { getUrl } from "../../redux/urlSlice";


interface ShortenedLink {
  longUrl: string;
  shortUrl: string;
  description?: string;
  customDomain?: string;
  tags?: string[];
}

const Links = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const accestoken = useSelector(
    (state: RootState) => state.auth.accessToken
  );
  const data=useSelector(
    (state: RootState) => state.urls.urls
  );
  useEffect(()=>{
    const getdata = async () => {
      try {
        const response= await getData(`/url/geturls?accessToken=${accestoken}`);
        dispatch(getUrl(response.data));
        console.log(data)
      } catch (error) {
        alert("Internal Server Error");
      } finally {
        setLoading(false);
      }
    };

    getdata();


  },[dispatch])

  return (
    <Box mx="auto" w="100%">
      <Heading as="h3" size="md" textAlign="left" mt="30px" ml="20px">
        Links
      </Heading>
      <Filters />

      <Box mt="30px" w="100%" pl="20px">
       {
        data&&data.map((el:any)=>{
        return  <Linkcard key={el._id} link={el} />
        })
       }



       
      </Box>
    </Box>
  );
};

export default Links;
