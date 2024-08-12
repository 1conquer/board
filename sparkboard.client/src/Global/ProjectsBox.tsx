import { FunctionComponent } from "react";
import { Dispatcher } from "../Common/Flux/Dispatcher";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ProjectChangedAction } from "../Actions/ProjectChangedAction";

type ProjectsBoxProps = {
  projectGuid?: string;
};

const ProjectsBox: FunctionComponent<ProjectsBoxProps> = (props) => {
  const dispatcher = Dispatcher.Instance;

  const onChange = (event: React.SyntheticEvent, value: any) => {
    dispatcher.dispatch(new ProjectChangedAction());
  };

  return (
    <Autocomplete
      disablePortal
      onChange={onChange}
      size="small"
      id="combo-box-demo"
      options={projects}
      defaultValue={projects[0]}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Project" />}
    />
  );
};

const projects = [
  {
    label: "Default project",
    guid: "7ad2fcb4-ef55-4ea5-af04-db3cbcaf00cd",
  },
  { label: "The project", guid: "43ae4baa-6b9c-40bc-90f3-53393708795b" },
  {
    label: "Project 1",
    guid: "70b636a9-76c4-4030-8cdd-a6118dc4a8b4",
  },
  { label: "Project 2", guid: "8ead20e0-a1e4-4c99-be31-0faf307d468a" },
];

export default ProjectsBox;
