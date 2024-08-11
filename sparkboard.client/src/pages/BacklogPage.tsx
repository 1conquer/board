import * as React from "react";
import Box from "@mui/material/Box";

const BacklogPage: React.FC = () => {
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
      Backlog
    </Box>
  );
};

export default BacklogPage;
