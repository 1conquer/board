import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";
import StarIcon from "./Icons/StarIcon";
import { useLocation } from "react-router-dom";

const IconBreadcrumbs: React.FC = () => {
  const location = useLocation();
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ padding: "1rem" }}
    >
      <Link
        underline="hover"
        sx={{ display: "flex", alignItems: "center" }}
        color="inherit"
        href="/"
      >
        <StarIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Home
      </Link>
      <Link
        underline="hover"
        sx={{ display: "flex", alignItems: "center" }}
        color="inherit"
        href="/material-ui/getting-started/installation/"
      >
        <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Core
      </Link>
      <Typography
        sx={{ display: "flex", alignItems: "center" }}
        color="text.primary"
      >
        <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        {location.pathname}
      </Typography>
    </Breadcrumbs>
  );
};

export default IconBreadcrumbs;
