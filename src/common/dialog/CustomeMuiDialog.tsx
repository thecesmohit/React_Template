import React, { Children } from "react"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle } from "@mui/material";
import { MuiButton } from "../button/MuiButton";

interface MuidialogProps extends DialogProps{
    title:string;
    isOpen: boolean;
    handleClose: any;
    muiDialogWidth: string;
    muiDialogHeight: string;
}

export default function CustomeMuiDialog(props: MuidialogProps){
    const {title, isOpen, handleClose, muiDialogHeight, muiDialogWidth, children} = props;
    return(
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                "& .MuiDialog-paper": {
                  width: {muiDialogWidth},
                  height: {muiDialogHeight}, // You can set specific dimensions
                  //maxWidth: "500px", // Optional: Set max width
                  //maxHeight: "400px", // Optional: Set max height
                },
              }}
        >
            <DialogTitle id="alert-dialog-title" sx={{color:"red"}}>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <MuiButton className="muiButtonCss" onClick={handleClose} >
                    Cancel
                </MuiButton>
            </DialogActions>
        </Dialog>
    );
}