import CloseIcon from '@mui/icons-material/Close';
import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { ChangeEvent } from 'react';
import { Project } from '../Home';

type Props = {
    show: boolean,
    updatedProject: Project,
    toggleShow: () => void,
    onUpdateProject: () => void,
    onChangeUpdatedProject: (event: ChangeEvent<any>) => void,
}

const UpdateProjectDialog = (props: Props) => {
    const {show, updatedProject, toggleShow, onUpdateProject, onChangeUpdatedProject} = props
    return (  
        <Dialog
            onClose={toggleShow}
            aria-labelledby="customized-dialog-title"
            open={show}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Update a project
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
                        value={updatedProject.name}
                        onChange={onChangeUpdatedProject}
                    />
                    <TextField id="outlined-basic" label="Start Date" variant="outlined" 
                        name="start_date"
                        value={updatedProject.start_date}
                        onChange={onChangeUpdatedProject}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onUpdateProject} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}
 
export default UpdateProjectDialog;