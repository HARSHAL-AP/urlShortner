import React, { useState, useEffect } from "react";
import { Flex, Select } from "@chakra-ui/react";
import { FaLongArrowAltUp } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {};

const SortingOptions = (props: Props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [selectedSort, setSelectedSort] = useState(
    queryParams.get("sort") || ""
  );

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortValue = event.target.value;

    setSelectedSort(newSortValue);

    // Update URL query parameter
    if (newSortValue !== "") {
      queryParams.set("sort", newSortValue);
    } else {
      queryParams.delete("sort");
    }

    // Update the URL with the new query parameters
    navigate(`${location.pathname}?${queryParams.toString()}`, {
      replace: true,
    });
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
        <option value="title_asc">Title A to Z</option>
        <option value="title_desc">Title Z to A</option>
        <option value="total_clicks_high">Click High to Low</option>
        <option value="total_clicks_low">Click Low to High</option>
      </Select>
    </Flex>
  );
};

export default SortingOptions;
