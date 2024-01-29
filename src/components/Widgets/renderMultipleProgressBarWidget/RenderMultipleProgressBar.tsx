import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import CustomCard from '../../UI/card/Card'
import ViewMore from '../../UI/card/ViewMore'
import MultiColorProgressBar from '../../progressbar/MultilineProgressBar'
import Timeframe from '../../UI/timeframe/Timeframe'

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

const RenderMultipleProgressBar = ({data}: any) => {
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
          <Box display='flex' justifyContent={'center'}>
            <Box minWidth={'80%'} >
              {data.chart.chart.map((item: ProgressData, index:number) => {
                return (
                  <Box mt="10px" key={index}>
                    <Box display={"flex"} justifyContent={''} alignItems='center' gap={1}>
                      <Typography color='rgba(0, 0, 0, 0.6)'>{item.name}</Typography>
                      <Typography fontSize={{xl:'18px', xs:'15px'}} color='rgba(0, 0, 0, 0.6)' fontWeight={500}>{item.netvalue}</Typography>
                    </Box>
                    <MultiColorProgressBar data={item.dataset} totalValue={item.netvalue}/>
                  </Box>
                )
              })}
              <Typography display={'flex'} justifyContent={'center'} mt={1}>{data.chart.axis_label}</Typography>
              <Box display='flex' justifyContent={'space-around'} mt={2}  >
                {data?.chart?.labels && data.chart.labels.length && data.chart.labels.map((item:Dataset, i: number) => {        
                  return (
                      <div className="legend" style={{display: "flex", flexDirection: "row", alignItems: "center", gap:'5px'}} key={i} >
                          <div className="dot" style={{'backgroundColor': item.color, 'height':'13px', 'width':'13px', borderRadius:'50%'}}></div>
                          <Typography component='span' className="label">{item.name}</Typography>
                      </div>
                  )
                })}
              </Box>
            </Box>
          </Box>
          </Box>
          </ViewMore>
        </CustomCard>
      )
}

export default RenderMultipleProgressBar
