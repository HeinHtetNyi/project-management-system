import CloseIcon from '@mui/icons-material/Close';
import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { Task } from '../Home';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

type Props = {
    show: boolean,
    newTask: Task,
    toggleShow: () => void,
    onCreateTask: () => void,
    onChangeNewTask: (event: React.ChangeEvent<any>) => void,
}

const AddTaskDialog = (props: Props) => {
    const {show, newTask, toggleShow, onCreateTask, onChangeNewTask} = props
    return (  
        <React.Fragment>
            <BootstrapDialog
                onClose={toggleShow}
                aria-labelledby="customized-dialog-title"
                open={show}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Create a task
                </DialogTitle>
                <IconButton
                aria-label="close"
                onClick={toggleShow}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
                >
                <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}>
                        <TextField id="outlined-basic" label="Name" variant="outlined" 
                            name="name"
                            value={newTask.name}
                            onChange={onChangeNewTask}
                        />
                        <TextField id="outlined-basic" label="Est Size" variant="outlined" 
                            name="est_size"
                            value={newTask.est_size}
                            onChange={onChangeNewTask}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={onCreateTask} color='success'>
                        Create
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
 
export default AddTaskDialog;