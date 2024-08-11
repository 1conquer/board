import * as React from "react";
import { FunctionComponent } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SummarizeIcon from "@mui/icons-material/Summarize";
import CalendarViewWeekOutlinedIcon from "@mui/icons-material/CalendarViewWeekOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { useNavigate } from "react-router-dom";
import Routes from "./Constants/Routes";

type SideBarProps = {
  projectGuid: string;
};

const SideBar: FunctionComponent<SideBarProps> = (props) => {
  const { projectGuid } = props;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const moveTo = (key: Routes) => () => {
    switch (key) {
      case Routes.CreateTask: {
        navigate("task");
        break;
      }
      case Routes.Board: {
        navigate(projectGuid + "/board");
        break;
      }
      case Routes.Calendar: {
        navigate("calendar");
        break;
      }
      case Routes.Reports: {
        navigate("reports");
        break;
      }
      case Routes.Backlog: {
        navigate(projectGuid + "/backlog");
        break;
      }
      case Routes.Settings: {
        navigate("setting");
        break;
      }
      default: {
        navigate("/");
        break;
      }
    }
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem onClick={moveTo(Routes.CreateTask)} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PostAddIcon />
            </ListItemIcon>
            <ListItemText primary={"Create Task"} />
          </ListItemButton>
        </ListItem>
        <ListItem onClick={moveTo(Routes.Board)} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CalendarViewWeekOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Board"} />
          </ListItemButton>
        </ListItem>
        <ListItem onClick={moveTo(Routes.Calendar)} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CalendarMonthOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Calendar"} />
          </ListItemButton>
        </ListItem>
        <ListItem onClick={moveTo(Routes.Reports)} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SummarizeIcon />
            </ListItemIcon>
            <ListItemText primary={"Reports"} />
          </ListItemButton>
        </ListItem>
        <ListItem onClick={moveTo(Routes.Backlog)} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <WebStoriesIcon />
            </ListItemIcon>
            <ListItemText primary={"Backlog"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem onClick={moveTo(Routes.Settings)} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <TuneRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={"Settings"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        onClick={toggleDrawer(true)}
        size="small"
        edge="start"
        aria-label="open drawer"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default SideBar;
