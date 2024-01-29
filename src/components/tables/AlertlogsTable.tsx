import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';



const AlertlogsTable = ({alertsArray}: any) => {
    
    const columns: GridColDef[] = [
        {
            field: 'time',
            headerName: 'Time',
            flex: 1,
        },
        {
            field: 'operation',
            headerName: 'Operation',
            flex: 1,
            
        },
        {
            field: 'attached_objects',
            headerName: 'Object',
            flex: 1,
           
        },
        {
            field: 'result_details',
            headerName: 'Result Details',
            flex: 1,
           
        },
       
    ];
    
   

return (
    <Box height={'436px'}>
            <DataGrid
                rows={alertsArray|| []}
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
)
}

export default AlertlogsTable
