import CloseIcon from '@mui/icons-material/Close';
import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { ChangeEvent } from 'react';
import { Task } from '../Home';

type Props = {
    show: boolean,
    updatedTask: Task,
    toggleShow: () => void,
    onUpdateTask: () => void,
    onChangeUpdatedTask: (event: ChangeEvent<any>) => void,
}

const UpdateTaskDialog = (props: Props) => {
    const {show, updatedTask, toggleShow, onUpdateTask, onChangeUpdatedTask} = props
    return (  
        <Dialog
            onClose={toggleShow}
            aria-labelledby="customized-dialog-title"
            open={show}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Update a task
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
                        value={updatedTask.name}
                        onChange={onChangeUpdatedTask}
                    />
                    <TextField id="outlined-basic" label="Est Size" variant="outlined" 
                        name="est_size"
                        value={updatedTask.est_size}
                        onChange={onChangeUpdatedTask}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onUpdateTask} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}
 
export default UpdateTaskDialog;