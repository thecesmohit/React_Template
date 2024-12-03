import {  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react"
import { MuiButton } from "../../common/button/MuiButton";
import "../../global.css";
import CustomeMuiDialog from "../../common/dialog/CustomeMuiDialog";
import { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router";

export default function ErrorPage({ error, resetErrorBoundary }: FallbackProps){ 

    const navigate = useNavigate(); // Initialize navigate

    const handleNavigate = () => {
        navigate('/'); // Navigate to the home page
        resetErrorBoundary(); // Optionally reset the error boundary state
    };

    return(
        <React.Fragment>
            {/* <CustomeMuiDialog muiDialogWidth="900px" muiDialogHeight="200px"  title="UnCaught Runtime      Error" isOpen={open} handleClose={handleClose} open
            >
                Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
            </CustomeMuiDialog> */}
            <Dialog
                fullScreen
                open={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{color:"red"}}>
                {"UnCaught Runtime Error"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {error.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MuiButton className="muiButtonCss" onClick={handleNavigate} >
                        Go to home!
                    </MuiButton>
                </DialogActions>
            </Dialog> 
        </React.Fragment>
    );
}