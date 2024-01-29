import { Dialog, Box, Typography, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning';

interface DialogProps {
    open: boolean,
    content: any,
    handleClose: () => void,
    handleDelete: () => void
}


const DialogComponent = ({ open, content, handleClose, handleDelete}: DialogProps) => {
  return (
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
>
    <Box p={2}>
        <Box id="alert-dialog-title">
            <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                <WarningIcon sx={{color:'#FD6162', fontSize:'42px'}}/>
                <Typography fontSize={'28px'} fontWeight={600} >Delete?</Typography>
            </Box>
        </Box>
        <DialogContent sx={{p:3}}>
        <Box color={'gray'} id="alert-dialog-description">
            Are you sure you want to delete this record?
        <br/>
        <Typography fontWeight={'bold'}>{content}</Typography>
        </Box>
        </DialogContent>
        <DialogActions sx={{justifyContent:'center', p:0}}>
            <Box display='flex' justifyContent='center' gap={2}>
                <Button variant='contained' sx={{bgcolor:'#FD6162', color:'#fff'}} onClick={handleDelete}> Delete </Button>
                <Button  variant='outlined' onClick={handleClose} autoFocus> Cancel </Button>
            </Box>
        </DialogActions>
    </Box>
</Dialog>
  )
}

export default DialogComponent
