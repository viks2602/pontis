import { useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

import { DataGrid } from '@mui/x-data-grid';

import CustomCard from '../../UI/card/Card';
import Export from '../../UI/export/Export';
import Timeframe from '../../UI/timeframe/Timeframe';

import { dashboardData } from '../../../redux/slice/dashboardSlice';

import { globalCss } from '../../../styles/muiCss';


const RenderTableWidget = ({data}: any) => {
  const {dashBoardDetails} = useSelector(dashboardData);
    
    const rows = data?.data?.rows ? data?.data?.rows : data?.chart?.rows;
    const columns = data?.data?.columns ? data?.data?.columns : data?.chart?.columns;

    const colors = data?.data?.status_colors ? data?.data?.status_colors : data?.chart?.status_colors;

    const timeFrameLabel = data?.data?.aggregate_health?.time_frame['type'] ? data?.data?.aggregate_health?.time_frame['type'] : data?.chart?.aggregate_health?.time_frame['type']
    
    const RenderCell = ({column, row}) => {
      
      if( column.field === 'status'){
        return(
            <Box display='flex' justifyContent={'center'}>
              <Chip 
                sx={{
                  minWidth:'130px', 
                  color:colors?.find((item) => item.label === row.value)?.color, 
                  backgroundColor:colors?.find((item) => item.label === row.value)?.background}} 
                  label={row.value} />
            </Box>
        )
      }else{
        return(
          <Box width={'100%'}>
            <Tooltip title={row.value}>
              <Typography className='text-overflow-ellipsis'>{row.value ? row.value : '-'}</Typography>
            </Tooltip>
          </Box>
        )
      }
  }
  

    return (
      <CustomCard sx={globalCss.widgetCardContainer}>
        <Grid item md={data?.size_x ? data?.size_x : 6} px={2}>
          <Box py={2} display='flex' justifyContent='space-between'>
            <Typography fontSize={{xl:'20px', sm:'18px'}} fontWeight={400}>{data?.name}</Typography>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
             {!dashBoardDetails?.type?.split(',').includes('historical') && <Timeframe title={timeFrameLabel || ''}/>}
             {data?.export && <Export rows={rows} columns={columns} filename={data?.export_filename}/>}
            </Box>

          </Box>
          <Box mt={'10px'} height={'650px'}>
            <DataGrid 
                rows={rows ? rows : []}
                columns={columns ? columns.map((column)=> {
                  return {
                    ...column,
                    flex: 1,
                    minWidth: column.field === 'id' ? 100 : 140,
                    renderCell: (row) =><RenderCell column={column} row={row}/>
                }
              }) : []}
                initialState={{
                  ...data.initialState,
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                pagination={true}
                pageSizeOptions={[10, 15, 20]}
                checkboxSelection={false}
                disableRowSelectionOnClick
            />
          </Box>
        </Grid>
      </CustomCard>
        )
}

export default RenderTableWidget
