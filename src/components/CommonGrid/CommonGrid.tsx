import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { IconButton, Toolbar, Snackbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { GridOptions, ColDef } from 'ag-grid-community';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

interface CommonGridProps {
  columnDefs: ColDef[];
  rowData: any[];
  onAdd?: () => void;
  onEdit?: (selectedRow: any) => void;
  onDelete?: (selectedRow: any) => void;
  enableAdd?: boolean;
  enableEdit?: boolean;
  enableDelete?: boolean;
  enableExport?: boolean;
}

const CommonGrid: React.FC<CommonGridProps> = ({
  columnDefs,
  rowData,
  onAdd,
  onEdit,
  onDelete,
  enableAdd = true,
  enableEdit = true,
  enableDelete = true,
  enableExport = true,
}) => {
  const gridRef = React.useRef<AgGridReact>(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleExport = () => {
    if (gridRef.current) {
      gridRef.current.api.exportDataAsCsv();
      handleSnackbar('Data exported successfully');
    }
  };

  const handleAdd = () => {
    if (onAdd) {
      onAdd();
    }
  };

  const handleEdit = () => {
    const selectedRows = gridRef.current?.api.getSelectedRows();
    if (onEdit && selectedRows && selectedRows.length === 1) {
      onEdit(selectedRows[0]);
    }
  };

  const handleDelete = () => {
    const selectedRows = gridRef.current?.api.getSelectedRows();
    if (onDelete && selectedRows && selectedRows.length === 1) {
      const confirmDelete = window.confirm('Are you sure you want to delete this item?');
      if (confirmDelete) {
        onDelete(selectedRows[0]);
      }
    }
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
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <h2>{document.title}</h2>
        <div style={{ display: 'flex', gap: '5px' }}>
          {enableAdd && (
            <IconButton color="primary" onClick={handleAdd}>
              <AddIcon />
            </IconButton>
          )}
          {enableEdit && (
            <IconButton color="secondary" onClick={handleEdit} >
              <EditIcon />
            </IconButton>
          )}
          {enableDelete && (
            <IconButton color="error" onClick={handleDelete} >
              <DeleteIcon />
            </IconButton>
          )}
          {enableExport && (
            <IconButton onClick={handleExport}>
              <FileDownloadIcon />
            </IconButton>
          )}
        </div>
      </Toolbar>
      <div className="ag-theme-alpine" style={{ height: 750, width: '100%' }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection="single"
          animateRows={true}
          defaultColDef={{ sortable: true, filter: true }}
        />
      </div>
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

export default CommonGrid;
