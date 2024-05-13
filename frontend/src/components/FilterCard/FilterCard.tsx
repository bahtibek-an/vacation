import { Box } from "@mui/system";
import { Checkbox } from "@mui/material"
import React from "react";
import { Text } from "../../styled";

interface IFilter {
  filter: {
    follow: boolean;
    upcoming: boolean;
    active: boolean;
    page: number;
    limit: number;
  };
  setFilter: React.Dispatch<
    React.SetStateAction<{
      follow: boolean;
      upcoming: boolean;
      active: boolean;
      page: number;
      limit: number;
    }>
  >;
}

const FilterCard: React.FC<IFilter> = ({ filter, setFilter }) => {

  const changeFilter = (type: "follow" | "upcoming" | "active") => {
    setFilter((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const filters = [
    {
      check: filter.follow,
      text: "Followed",
      handleChange: () => changeFilter("follow"),
    },
    {
      check: filter.upcoming,
      text: "Did not started",
      handleChange: () => changeFilter("upcoming"),
    },
    {
      check: filter.active,
      text: "Active",
      handleChange: () => changeFilter("active"),
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: "1130px",
        width: "100%",
        maxHeight: "78px",
        height: "78px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        margin: "30px auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      {filters.map(({ check, text, handleChange }) => (
        <Box
          key={text}
          sx={{
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <Checkbox
            value={check}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            onClick={handleChange}
          />
          <Text>{text}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default FilterCard;
