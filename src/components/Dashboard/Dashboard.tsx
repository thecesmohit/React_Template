import React, { useState, useEffect } from 'react';
import CommonGrid from '../CommonGrid/CommonGrid';
import { ColDef } from 'ag-grid-community';
import { Grid, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Snackbar, FormControl, FormLabel, Typography, Divider, Stack, Box } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../store/slices/addUserSlice';
import { AppDispatch, RootState } from '../../store/store';
import { getUsers } from '../../store/slices/getUserSlice';
import { deleteUser } from '../../store/slices/deleteUserSlice';
import { updateUser } from '../../store/slices/updateUserSlice';
import CustomeYNDialog from '../../common/dialog/CustomeYNDialog';
import { useMsal } from '@azure/msal-react';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { instance } = useMsal();
  const { users, loading, error } = useSelector((state: RootState) => state.getUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<any | null>(null);
  const formValuesType = {
    name: {
      type:"text",
      isRequried: true
    },
    email: {
      type:"text",
      isRequried: true
    },
    phone: {
      type:"number",
      isRequried: true
    },
    address: {
      type:"text",
      isRequried: true
    },
    city: {
      type:"text",
      isRequried: true
    },
    state: {
      type:"text",
      isRequried: true
    },
    country: {
      type:"text",
      isRequried: true
    },
    zip: {
      type:"number",
      isRequried: true
    },
    company: {
      type:"text",
      isRequried: false
    },
    department: {
      type:"text",
      isRequried: false
    },
    title: {
      type:"text",
      isRequried: false
    },
  };
  const [formValueErrors, setFormValueError] = useState({
    name: {
      isError: false,
      errorMsg: ''
    },
    email: {
      isError: false,
      errorMsg: ''
    },
    phone: {
      isError: false,
      errorMsg: ''
    },
    address: {
      isError: false,
      errorMsg: ''
    },
    city: {
      isError: false,
      errorMsg: ''
    },
    state: {
      isError: false,
      errorMsg: ''
    },
    country: {
      isError: false,
      errorMsg: ''
    },
    zip: {
      isError: false,
      errorMsg: ''
    },
    company: {
      isError: false,
      errorMsg: ''
    },
    department: {
      isError: false,
      errorMsg: ''
    },
    title: {
      isError: false,
      errorMsg: ''
    },
  });
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    company: '',
    department: '',
    title: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  //Delete Dialog
  const [isConfirmationBoxOpen, setIsConfirmationBoxOpen] = React.useState<boolean>(false);
  const [confirmationBoxMsg, setConfirmationBoxMsg] = React.useState<String | null>(null);
  const [rowIdToDelete, setRowIdToDelete] = React.useState(0);
  const dummyData = [{
    name: 'Mohit',
    email: 'mohit@gmail.com',
    phone: '9787656545',
    address: 'pulgaon',
    city: 'pulgaon',
    state: 'maharastra',
    country: 'india',
    zip: '442302',
    company: 'etrm',
    department: 'developer',
    title: 'SE1',
  }]

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

   const columnDefs: ColDef[] = [
    { headerName: 'ID', field: 'id', checkboxSelection: true },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Phone', field: 'phone' },
    { headerName: 'Address', field: 'address' },
    { headerName: 'City', field: 'city' },
    { headerName: 'State', field: 'state' },
    { headerName: 'Country', field: 'country' },
    { headerName: 'ZIP', field: 'zip' },
    { headerName: 'Company', field: 'company' },
    { headerName: 'Department', field: 'department' },
    { headerName: 'Title', field: 'title' },
  ];

  const handleAdd = () => {
    setCurrentRow(null);
    setFormValues({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zip: '',
      company: '',
      department: '',
      title: '',
    });
    setFormValueError({
      name: {
        isError: false,
        errorMsg: ''
      },
      email: {
        isError: false,
        errorMsg: ''
      },
      phone: {
        isError: false,
        errorMsg: ''
      },
      address: {
        isError: false,
        errorMsg: ''
      },
      city: {
        isError: false,
        errorMsg: ''
      },
      state: {
        isError: false,
        errorMsg: ''
      },
      country: {
        isError: false,
        errorMsg: ''
      },
      zip: {
        isError: false,
        errorMsg: ''
      },
      company: {
        isError: false,
        errorMsg: ''
      },
      department: {
        isError: false,
        errorMsg: ''
      },
      title: {
        isError: false,
        errorMsg: ''
      },
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (selectedRow: any) => {
  
      setCurrentRow(selectedRow);
      setFormValues({
        name: selectedRow.name,
        email: selectedRow.email,
        phone: selectedRow.phone,
        address: selectedRow.address,
        city: selectedRow.city,
        state: selectedRow.state,
        country: selectedRow.country,
        zip: selectedRow.zip,
        company: selectedRow.company,
        department: selectedRow.department,
        title: selectedRow.title,
      });
      setFormValueError({
        name: {
          isError: false,
          errorMsg: ''
        },
        email: {
          isError: false,
          errorMsg: ''
        },
        phone: {
          isError: false,
          errorMsg: ''
        },
        address: {
          isError: false,
          errorMsg: ''
        },
        city: {
          isError: false,
          errorMsg: ''
        },
        state: {
          isError: false,
          errorMsg: ''
        },
        country: {
          isError: false,
          errorMsg: ''
        },
        zip: {
          isError: false,
          errorMsg: ''
        },
        company: {
          isError: false,
          errorMsg: ''
        },
        department: {
          isError: false,
          errorMsg: ''
        },
        title: {
          isError: false,
          errorMsg: ''
        },
      });
      setIsDialogOpen(true);
    
  };

  const handleDelete = async (selectedRow: any) => {
    setConfirmationBoxMsg('Are you sure you want to delete this item?');
    setIsConfirmationBoxOpen(true);
    setRowIdToDelete(selectedRow.id);
  };

  const handleYesBtnClick = async() => {
    try {
      await dispatch(deleteUser(rowIdToDelete)).unwrap();
      dispatch(getUsers());
      handleSnackbar('Item deleted successfully');
    } catch (error: any) {
      const errorMessage = error?.response?.data?.title || 'Failed to delete item';
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
    }
  }
  const handleNoBtnClick = () => {
    setIsConfirmationBoxOpen(false);
    setConfirmationBoxMsg(null);
  }
  const handleSave = async () => {
    var newFormValueErrors = formValueErrors;
    //Validation Part
    if(!formValues.name){
      newFormValueErrors = {...newFormValueErrors, name:{isError:true, errorMsg:'required'}};
    }
    if (!formValues.email || !/\S+@\S+\.\S+/.test(formValues.email)) {
      newFormValueErrors = {...newFormValueErrors, email:{isError:true, errorMsg:'please enter a valid email address.'}};
    }
    if(!formValues.phone || !/((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/.test(formValues.phone)){
      newFormValueErrors = {...newFormValueErrors, phone:{isError:true, errorMsg:'please enter a valid phone number.'}};
    }
    if(!formValues.address){
      newFormValueErrors = {...newFormValueErrors, address:{isError:true, errorMsg:'required'}};
    }
    if(!formValues.city){
      newFormValueErrors = {...newFormValueErrors, city:{isError:true, errorMsg:'required'}};
    }
    if(!formValues.state){
      newFormValueErrors = {...newFormValueErrors, state:{isError:true, errorMsg:'required'}};
    }
    if(!formValues.country){
      newFormValueErrors = {...newFormValueErrors, country:{isError:true, errorMsg:'required'}};
    }
    if(!formValues.zip || !/^\d{3}\s?\d{3}$/.test(formValues.zip)){
      newFormValueErrors = ({...newFormValueErrors, zip:{isError:true, errorMsg:'please enter a valid zip, must contain 6 numbers.'}});
    }
    if(newFormValueErrors !== formValueErrors)
    {
      console.log("Not match");
      setFormValueError(newFormValueErrors);
      return;
    }

    if (currentRow) {
      // Update existing row
      try {
        await dispatch(updateUser({ ...currentRow, ...formValues })).unwrap();
        setSnackbarMessage('Item updated successfully');
        dispatch(getUsers());
        setSnackbarOpen(true);
      } catch (error: any) {
        const errorMessage = error?.response?.data?.title || 'Failed to update item';
        setSnackbarMessage(errorMessage);
        setSnackbarOpen(true);
      }
  
      
    } else {
      // Add new row
      try {
        await dispatch(addUser(formValues)).unwrap();
        setSnackbarMessage('Item added successfully');
        dispatch(getUsers());
        setSnackbarOpen(true);
      } catch (error) {
        setSnackbarMessage('Failed to add item');
        setSnackbarOpen(true);
      }
    }
    setIsDialogOpen(false);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const handleSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <CommonGrid
        columnDefs={columnDefs}
        rowData={users}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        enableAdd={true}
        enableEdit={true}
        enableDelete={true}
        enableExport={true}
      />

      <Dialog 
        open={isDialogOpen} 
        onClose={handleDialogClose} 
        //fullWidth 
        //maxWidth="md"
        sx={{
          "& .MuiDialog-paper": {
            width: '1000px',
            height: '570px', // You can set specific dimensions
            maxWidth: "1100px", // Optional: Set max width
            //maxHeight: "400px", // Optional: Set max height
          },
        }}
      >
        <DialogTitle sx={{fontSize:"1.5rem", fontWeight:'550'}}>{currentRow ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
        <Grid container rowSpacing={1}>
          {Object.keys(formValues).map((key) => (
            <>
              <Grid item sm={11} md={5.5} key={key}>
                <Stack
                  spacing={1}
                >
                  <Box 
                    sx={{ 
                      display: "flex", 
                      justifyContent: "space-between", // Space elements apart
                      alignItems: "center", // Align items vertically
                    }}
                  >
                    <Typography variant='body1'>
                      {
                        formValuesType[key as keyof typeof formValuesType].isRequried ?
                        key.charAt(0).toUpperCase() + key.slice(1)+" * " :
                        key.charAt(0).toUpperCase() + key.slice(1)
                      }
                    </Typography>
                    {
                      formValueErrors[key as keyof typeof formValueErrors].isError
                      &&
                      <Typography variant='body1' color='error' sx={{ textAlign: "right", flex: 1, fontSize:'0.70rem'}}>
                        {formValueErrors[key as keyof typeof formValueErrors].errorMsg}
                      </Typography>
                    }
                  </Box>
                  <TextField
                      size='small'
                      autoFocus={key === 'name'}
                      margin="dense"
                      id={key}
                      name={key}
                      type={formValuesType[key as keyof typeof formValuesType].type}
                      fullWidth
                      placeholder={'Enter '+key.charAt(0).toUpperCase() + key.slice(1)}
                      value={formValues[key as keyof typeof formValues]}
                      onChange={handleInputChange}
                      error={formValueErrors[key as keyof typeof formValueErrors].isError}
                      InputProps={{
                        sx: {
                          height: "30px", // Adjust height for the input box
                          padding: "0",   // Adjust padding for a more compact look
                        },
                      }}
                      FormHelperTextProps={{
                        sx: {
                          marginTop: "1px", // Adjust spacing for helper text
                          fontSize: "0.8rem", // Optional: reduce the font size of helper text
                          marginLeft:"0px",
                          marginRight:"0px"
                        },
                      }}
                      sx={{
                        ".MuiInputBase-root": {
                          fontSize: "0.9rem", // Optional: adjust the font size
                        },
                        margin:"0px !important"
                      }}
                    />
                </Stack>
              </Grid>
              <Grid item sm={1} md={0.5} key={key+"space"}/>
            </>
          ))}
        </Grid>

        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleDialogClose} color="error">Cancel</Button>
          <Button variant='contained' onClick={handleSave} color="success">Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <CustomeYNDialog open={isConfirmationBoxOpen} handleYesBtnClick={handleYesBtnClick} handleNoBtnClick={handleNoBtnClick}
      >
        {confirmationBoxMsg}
      </CustomeYNDialog>
    </div>
  );
};

export default Dashboard;
