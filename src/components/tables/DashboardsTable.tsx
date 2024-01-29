import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCreateDashboardData } from '../../redux/slice/dashboardSlice';
import { deleteDashboardApi, getDashboardByIdApi } from '../../services/webApis/webApis';
import { toast } from 'react-toastify';
import React from 'react';
import DialogComponent from '../UI/dialog/DialogComponent';

const DashboardsTable = ({dashboardsArray, isLoading , fetchData}: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedDashboardId , setSelectedDashboardId] = React.useState<any>('')
    const [openDeleteDashboardDialog, setDeleteDashboardDialog] = React.useState(false);
  const [previewDashboardData,setPreviewDashboardData ] = React.useState('');

  const handleOpenDeleteDashboardDialog = () => {
    setDeleteDashboardDialog((prev) => !prev);
  };

  const handleCloseDeleteDashboardDialog = () => {
    setDeleteDashboardDialog((prev) => !prev);
  };

  const handleDeleteDashboard =async ( selectedDashboardId ) => {
    try {
        const response =await deleteDashboardApi(selectedDashboardId);
        if(response.status === 200){
            toast.success("Dashboard Deleted successfully");
            handleCloseDeleteDashboardDialog();
            fetchData({id:"", ticksize:3600000, filter:''});
          }
    } catch (error) {
        toast.error(error?.response?.data?.error || 'Something went wrong')
    } finally{
        handleCloseDeleteDashboardDialog();
    }
  }

  async function getDashboardData(data) {
    try {
        const response = await getDashboardByIdApi(data);
        setPreviewDashboardData(JSON.stringify(JSON.parse(JSON.stringify(response.data)), null, 2));
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
    }
  }

  if(previewDashboardData){
    dispatch(setCreateDashboardData(previewDashboardData));
    sessionStorage.setItem( 'isUpdate','true');
    navigate(`/dashboard/configuration/dashboards/preview/${selectedDashboardId}`,{state:selectedDashboardId});
 
  }

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex:1
        },
        {
            field: 'id',
            headerName: 'id',
            flex:1

        },
        {
            field: 'type',
            headerName: 'Type',
            flex:1,
            renderCell:  (row) => {
                return row.row.type || "N/A"
            }

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
                        <VisibilityOutlinedIcon fontSize='small' className='cursor-pointer' onClick={()=>{
                            setSelectedDashboardId(row.id);
                            getDashboardData(row.id)
                        }}/>
                        <CreateIcon fontSize='small' className='cursor-pointer' 
                        onClick={()=>{
                            setSelectedDashboardId(row.id);
                            sessionStorage.setItem( 'isUpdate','true');
                            navigate(`/dashboard/configuration/dashboards/edit-dashboard?dashboardId=${row.id}`, {state:row.id});                           
                        }}
                        />
                        <DeleteIcon fontSize='small' className='cursor-pointer' 
                        onClick={()=>{
                            setSelectedDashboardId(row.id)
                            handleOpenDeleteDashboardDialog();
                        }}/>
                    </Box>
                )
            }
        }
    ];
  return (
    <Box>
        <DataGrid
            rows={dashboardsArray || []}
            columns={columns}
            initialState={{
            
                pagination: {
                    paginationModel: {
                    pageSize: 10,
                    },
                },
            }}
            loading={isLoading}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
            autoHeight={false}
        /> 
            {openDeleteDashboardDialog && (
        <DialogComponent 
          open={openDeleteDashboardDialog} 
          content={''} 
          handleClose={handleCloseDeleteDashboardDialog} 
          handleDelete={()=>handleDeleteDashboard(selectedDashboardId)} 
        />
      )}
    </Box>
    
)
}

export default DashboardsTable
