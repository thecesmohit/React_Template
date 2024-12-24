import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import React from "react"
import { MuiButton } from "../../common/button/MuiButton";
import "../../global.css";
import { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import './ErrorPage.css';


export default function ErrorPage({error, resetErrorBoundary} : FallbackProps){ 

    const navigate = useNavigate(); // Initialize navigate

    const handleNavigate = () => {
        navigate('/'); // Navigate to the home page
        resetErrorBoundary(); // Optionally reset the error boundary state
    };

    return(
        <React.Fragment>
            {/* <Dialog
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
            </Dialog>  */}
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
             <div>
      <h2 id="ErrorTitle">Oops !!!</h2>
      <div id="ErrorBox">
        <div id="ErrorboxInner">
          <h4>Following error(s) occurred in the application</h4>
          <div className="ErrorPageTable">
            <div className="ErrorPageTableRow">
              <div className="ErrorPageTableCell_Header">Error</div>
              <div className="ErrorPageTableCell">{error.message}</div>
            </div>
                       <div className="ErrorPageTableRow">
              <div className="ErrorPageTableCell_Header">Possible Solution&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <div className="ErrorPageTableCell">Please check the URL or reach out to the application Support.</div>
              
            </div>
          </div>
        </div>
      </div>
         </div>
    </Dialog> 
        </React.Fragment>
    );
}