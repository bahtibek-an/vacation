import { Box } from "@mui/system";
import React from "react";
import ModifyVacation from "../../components/ModifyVacation/ModifyVacation.tsx";

const Manager: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "gray",
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: -99,
        py: "50px"
      }}
    >
      <ModifyVacation/>
    </Box>
  );
};

export default Manager;
