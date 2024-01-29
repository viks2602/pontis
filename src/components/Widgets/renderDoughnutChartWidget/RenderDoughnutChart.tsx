import { useSelector } from 'react-redux'

import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import CustomCard from '../../UI/card/Card'
import ViewMore from '../../UI/card/ViewMore'
import DoughnutChart from '../../charts/doughnutChart/DoughnutChart'
import Timeframe from '../../UI/timeframe/Timeframe'

import { dashboardData } from '../../../redux/slice/dashboardSlice'

import { globalCss } from '../../../styles/muiCss'

const RenderDoughnutChart = ({data}: any) => {
  const {dashBoardDetails} = useSelector(dashboardData);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  
  console.log(data?.chart)
    return (
        <CustomCard sx={globalCss.widgetCardContainer}>
        <ViewMore view_more_link={data.view_more_link}>
          <Box padding='20px 10px 10px 10px' height={'100%'}>        
          <Box display={'flex'} justifyContent={'space-between'} paddingX={1}  alignItems={'center'}>
          <Tooltip title={isSmallScreen ? data.name : ''} arrow>
            <Typography width={'auto'} className='text-overflow-ellipsis' fontSize={{xl:'20px', xs:'18px'}} mr='8px'>{data.name}</Typography>
          </Tooltip>
           {!dashBoardDetails?.type?.split(',').includes('historical') && <Timeframe title={data?.chart?.aggregate_health?.time_frame['type']}/>}
          </Box>
           <DoughnutChart data={data?.chart}/>
          </Box>
         </ViewMore>
        </CustomCard>
      )
}

export default RenderDoughnutChart