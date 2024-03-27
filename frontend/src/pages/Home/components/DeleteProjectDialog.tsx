import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';

type Props = {
    show: boolean,
    toggleShow: () => void,
    onDeleteProject: () => void,
}

const DeleteProjectDialog = (props: Props) => {
    const {show, toggleShow, onDeleteProject} = props
    return (  
        <Dialog
            onClose={toggleShow}
            aria-labelledby="customized-dialog-title"
            open={show}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Delete a project
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
                <Typography>Are you sure you want to delete this project?</Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onDeleteProject} color="error">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
 
export default DeleteProjectDialog;