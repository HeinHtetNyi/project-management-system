import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Row from './Row';
import { Project, Task } from '../Home';
import { ChangeEvent, useEffect, useState } from 'react';
import AddTaskDialog from './AddTaskDialog';
import UpdateProjectDialog from './UppdateProjectDialog';
import DeleteProjectDialog from './DeleteProjectDialog';
import AddProjectDialog from './AddProjectDialog';
import { Button } from '@mui/material';


export default function ProjectTable() {

    const [projects, setProjects] = useState<Project[]>([])
    const [currentProject, setCurrentProject] = useState<Project>({} as Project);
    const [showTaskAddDialog, setShowTaskAddDialog] = useState(false)
    const [showProjectAddDialog, setShowProjectAddDialog] = useState(false)
    const [showProjectDeleteDialog, setShowProjectDeleteDialog] = useState(false)
    const [showProjectUpdateDialog, setShowProjectUpdateDialog] = useState(false)
    const [newTask, setNewTask] = useState<Task>({name: "", est_size: 0} as Task)
    const [newProject, setNewProject] = useState<Project>({name: "", start_date: ""} as Project)

    useEffect(() => {
        getProjects()
    }, [])

    const handleShowProjectDeleteDialog = () => {
      setShowProjectDeleteDialog(!showProjectDeleteDialog)
    }

    const handleShowProjectUpdateDialog = () => {
      setShowProjectUpdateDialog(!showProjectUpdateDialog)
    }

    const handleShowTaskAddDialog = () => {
      setShowTaskAddDialog(!showTaskAddDialog)
    }

    const handleShowProjectAddDialog = () => {
      setShowProjectAddDialog(!showProjectAddDialog)
    }

    const handleClickAddTaskIcon = (project: Project) => {
      setCurrentProject(project)
      setShowTaskAddDialog(!showTaskAddDialog)
    }

    const handleClickUpdateProjectIcon = (project: Project) => {
      setCurrentProject(project)
      setShowProjectUpdateDialog(!showProjectUpdateDialog)
    }

    const handleClickDeleteProjectIcon = (project: Project) => {
      setCurrentProject(project)
      setShowProjectDeleteDialog(!showProjectUpdateDialog)
    }

    const handleChangeNewTask = (event: ChangeEvent<any>) => {
      const {name, value} = event.target
      setNewTask(prev => ({
        ...prev,
        [name]: value
      }))
    }

    const handleChangeNewProject = (event: ChangeEvent<any>) => {
      const {name, value} = event.target
      setNewProject(prev => ({
        ...prev,
        [name]: value
      }))
    }

    const handleChangeCurrentProject = (event: ChangeEvent<any>) => {
      const {name, value} = event.target
      setCurrentProject(prev => ({
          ...prev,
          [name]: value
      }))
  }

    const getProjects = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/projects");
            const data = await response.json();
            setProjects(data)
        } catch (error) {
            console.log(error);
        }
    }

    const createTask = async () => {
      try {
        const url = `http://127.0.0.1:8000/api/projects/${currentProject.project_id}/tasks/`
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });
        setShowTaskAddDialog(false)
      } catch (error) {
          console.log(error);
      }
    }

    const createProject = async () => {
      try {
        const url = `http://127.0.0.1:8000/api/projects/`
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProject),
        });
        if (response.status === 201) {
          const data = await response.json()
          setProjects(prev => ([
            ...prev,
            data
          ]))
        }
        setShowProjectAddDialog(false)
      } catch (error) {
          console.log(error);
      }
    }

    const updateProject = async () => {
      try {
          const url = `http://127.0.0.1:8000/api/projects/${currentProject.project_id}/`
          const response = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(currentProject)
          });
          if (response.status === 200) {
              const data = await response.json()
              const updatedPorjects = projects.map(project => {
                  if (project.project_id === currentProject.project_id) {
                      return data
                  } 
                  return project
              })
              setProjects(updatedPorjects)
          }
          setShowProjectUpdateDialog(false)
      } catch (error) {
          console.log(error);
      }
  }

  const deleteProject = async () => {
    try {
        const url = `http://127.0.0.1:8000/api/projects/${currentProject.project_id}/`
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 204) {
            const updatedProjects = projects.filter(project => project.project_id != currentProject.project_id)
            setProjects(updatedProjects)
        }
        setShowProjectDeleteDialog(false)
    } catch (error) {
        console.log(error);
    }
}

    return (
      <>
        <Button variant="contained" color="success"
          onClick={handleShowProjectAddDialog}
        >
          Add Project
        </Button>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>Add task</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <Row key={project.project_id} 
                  project={project} 
                  onClickAddTask={handleClickAddTaskIcon}
                  onClickUpdateProject={handleClickUpdateProjectIcon}
                  onClickDeleteProject={handleClickDeleteProjectIcon}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <AddTaskDialog 
          show={showTaskAddDialog}
          newTask={newTask}
          toggleShow={handleShowTaskAddDialog}
          onCreateTask={createTask}
          onChangeNewTask={handleChangeNewTask}
        />
        <AddProjectDialog 
          show={showProjectAddDialog}
          newProject={newProject}
          toggleShow={handleShowProjectAddDialog}
          onCreateProject={createProject}
          onChangeNewProject={handleChangeNewProject}
        />
        <UpdateProjectDialog 
          show={showProjectUpdateDialog}
          updatedProject={currentProject}
          toggleShow={handleShowProjectUpdateDialog}
          onUpdateProject={updateProject}
          onChangeUpdatedProject={handleChangeCurrentProject}
        />
        <DeleteProjectDialog 
          show={showProjectDeleteDialog}
          toggleShow={handleShowProjectDeleteDialog}
          onDeleteProject={deleteProject}
        />
      </>
    );
  }