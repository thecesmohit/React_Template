import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Fab, Fade, Grow, Slide } from '@mui/material';

type MuiSnackbarProps={
  open:boolean;
  message: String;
  bgColor: "success" | "info" | "warning" | "error";
  handleClose:()=>void;
}

export default function CustomizedSnackbar(props: MuiSnackbarProps) {
  const {open, message, bgColor, handleClose} = props;

  return (
    <div>
        <Snackbar 
          open={open} 
          autoHideDuration={6000} 
          onClose={handleClose}
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        >
          <Alert
            onClose={handleClose}
            severity={bgColor}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
    </div>
  );
}