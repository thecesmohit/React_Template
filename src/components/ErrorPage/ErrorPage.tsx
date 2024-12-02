import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react"
import { MuiButton } from "../../common/button/MuiButton";
import "../../global.css";
import CustomeMuiDialog from "../../common/dialog/CustomeMuiDialog";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { updateOpenState } from "../../store/ErrorPageSlice";

export default function ErrorPage(){
    const open = useAppSelector((state)=>state.errorPage.open);
    const dispatch = useAppDispatch();

    const handleClickOpen = () => {
        dispatch(updateOpenState(true));
    };

    const handleClose = () => {
        dispatch(updateOpenState(false));
    };
    return(
        <React.Fragment>
            {/* <CustomeMuiDialog muiDialogWidth="900px" muiDialogHeight="200px"  title="UnCaught Runtime      Error" isOpen={open} handleClose={handleClose} open
            >
                Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
            </CustomeMuiDialog> */}
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{color:"red"}}>
                {"UnCaught Runtime Error"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MuiButton className="muiButtonCss" onClick={handleClose} >
                        Cancel
                    </MuiButton>
                </DialogActions>
            </Dialog> 
        </React.Fragment>
    );
}