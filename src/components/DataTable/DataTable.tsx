import React, {useState} from 'react';
import { DataGrid, GridColDef, GridDataContainer, GridValueGetterParams, GridSelectionModel } from '@material-ui/data-grid';
import { server_calls } from '../../api'; 
import { useGetData } from '../../custom-hooks';
import { Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from '@material-ui/core'; 
import { DroneForm } from '../../components/DroneForm';


const columns: GridColDef[] = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 110 
    },
    { 
      field: 'name', 
      headerName: 'Drone Name', 
      width: 150, 
      editable: true, 
    },
    { 
      field: 'price', 
      headerName: 'Cost', 
      width: 120, 
      type: 'number', 
      editable: true, 
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 210,
      editable: true,   
    },
    {
      field: 'camera_quality',
      headerName: 'Camera Quality',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      editable: true,
    },
  ];


export const DataTable =  () => {
  
  let { droneData, getData } = useGetData();
  let [open, setOpen] = useState(false);
  let [gridData, setData] = useState<GridSelectionModel>([])

  let handleOpen = () => {
    setOpen(true)
  }

  let handleClose = () => {
    setOpen(false)
  }

  let deleteData = () => {
    server_calls.delete(`${gridData[0]}`)
    getData()
  }


    return (
        <div style={{ height: 400, width: '100%' }}>
          <h2>Drones In Inventory</h2>
          <DataGrid rows={droneData} columns={columns} pageSize={5} checkboxSelection onSelectionModelChange={(newSelectionModel) => {
            setData(newSelectionModel);
          }}
          selectionModel={gridData}
          {...droneData}/>

        <Button onClick={handleOpen}>Update</Button>
        <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>

          {/*Dialog Pop Up begin */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update Your Drone</DialogTitle>
          <DialogContent>
            <DialogContentText>Drone: {gridData[0]}</DialogContentText>
              <DroneForm id={`${gridData[0]}`}/>
          </DialogContent>
          <DialogActions>
            <Button onClick = {handleClose} color="primary">Cancel</Button>
          </DialogActions>
        </Dialog>
        </div>
      );
}