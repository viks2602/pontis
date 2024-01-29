import React from 'react';
import { useSelector } from 'react-redux'

import { Box, Tooltip, Typography } from '@mui/material'

import CustomCard from '../../UI/card/Card'
import ViewMore from '../../UI/card/ViewMore'
import LineChart from '../../charts/lineChart/LineChart'
import RenderGraphSelect from '../renderGraphSelect/RenderGraphSelect'
import RenderTabsWidget from '../renderTabsWidget/RenderTabsWidget';
import Timeframe from '../../UI/timeframe/Timeframe'

import { dashboardData } from '../../../redux/slice/dashboardSlice'

import { Dataset2 } from '../../../interfaces/widgetInterface';

import { globalCss } from '../../../styles/muiCss'

const RenderLineChart = ({ data } : any) => {
  const {dashBoardDetails} = useSelector(dashboardData);

  const chartContainerRef = React.useRef<HTMLElement|null>(null);
  
  const [height, setHeight] = React.useState(250);
  const [optionIndex, setOptionIndex] = React.useState(0);
  const [graphFilterValue, setGraphFilterValue] = React.useState("");

  const handleChange = (event:React.ChangeEvent<HTMLSelectElement>, options:Dataset2[]) => {
    event.stopPropagation();

    setGraphFilterValue(event.target.value);
    setOptionIndex(options.findIndex((option:Dataset2) => option.label === event.target.value));
  };

  const [chartData, setChartData] = React.useState<any>(data.chart?.tabs ? data.chart?.items[0] : data);
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setSelectedTabIndex(newValue);  
    setChartData(data.chart?.items[newValue])
  }

  React.useEffect(()=>{
    setTimeout(() => {
      if(chartContainerRef.current){
        setHeight(chartContainerRef.current?.clientHeight );
      }
     }, 0.01);
  },[data]);
  
 
    return (
        <CustomCard sx={globalCss.widgetCardContainer} >
            <Box padding={'10px 10px 0px 10px'} height='100%'>
              <ViewMore view_more_link={data.view_more_link}> 
              <Box width={'100%'} flex={0} padding='10px 0px 0px 0px' display={'flex'} justifyContent={'center'} /* border='1px solid red' */>
                <Box mb={2} width={'97%'} display={''} justifyContent={'space-between'} alignItems={'center'}>
                  <Box  display='flex' justifyContent='space-between' alignItems='center' gap={'8px'}>
                  <Tooltip title={data.name}>
                      <Typography className='text-overflow-ellipsis' fontSize={'1.25rem'}>{data.name}</Typography>
                    </Tooltip>
                    <Box display='flex' alignItems='center' gap={2}>
                      {!dashBoardDetails?.type?.split(',').includes('historical') && <Timeframe title={chartData?.chart?.aggregate_health?.time_frame['type']}/>}
                      {chartData?.filter &&  <RenderGraphSelect value={graphFilterValue} handleChange={handleChange} options={chartData?.chart?.datasets}/>}
                    </Box>
                  </Box>
                  <Box >
                    {
                      data.chart.tabs && <RenderTabsWidget data={data.chart} selectedTabIndex={selectedTabIndex} handleChange={handleTabChange}/>
                    }
                  </Box>
                </Box>
              </Box>
              <Box px={'10px'} flex={1} height='100%' ref={chartContainerRef}>
                {chartData && <LineChart 
                  labels={chartData?.chart?.labels}  
                  datasets={chartData ? chartData.filter ? [chartData?.chart?.datasets[optionIndex]] : chartData?.chart?.datasets : data.chart.datasets} 
                  height={height} 
                  x_axis_title={chartData?.chart?.x_axis_title} 
                  y_axis_title={chartData?.chart?.y_axis_title}
                />}
              </Box>
              </ViewMore>
            </Box>
        </CustomCard>
      )
}

export default RenderLineChart