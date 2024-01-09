import React, { useState, useEffect } from "react";
import { Flex, Select } from "@chakra-ui/react";
import { FaLongArrowAltUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

type Props = {};

const SortingOptions = (props: Props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [selectedSort, setSelectedSort] = useState(
    queryParams.get("sort") || ""
  );

  useEffect(() => {
    const updateQueryParams = () => {
      const newParams = new URLSearchParams(location.search);

      newParams.delete("sort");

      if (selectedSort) {
        newParams.set("sort", selectedSort);
      }

      window.history.replaceState(null, "", `?${newParams.toString()}`);
    };

    updateQueryParams();
  }, [location, selectedSort]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(event.target.value);
  };

  return (
    <Flex align="center" justify="end">
      <Select
        placeholder="Sort"
        bg="white"
        value={selectedSort}
        onChange={handleSortChange}
      >
        <option value="created_date">Created Date</option>
        <option value="expiry_date">Expiry Date</option>
        <option value="total_clicks_high">Click High to Low</option>
        <option value="total_clicks_low">Click Low to High</option>
      </Select>
    </Flex>
  );
};

export default SortingOptions;
