import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { IconButton } from "@mui/material";

const NotFoundPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography align="center" variant="h2" component="h1" gutterBottom>
          404 Error
        </Typography>
        <Typography align="center" variant="h5" component="h2" gutterBottom>
          <IconButton size="large">
            <ReportGmailerrorredIcon fontSize="large" sx={{ color: "red" }} />
          </IconButton>
          {"Page Not Found!"}
        </Typography>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
