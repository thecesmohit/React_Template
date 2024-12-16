import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import React from "react"
import { MuiButton } from "../../common/button/MuiButton";
import "../../global.css";
import CustomeMuiDialog from "../../common/dialog/CustomeMuiDialog";
import { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router";

export default function ErrorPage({error, resetErrorBoundary} : FallbackProps){ 

    const navigate = useNavigate(); // Initialize navigate

    const handleNavigate = () => {
        navigate('/'); // Navigate to the home page
        resetErrorBoundary(); // Optionally reset the error boundary state
    };

    return(
        <React.Fragment>
            <Dialog
                fullScreen
                open={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                // sx={{
                //     "& .MuiDialog-paper": {
                //         width: '90%',
                //         height: '90%', // You can set specific dimensions
                //         maxWidth: "100%", // Optional: Set max width
                //         //maxHeight: "400px", // Optional: Set max height
                //     },
                // }}
            >
                <DialogTitle id="alert-dialog-title" sx={{color:"red"}}>
                {"UnCaught Runtime Error"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {error.message}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        {error.Stack}
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