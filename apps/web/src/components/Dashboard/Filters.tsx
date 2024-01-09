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

const CustomDateFilter: React.FC<CustomDateFilterProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateSelection = (date: string) => {
    setSelectedDate(date);

    const searchParams = new URLSearchParams(location.search);
    searchParams.set("selectedDate", date);

    navigate({ search: searchParams.toString() });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Date</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <input
            type="date"
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => handleDateSelection(selectedDate)}
            variant="outline"
          >
            Apply
          </Button>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const Filters = () => {
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
  const [data, setData] = useState([]);
  const [tags, settags] = useState<string[]>([]);
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
        alert("Internal Server Error");
      }
    };

    fetchData();
  }, [accessToken]);

  const handleFilterSelection = (value: string) => {
    settags((prevFilters) => {
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
    settags([]); // Clear all selected filters
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("tags");
    navigate({ search: searchParams.toString() });
    onDrawerClose();
  };

  
  const isClearFiltersVisible = location.search.includes("tag");

  return (
    <Flex  justify="left" gap="10px" ml="20px" >
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
