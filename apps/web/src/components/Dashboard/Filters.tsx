import React, { useState, useEffect } from "react";
import {
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  VStack,
  Checkbox,
  StackDivider,
  Text,
  Box,
  Input,
} from "@chakra-ui/react";
import { FaRegCalendarAlt, FaFilter } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { getData } from "../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface CustomDateFilterProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomDateFilter: React.FC<CustomDateFilterProps> = ({isOpen,onClose}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  
  const handleDay = () => {
    const today = new Date();
    setStartDate(today.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);
  };

  const handleWeak = () => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);

    setStartDate(weekAgo.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);
  };

  const handleMonth = () => {
    const today = new Date();
    const monthAgo = new Date(today);
    monthAgo.setMonth(today.getMonth() - 1);

    setStartDate(monthAgo.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);
    
    
  };



  const handleSubmit=()=>{
   
    const searchParams = new URLSearchParams(location.search);

   
    searchParams.set('startDate', startDate);
    searchParams.set('endDate', endDate);
  
    
    navigate({ search: searchParams.toString() });
  
    
    onClose();



  }

  const handleClear=()=>{
    const searchParams = new URLSearchParams(location.search);

  
    searchParams.delete('startDate');
    searchParams.delete('endDate');
  
   
    navigate({ search: searchParams.toString() });
  
    
    onClose();
  }
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filter by created date</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Filter by the last</Text>
          <Flex gap="20px" mt="5" mb="5">
            <Button variant="outline" colorScheme="blue" onClick={handleDay}>
             
              Day
            </Button>
            <Button variant="outline" colorScheme="blue" onClick={handleWeak}>
              
              Weak
            </Button>
            <Button variant="outline" colorScheme="blue" onClick={handleMonth}>
              Month
            </Button>
          </Flex>
          <Text>Or by custom date range:</Text>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            gap="10px"
            mt="5"
          >
            <Input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)}/> <Text>TO</Text>
            <Input type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)}/>
          </Flex>
        </ModalBody>
        <ModalFooter> 
        <Button variant="outline" onClick={handleClear} m="2">Clear All </Button>
          <Button variant="outline" onClick={handleSubmit} m="2">Apply</Button>
          
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};


const Filters: React.FC = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const [data, setData] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(
          `/url/alltags?accessToken=${accessToken}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Internal Server Error");
      }
    };

    fetchData();
  }, [accessToken]);

  const handleFilterSelection = (value: string) => {
    setTags((prevFilters) => {
      if (prevFilters.includes(value)) {
        return prevFilters.filter((filter) => filter !== value);
      } else {
        return [...prevFilters, value];
      }
    });
  };

  const applyFilters = () => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.delete("selectedFilter");

    tags.forEach((filter) => {
      searchParams.append("tags", filter);
    });

    navigate({ search: searchParams.toString() });

    onDrawerClose();
  };

  const clearAllFilters = () => {
    setTags([]);
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("tags");
    navigate({ search: searchParams.toString() });
    onDrawerClose();
  };

  const isClearFiltersVisible = location.search.includes("tag");

  return (
    <Flex justify="left" mt="5" gap="10px" ml="20px">
      <Button variant="outline" gap="5px" bg="white" onClick={onModalOpen}>
        <FaRegCalendarAlt /> Select Date
      </Button>
      <Button variant="outline" gap="5px" bg="white" onClick={onDrawerOpen}>
        <FaFilter /> Add Filter
      </Button>
      {isClearFiltersVisible && (
        <Button onClick={clearAllFilters} variant="outline">
          Clear Filters
        </Button>
      )}
      <CustomDateFilter isOpen={isModalOpen} onClose={onModalClose} />

      <Drawer placement="right" onClose={onDrawerClose} isOpen={isDrawerOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter Options</DrawerHeader>
          <DrawerBody>
            <VStack
              align="start"
              divider={<StackDivider borderColor="gray.200" />}
            >
              <Text as="b">By Tags</Text>
              {data.map((item) => (
                <Checkbox
                  key={item}
                  isChecked={tags.includes(item)}
                  onChange={() => handleFilterSelection(item)}
                >
                  {item}
                </Checkbox>
              ))}
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={applyFilters} variant="outline">
              Apply
            </Button>
            <Button onClick={onDrawerClose} variant="outline">
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Filters;
