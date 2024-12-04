import React, { useState, useEffect } from 'react';
import CommonGrid from '../CommonGrid/CommonGrid';
import { ColDef } from 'ag-grid-community';
import { Grid, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Snackbar, FormControl, FormLabel, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import CustomeYNDialog from '../../common/dialog/CustomeYNDialog';

const Dashboard: React.FC = () => {
  const [rowData, setRowData] = useState<any[]>([
    {
      name: 'Mohit',
      email: 'mohit@gmail.com',
      phone: '9561227225',
      address: 'Shivaji colony',
      city: 'Pulgaon',
      state: 'Maharashtra',
      country: 'India',
      zip: '442302',
      company: 'EtrmServices',
      department: 'Developer',
      title: 'SE1'
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<any | null>(null);
  const formValuesType = {
    name: "text",
    email: "text",
    phone: "number",
    address: "text",
    city: "text",
    state: "text",
    country: "text",
    zip: "number",
    company: "text",
    department: "text",
    title: "text",
  };
  const [formValueErrors, setFormValueError] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
    city: false,
    state: false,
    country: false,
    zip: false,
    company: false,
    department: false,
    title: false,
  });
  const [formValuesErrorMsg, setFormValuesErrorMsg] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip: "",
    company: '',
    department: '',
    title: '',
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
  const [rowIdToDelete, setRowIdToDelete] = React.useState();

  useEffect(() => {
    //fetchRowData();
  }, []);

  const fetchRowData = async () => {
    try {
      const response = await axios.get('https://localhost:7050/api/users');
      setRowData(response.data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

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
      name: false,
      email: false,
      phone: false,
      address: false,
      city: false,
      state: false,
      country: false,
      zip: false,
      company: false,
      department: false,
      title: false,
    });
    setFormValuesErrorMsg({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zip: "",
      company: '',
      department: '',
      title: '',
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
        name: false,
        email: false,
        phone: false,
        address: false,
        city: false,
        state: false,
        country: false,
        zip: false,
        company: false,
        department: false,
        title: false,
      });
      setFormValuesErrorMsg({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zip: "",
        company: '',
        department: '',
        title: '',
      });
      setIsDialogOpen(true);
    
  };

  const handleDelete = async (selectedRow: any) => {
    // const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    // if (confirmDelete) {
    //   try {
    //     await axios.delete(`https://localhost:7050/api/users/${selectedRow.id}`);
    //     setRowData(prevData => prevData.filter(row => row.id !== selectedRow.id));
    //     handleSnackbar('Item deleted successfully');
    //   } catch (error) {
    //     console.error('Failed to delete item', error);
    //   }
    // }
    setRowIdToDelete(selectedRow.id);
    setIsConfirmationBoxOpen(true);
    setConfirmationBoxMsg("Are you sure you want to delete this item?");
  };

  const handleYesBtnClick = async () =>{
    try {
      await axios.delete(`https://localhost:7050/api/users/${rowIdToDelete}`);
      setRowData(prevData => prevData.filter(row => row.id !== rowIdToDelete));
      handleSnackbar('Item deleted successfully');
    } catch (error) {
      console.error('Failed to delete item', error);
    }
  }

  const handleNoBtnClick = () =>{
    setIsConfirmationBoxOpen(false);
  }

  const handleSave = async () => {

    //Validation Part
    if (!formValues.email || !/\S+@\S+\.\S+/.test(formValues.email)) {
      setFormValueError({...formValueErrors, email:true});
      setFormValuesErrorMsg({...formValuesErrorMsg, email:'Please enter a valid email address.'});
      return;
    }
    if(!formValues.phone || !/((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/.test(formValues.phone)){
      setFormValueError({...formValueErrors, phone:true});
      setFormValuesErrorMsg({...formValuesErrorMsg, phone:'Please enter a valid phone number.'});
      return;
    }
    if(!formValues.zip || !/^\d{3}\s?\d{3}$/.test(formValues.zip)){
      setFormValueError({...formValueErrors, zip:true});
      setFormValuesErrorMsg({...formValuesErrorMsg, zip:'Please enter a valid zip pin, it must contain 6 number.'});
      return;
    }

    if (currentRow) {
      // Update existing row
      try {
        await axios.put(`https://localhost:7050/api/users/${currentRow.id}`, formValues);
        setRowData(prevData =>
          prevData.map(row => (row.id === currentRow.id ? { ...row, ...formValues } : row))
        );
        handleSnackbar('Item edited successfully');
      } catch (error) {
        console.error('Failed to update item', error);
      }
    } else {
      // Add new row
      try {
        const response = await axios.post('https://localhost:7050/api/users', formValues);
        setRowData(prevData => [...prevData, response.data]);
        handleSnackbar('Item added successfully');
      } catch (error) {
        console.error('Failed to add item', error);
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
        rowData={rowData}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        enableAdd={true}
        enableEdit={true}
        enableDelete={true}
        enableExport={true}
      />

      <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="md">
        <DialogTitle sx={{fontWeight:'700'}}>{currentRow ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
        <Grid container rowSpacing={1} >
          {Object.keys(formValues).map((key) => (
            <>
              <Grid item sm={3} key={key} sx={{display:'flex', alignItems:'center'}}>
                <Typography variant='body1'>{key.charAt(0).toUpperCase() + key.slice(1)}</Typography>
              </Grid>
              <Grid item sm={9} key={key}>
                <TextField
                  size='small'
                  autoFocus={key === 'name'}
                  margin="dense"
                  id={key}
                  name={key}
                  //label={key.charAt(0).toUpperCase() + key.slice(1)}
                  type={formValuesType[key as keyof typeof formValuesType]}
                  fullWidth
                  value={formValues[key as keyof typeof formValues]}
                  onChange={handleInputChange}
                  error={formValueErrors[key as keyof typeof formValueErrors]}
                  helperText={formValuesErrorMsg[key as keyof typeof formValuesErrorMsg]}
                />
              </Grid>
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
