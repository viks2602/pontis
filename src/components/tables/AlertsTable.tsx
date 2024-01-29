import React from 'react';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import WarningIcon from '@mui/icons-material/Warning';
import { deleteListAlertsApi, modifyListAlertsApi } from '../../services/webApis/webApis';
import { toast } from 'react-toastify';
import AlertForm from '../UI/forms/AlertForm';
import { getAlertsData } from '../../redux/slice/alertSlice';
import { useDispatch } from 'react-redux';
import DialogComponent from '../UI/dialog/DialogComponent';
import EditAlertForm from '../UI/forms/EditAlertForm';


const AlertsTable = ({alertsArray, isLoading}: any) => {
    const dispatch = useDispatch();
    const [open, setOpen ]= React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [deleteAlertData, setDeleteAlertData] = React.useState<any>(null)
    const [editAlertData, setEditAlertData] = React.useState<any>(undefined)

    // console.log(alertsArray);
    
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90},
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
        },
        {
            field: 'owner',
            headerName: 'Owner',
            flex: 1,
            valueGetter: (params: GridValueGetterParams) =>{
                return params.row.owner.full_name
            }
        },
        {
            field: 'attached_objects',
            headerName: 'Object',
            flex: 1,
            valueGetter(params) {
                return params.row.attached_objects[0]
            },
        },
        {
            headerName:"Actions",
            field:'action',
            width: 150,
            disableColumnMenu:true,
            sortable: false,
            renderCell:  (row) => {
                return (
                    <Box display='flex' justifyContent='space-around' alignItems='center' width='100%'>
                        <CreateIcon fontSize='small' className='cursor-pointer' onClick={()=>{
                            setEditAlertData(row.row);
                            setOpen(true);
                        }}/>
                        <DeleteIcon fontSize='small' className='cursor-pointer' onClick={()=>{
                            handleClickOpen();
                            setDeleteAlertData(row.row);
                        }}/>
                        {row.row.enabled ? (
                            <NotificationsIcon fontSize='small' className='cursor-pointer' onClick={()=>handleDisableAlert(row.row, 'disable')}/>
                        ) : (
                            <NotificationsNoneIcon fontSize='small' className='cursor-pointer' onClick={()=>handleDisableAlert(row.row, 'enable')}/>
                        )}
                    </Box>
                )
            }
        }
    ];
    
    const handleClickOpen = () => {
        setOpenDeleteDialog(true);
    };
    
    const handleClose = () => {
        setOpenDeleteDialog(false);
    };

    async function handleDisableAlert(data: any, type: 'enable' | 'disable'){
        try {
            const response = await modifyListAlertsApi( data.id, {...data, enabled: type === 'enable' ? true : false});
            console.log(response);
            if(response.data.result === 'success'){
                toast.success(`Alert ${type}d successfully`);
                dispatch(getAlertsData() as any);
            }
        } catch (error) {
            console.log(error);
        }
    };

    async function handleDeleteAlert(){
        try {
            const response = await deleteListAlertsApi(deleteAlertData.id);
            console.log(response);
            setOpenDeleteDialog(false);
        } catch (error) {
            console.log(error);
            toast.error(JSON.stringify(error))
        } 
    }

return (
    <>
        <Box height={'620px'}>
            <DataGrid
                rows={alertsArray || []}
                columns={columns}
                initialState={{
                    columns:{
                        columnVisibilityModel:{
                            id:false
                        }
                    },
                    pagination: {
                        paginationModel: {
                        pageSize: 10,
                        },
                    },
                }}
                loading={alertsArray ? false : true}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick
                autoHeight={false}
            />
        </Box>
        {open && 
            <EditAlertForm type='EDIT' defaultValues={editAlertData} open={open} setOpen={setOpen}/>
        }
        <DialogComponent 
            open={openDeleteDialog} 
            handleClose={handleClose} 
            content={deleteAlertData?.name} 
            handleDelete={handleDeleteAlert} 
        />
    </>
)
}

export default AlertsTable
