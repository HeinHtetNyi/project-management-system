import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Project, Task } from '../Home';
import React, { ChangeEvent } from 'react';
import DeleteTaskDialog from './DeleteTaskDialog';
import UpdateTaskDialog from './UpdateTaskDialog';
import { Box } from '@mui/material';

type Props = {
    tasks: Task[]
    currentProject: Project
    updateTasks: (tasks: Task[]) => void
}

const TaskTable = (props: Props) => {
    const {tasks, currentProject, updateTasks} = props
    const [showTaskDeleteDialog, setShowTaskDeleteDialog] = React.useState(false)
    const [showTaskUpdateDialog, setShowTaskUpdateDialog] = React.useState(false)
    const [currentTask, setCurrentTask] = React.useState({} as Task)

    const handleShowTaskDeleteDialog = () => {
        setShowTaskDeleteDialog(!showTaskDeleteDialog)
    }

    const handleShowTaskUpdateDialog = () => {
        setShowTaskUpdateDialog(!showTaskUpdateDialog)
    }

    const handleClickDeleteIcon = (task: Task) => {
        setCurrentTask(task)
        setShowTaskDeleteDialog(!showTaskDeleteDialog)
    }

    const handleClickUpdateIcon = (task: Task) => {
        setCurrentTask(task)
        setShowTaskUpdateDialog(!showTaskUpdateDialog)
    }

    const handleChangeCurrentTask = (event: ChangeEvent<any>) => {
        const {name, value} = event.target
        setCurrentTask(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const deleteTask = async () => {
        try {
            const url = `http://127.0.0.1:8000/api/projects/${currentProject.project_id}/tasks/${currentTask.task_id}`
            const response = await fetch(url, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (response.status === 204) {
                const updatedTasks = tasks.filter(task => task.task_id != currentTask.task_id)
                updateTasks(updatedTasks)
            }
            setShowTaskDeleteDialog(false)
        } catch (error) {
            console.log(error);
        }
    }

    const updateTask = async () => {
        try {
            const url = `http://127.0.0.1:8000/api/projects/${currentProject.project_id}/tasks/${currentTask.task_id}/`
            const response = await fetch(url, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(currentTask)
            });
            if (response.status === 200) {
                const data = await response.json()
                const updatedTasks = tasks.map(task => {
                    if (task.task_id === currentTask.task_id) {
                        return data
                    } 
                    return task
                })
                updateTasks(updatedTasks)
            }
            setShowTaskUpdateDialog(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (  
        <>
            <Table size="small">
                <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Est Size</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Updated At</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {tasks.map((task) => (
                    <TableRow key={task.task_id}>
                        <TableCell>
                            {task.task_id}
                        </TableCell>
                        <TableCell>{task.name}</TableCell>
                        <TableCell>{task.est_size}</TableCell>
                        <TableCell>
                            {task.created?.split("T")[0]}
                        </TableCell>
                        <TableCell>
                            {task.updated?.split("T")[0]}
                        </TableCell>
                        <TableCell>
                            <Box sx={{
                                display: "flex",
                                gap: 1,
                                alignItems: "center"
                            }}>
                                <FaRegEdit style={{fontSize: "18px", color: "blue", cursor: "pointer"}} 
                                    onClick={() => handleClickUpdateIcon(task)}
                                />
                                <MdDeleteOutline style={{fontSize: "20px", color: "red", cursor: "pointer"}} 
                                    onClick={() => handleClickDeleteIcon(task)}
                                />
                            </Box>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            <DeleteTaskDialog 
                show={showTaskDeleteDialog}
                toggleShow={handleShowTaskDeleteDialog}
                onDeleteTask={deleteTask}
            />
            <UpdateTaskDialog 
                show={showTaskUpdateDialog}
                updatedTask={currentTask}
                toggleShow={handleShowTaskUpdateDialog}
                onChangeUpdatedTask={handleChangeCurrentTask}
                onUpdateTask={updateTask}
            />
        </>
    );
}
 
export default TaskTable;