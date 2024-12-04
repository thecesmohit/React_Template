import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
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
            <CustomeMuiDialog muiDialogWidth="900px" muiDialogHeight="100px"  title="UnCaught Runtime Error"  isOpen={true} handleClose={()=>{}} open>
                <Container style={{ textAlign: 'center'}}>
                    <Typography variant="h3" color="error" gutterBottom>
                        404
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Oops! The page you are looking for does not exist.
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        It might have been removed or the URL might be incorrect.
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleNavigate} >
                        Go to Homepage
                    </Button>
                </Container>
            </CustomeMuiDialog>
            {/* <Dialog
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
            </Dialog>  */}
        </React.Fragment>
    );
}