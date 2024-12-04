import {  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, DialogProps, Button} from "@mui/material";
import React from "react"
import { MuiButton } from "../../common/button/MuiButton";
import "../../global.css";
import CustomeMuiDialog from "../../common/dialog/CustomeMuiDialog";
import { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router";

interface MuidialogProps extends DialogProps{
    open:boolean
    handleYesBtnClick:()=>void
    handleNoBtnClick:()=>void
}

export default function CustomeYNDialog(props: MuidialogProps){ 

    const {open, children, handleYesBtnClick, handleNoBtnClick} = props;

    return(
        <React.Fragment>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialog-paper": {
                      width: '500px',
                      height: '180px', // You can set specific dimensions
                      //maxWidth: "500px", // Optional: Set max width
                      //maxHeight: "400px", // Optional: Set max height
                    },
                  }}
            >
                <DialogTitle id="alert-dialog-title" sx={{fontWeight:'500'}}>
                {"Delete Alert"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {children}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleYesBtnClick} color="success" size="small">
                        Yes
                    </Button>
                    <Button variant='contained' onClick={handleNoBtnClick} color="error" size="small">
                        No
                    </Button>
                </DialogActions>
            </Dialog> 
        </React.Fragment>
    );
}