import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { MdOutlineAddToPhotos } from "react-icons/md";
import { Project, Task } from '../Home';
import TaskTable from './TaskTable';
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

type Props = {
    project: Project
    onClickAddTask: (project: Project) => void
    onClickUpdateProject: (project: Project) => void
    onClickDeleteProject: (project: Project) => void
}

export default function Row(props: Props) {
    const { project, onClickAddTask, onClickUpdateProject, onClickDeleteProject } = props;
    const [open, setOpen] = React.useState(false);
    const [tasks, setTasks] = React.useState<Task[]>([])

    const handleClickExpand = async () => {
        setOpen(!open)
        try {
            const url = `http://127.0.0.1:8000/api/projects/${project.project_id}/tasks`
            const response = await fetch(url);
            const data = await response.json();
            setTasks(data)
        } catch (error) {
            console.log(error);
        }
    }
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={handleClickExpand}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>
            {project.project_id}
          </TableCell>
          <TableCell>{project.name}</TableCell>
          <TableCell>{project.start_date}</TableCell>
          <TableCell>{project.created?.split("T")[0]}</TableCell>
          <TableCell>{project.updated?.split("T")[0]}</TableCell>
          <TableCell>
            <Box sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
            }}>
              <MdOutlineAddToPhotos style={{fontSize: "23px", color: "green", cursor: "pointer"}} 
                onClick={() => onClickAddTask(project)}
              />
              <FaRegEdit style={{fontSize: "21px", color: "blue", cursor: "pointer"}} 
                  onClick={() => onClickUpdateProject(project)}
              />
              <MdDeleteOutline style={{fontSize: "25px", color: "red", cursor: "pointer"}} 
                  onClick={() => onClickDeleteProject(project)}
              />
            </Box>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Task
                </Typography>
                <TaskTable 
                    tasks={tasks}
                    currentProject={project}
                    updateTasks={setTasks}
                />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }