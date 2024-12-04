import React, { useState, useEffect } from 'react';
import CommonGrid from '../CommonGrid/CommonGrid';
import { ColDef } from 'ag-grid-community';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../store/slices/addUserSlice';
import { AppDispatch, RootState } from '../../store/store';
import { getUsers } from '../../store/slices/getUserSlice';
import { deleteUser } from '../../store/slices/deleteUserSlice';
import { updateUser } from '../../store/slices/updateUserSlice';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.getUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<any | null>(null);
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
      setIsDialogOpen(true);
    
  };

  const handleDelete = async (selectedRow: any) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      try {
        await dispatch(deleteUser(selectedRow.id)).unwrap();
        dispatch(getUsers());
        handleSnackbar('Item deleted successfully');
      } catch (error: any) {
        const errorMessage = error?.response?.data?.title || 'Failed to delete item';
        setSnackbarMessage(errorMessage);
        setSnackbarOpen(true);
      }
    }
  };

  const handleSave = async () => {
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

      <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="md">
        <DialogTitle>{currentRow ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          {Object.keys(formValues).map((key) => (
            <TextField
              key={key}
              autoFocus={key === 'name'}
              margin="dense"
              name={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              type="text"
              fullWidth
              value={formValues[key as keyof typeof formValues]}
              onChange={handleInputChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
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
    </div>
  );
};

export default Dashboard;
