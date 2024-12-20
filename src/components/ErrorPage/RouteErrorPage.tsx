import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import React from "react"
import { MuiButton } from "../../common/button/MuiButton";
import "../../global.css";
import CustomeMuiDialog from "../../common/dialog/CustomeMuiDialog";
import { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router";
import { useRouteError, isRouteErrorResponse} from "react-router-dom";

export default function RouteErrorPage(){ 

    const navigate = useNavigate(); // Initialize navigate
    const routeError: any = useRouteError();

    const handleNavigate = () => {
        navigate('/'); // Navigate to the home page
    };

    return(
        <React.Fragment>
            <CustomeMuiDialog muiDialogWidth="900px" muiDialogHeight="100px"  title="UnCaught Runtime Error"  isOpen={true} handleClose={()=>{}} open>
                <Container style={{ textAlign: 'center'}}>
                    <Typography variant="h3" color="error" gutterBottom>
                        {routeError.status}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {/* Oops! The page you are looking for does not exist. */}
                        {routeError.message}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {/* It might have been removed or the URL might be incorrect. */}
                        {routeError.text}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleNavigate} >
                        Go to Homepage
                    </Button>
                </Container>
            </CustomeMuiDialog>
        </React.Fragment>
    );
}