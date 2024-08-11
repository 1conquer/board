import * as React from "react";
import Box from "@mui/material/Box";

const CalendarPage: React.FC = () => {
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
      Calendar
    </Box>
  );
};

export default CalendarPage;
