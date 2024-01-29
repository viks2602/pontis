import { useSelector } from 'react-redux'

import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import CustomCard from '../../UI/card/Card'
import ViewMore from '../../UI/card/ViewMore'
import MultiColorProgressBar from '../../progressbar/MultilineProgressBar'
import Timeframe from '../../UI/timeframe/Timeframe'
import SingleProgressBars from '../../progressbar/singleProgressBar/SingleProgressBar'

import { dashboardData } from '../../../redux/slice/dashboardSlice'

import { globalCss } from '../../../styles/muiCss'

import '../../../components/progressbar/multilineProgressBar.scss'
export interface ProgressData {
  name: string
  netvalue: number
  dataset: Dataset[]
}

export interface Dataset {
  name: string
  color: string
  value: number
}

const RenderMultipleProgressBarWithTotalBar = ({data}: any) => {
  const {dashBoardDetails} = useSelector(dashboardData);

    return (
        <CustomCard sx={globalCss.widgetCardContainer} >
        <ViewMore view_more_link={data.view_more_link}>
         <Box padding='20px 10px 20px 10px'>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} paddingX={2}>
          <Tooltip title={data.name} arrow>
            <Typography className='text-overflow-ellipsis' fontSize={{xl:'20px', sm:'18px'}} mr='8px'>{data.name}</Typography>
          </Tooltip>
          {!dashBoardDetails?.type?.split(',').includes('historical') && <Timeframe title={data?.chart?.aggregate_health?.time_frame['type']}/>}
          </Box>
          <Box display='flex' flexDirection={'column'} alignItems={'center'} >
            <Box minWidth={'90%'} mt={'24px'}>
              <Box display={'flex'} justifyContent='space-between'>
              <Typography color='rgba(0, 0, 0, 0.6)' fontSize={'16px'}>{data.chart.total_bar_text}</Typography>
              <Typography color='rgba(0, 0, 0, 0.6)'>{data.chart.total_value}</Typography>
              </Box>
              <MultiColorProgressBar data={data.chart.dataset.map((item)=>{ return {value:item.value, color:item.color}})} totalValue={data.chart.total_value} scales={false}/>
            </Box>
            <Box minWidth={'80%'} >
              {data.chart.dataset.map((item: any, index:number) => {
                return (
                  <Box mt="20px" key={index}>
                    <Box display={"flex"} alignItems='center' justifyContent='space-between' gap={1}>
                      <Typography color='rgba(0, 0, 0, 0.6)'>{item.name}</Typography>
                      <Typography fontSize={{xl:'16px', xs:'14px'}} color='rgba(0, 0, 0, 0.6)' fontWeight={500}> {item.value}</Typography>
                    </Box>
                    <SingleProgressBars color={item.color} value={(item.value/data.chart.total_value)*100}/>
                  </Box>
                )
              })}
              <Typography display={'flex'} justifyContent={'center'} mt={1}>{data.chart.axis_label}</Typography>
            </Box>
          </Box>
          </Box>
          </ViewMore>
        </CustomCard>
      )
}

export default RenderMultipleProgressBarWithTotalBar
