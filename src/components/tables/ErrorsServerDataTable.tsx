import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';



const ErrorsServerDataTable = ({errorsArray}: any) => {
    
    const columns: GridColDef[] = [
        {
            field: 'pri_ts',
            headerName: 'Time',
            flex: 1,
        },
        {
            field: 'stat',
            headerName: 'Stat',
            flex: 1,
            
        },
        {
            field: 'op',
            headerName: 'op',
            flex: 1,
           
        },
        {
            field: 'err',
            headerName: 'Error',
            flex: 1,
           
        },
       
    ];
    
   

return (
    <Box height={'436px'}>
            <DataGrid
                getRowId={(row) => row.id + Math.random()}
                rows={errorsArray|| []}
                columns={columns}
                initialState={{
                    columns:{
                        columnVisibilityModel:{
                            id:false
                        }
                    },
                    pagination: {
                        paginationModel: {
                        pageSize: 5,
                        },
                    },
                }}
                loading={errorsArray ? false : true}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick
                autoHeight={false}
            />
        </Box>
)
}

export default ErrorsServerDataTable