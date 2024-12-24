import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import React from "react"
import "../../global.css";

export default function RouteErrorPage(){ 
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
                         <div>
                  <h2 id="ErrorTitle">Oops !!!</h2>
                  <div id="ErrorBox">
                    <div id="ErrorboxInner">
                      <h4>Following error(s) occurred in the application</h4>
                      <div className="ErrorPageTable">
                        <div className="ErrorPageTableRow">
                          <div className="ErrorPageTableCell_Header">Error</div>
                          <div className="ErrorPageTableCell">Oops! The page you are looking for does not exist. </div>
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