import * as React from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";

const UserPage: React.FC = () => {
  const { id } = useParams();
  return (
    <Box
      sx={{
        marginTop: "0.5rem",
        overflow: "overlay",
        maxHeight: "80vh",
        bgcolor: "#ffffff",
        padding: "1rem 0.5rem",
      }}
    >
      {id ?? "User self"}
    </Box>
  );
};

export default UserPage;
