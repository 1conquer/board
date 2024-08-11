import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TaskCard from "../Task/TaskCard";

const BoardPage: React.FC = () => {
  const Filters = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    marginBottom: "0.5rem",
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const Column = styled(Box)(({ theme }) => ({
    backgroundColor: "rgba(153, 204, 255, 0.1)",
    borderRadius: "1rem",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  return (
    <Box
      sx={{
        overflow: "overlay",
        maxHeight: "80vh",
        bgcolor: "#ffffff",
        padding: "1rem 0.5rem",
      }}
    >
      <Filters>Filters</Filters>
      <Grid container spacing={0.5}>
        <Grid item xs>
          <Column>
            <TaskCard />
            <TaskCard />
          </Column>
        </Grid>
        <Grid item xs>
          <Column>
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </Column>
        </Grid>
        <Grid item xs>
          <Column>
            <TaskCard />
            <TaskCard />
          </Column>
        </Grid>
        <Grid item xs>
          <Column>
            <TaskCard />
            <TaskCard />
          </Column>
        </Grid>
        <Grid item xs>
          <Column>
            <TaskCard />
            <TaskCard />
          </Column>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BoardPage;
