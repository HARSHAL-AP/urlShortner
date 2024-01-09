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
  Spacer,Image
} from "@chakra-ui/react";
import Filters from "../../components/Dashboard/Filters";
import Linkcard from "../../components/Dashboard/Linkcards";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getData } from "../../services/api";
import { getUrl } from "../../redux/urlSlice";
import { useLocation } from "react-router-dom";
import NoData from "../../components/NoData";
import Sortingoptions from "../../components/Dashboard/Sortingoptions";

interface ShortenedLink {
  longUrl: string;
  shortUrl: string;
  description?: string;
  customDomain?: string;
  tags?: string[];
}

const Links = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const accestoken = useSelector((state: RootState) => state.auth.accessToken);
  const data = useSelector((state: RootState) => state.urls.urls);
  const [prevQueryParams, setPrevQueryParams] = useState<string>("");

  useEffect(() => {
    const getdata = async () => {
      try {
        setLoading(true);
        const queryParams = location.search
          ? `${location.search}&accessToken=${accestoken}`
          : `?accessToken=${accestoken}`;
        const response = await getData(`/url/geturls${queryParams}`);
        dispatch(getUrl(response.data));
        
      } catch (error) {
        alert("Internal Server Error");
      } finally {
        setLoading(false);
      }
    };

    getdata();
    if (location.search !== prevQueryParams) {
      setPrevQueryParams(location.search);
    }
  }, [dispatch, location.search, prevQueryParams]);
  if(loading){
    return <Box w="5%" m="auto" mt="25vh">
      <Image w="100%" src="https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-06-428_512.gif" alt="" />
    </Box>
  }
  return (
    <Box mx="auto" w="100%">
      <Heading as="h3" size="md" textAlign="left" mt="30px" ml="20px">
        Links
      </Heading>
      <Flex  gap="10px" mt="5" >
      <Filters />
      <Sortingoptions/>
      </Flex>
      

      <Box mt="30px" w="100%" pl="20px">
        
        {!loading&&data.length===0&&<NoData/>}

        {data &&
          data.map((el: any) => {
            return <Linkcard key={el._id} link={el} />;
          })}
      </Box>
    </Box>
  );
};

export default Links;
