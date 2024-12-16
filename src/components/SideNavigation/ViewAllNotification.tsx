import { Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemText, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { MuiButton } from '../../common/button/MuiButton';
import Avatar from '@mui/material/Avatar';
import { GiftOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { DeleteForeverOutlined, ErrorOutlineRounded, WarningAmberOutlined } from '@mui/icons-material';
import { useState } from 'react';

interface viewAllNotificationType extends DialogProps {
    isOpen:boolean,
    handleClose: any
}

type notificationType={
    primaryText:String,
    secondaryText:String
}




export default function ViewAllNotification(props: viewAllNotificationType){

    const {isOpen, handleClose} = props;
    const notificationList = [
        {
            primaryText: "You have a new message from John.",
            secondaryText: "2 min ago",
            notiType:"success",
            icon: <InfoCircleOutlined/>, // Use an emoji or an icon class (e.g., FontAwesome, Material UI)
          },
          {
            primaryText: "Your system will restart tonight for updates.",
            secondaryText: "15 min ago",
            notiType:"error",
            icon: <ErrorOutlineRounded/>,
          },
          {
            primaryText: "Your assigned task 'Design Wireframes' is marked complete.",
            secondaryText: "1 hr ago",
            notiType:"warning",
            icon: <WarningAmberOutlined/>,
          },
          {
            primaryText: "Don't forget your 3 PM meeting with the product team.",
            secondaryText: "2 hr ago",
            notiType:"success",
            icon: <InfoCircleOutlined/>,
          },
          {
            primaryText: "Anna commented on your post: 'Great job!'",
            secondaryText: "10 hr ago",
            notiType:"success",
            icon: <InfoCircleOutlined/>,
          },
    ];
    const [selectedTab, setSelectedTab] = useState('All');

    const handleTabSelection = (
        event: React.MouseEvent<HTMLElement>,
        newTab: string | null,
    ) => {
        if (newTab !== null) {
            setSelectedTab(newTab);
        }
    };
    return(<>
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                "& .MuiDialog-paper": {
                  width: "750px",
                  height: "700px", // You can set specific dimensions
                  maxWidth: "1200px", // Optional: Set max width
                  //maxHeight: "400px", // Optional: Set max height
                },
              }}
        >
            <DialogTitle id="alert-dialog-title">
                Notification
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <ToggleButtonGroup
                        value={selectedTab}
                        exclusive
                        onChange={handleTabSelection}
                        aria-label="text alignment"
                        sx={{
                            "& .MuiToggleButton-root": {
                                border: "none", // Remove border for all buttons
                                width: "120px", // Uniform width for all buttons
                                height:"40px",
                                borderRadius: "0", // No rounded corners
                                color: "black", // Default text color
                            },
                            "& .Mui-selected": {
                                borderBottom: "2px solid black", // Bottom border for the selected button
                                color: "black", // Optional: Change text color for selected
                                bgcolor:"white"
                            },
                        }}
                    >
                        <ToggleButton value="All" aria-label="All">
                            All
                        </ToggleButton>
                        <ToggleButton value="Information" aria-label="Information">
                            Information
                        </ToggleButton>
                        <ToggleButton value="Warning" aria-label="Warning">
                            Warning
                        </ToggleButton>
                        <ToggleButton value="Error" aria-label="Error">
                            Error
                        </ToggleButton>
                    </ToggleButtonGroup>
                    {
                        selectedTab == "All" &&
                        <List sx={{ width: '100%'}}>
                            {
                                notificationList.map((list, index)=>(
                                    <ListItem key={index}>
                                        <ListItemAvatar>
                                            <Avatar 
                                                sx={{ 
                                                    color: list.notiType=="success"?'success.main': list.notiType=="error"?'error.main' : 'warning.main', 
                                                    bgcolor: 'success.lighter' 
                                                }}>
                                                {list.icon}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText 
                                            sx={{color:"black"}}
                                            primary={list.primaryText} 
                                            secondary={list.secondaryText}
                                        />
                                        <IconButton>
                                            <DeleteForeverOutlined sx={{color:'error.main'}}/> {/**add handle click event */}
                                        </IconButton>
                                    </ListItem>
                                ))
                            }
                        </List>
                    }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <MuiButton className="muiButtonCss" onClick={handleClose} >
                    Cancel
                </MuiButton>
            </DialogActions>
        </Dialog>
    </>)
}