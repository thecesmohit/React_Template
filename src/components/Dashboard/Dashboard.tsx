import React, { useState, useEffect } from 'react';
import CommonGrid from '../CommonGrid/CommonGrid';
import { ColDef } from 'ag-grid-community';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [rowData, setRowData] = useState<any[]>([]);
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
    fetchRowData();
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
        await axios.delete(`https://localhost:7050/api/users/${selectedRow.id}`);
        setRowData(prevData => prevData.filter(row => row.id !== selectedRow.id));
        handleSnackbar('Item deleted successfully');
      } catch (error) {
        console.error('Failed to delete item', error);
      }
    }
  };

  const handleSave = async () => {
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
