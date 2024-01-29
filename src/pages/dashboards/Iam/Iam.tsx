import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

import dayjs, { Dayjs } from 'dayjs';

import { SelectChangeEvent } from "@mui/material/Select";
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { AppDispatch } from '../../../redux/store'
import { dashboardData, getDashboardDetails } from '../../../redux/slice/dashboardSlice'

import { 
  Loader, 
  CustomGrid, 
  RenderLabel, 
  RenderCard, 
  RenderLineChart, 
  RenderBarChartWidget, 
  RenderCardArray, 
  RenderDoughnutChart, 
  RenderMultipleProgressBar, 
  RenderArrayData, 
  RenderHorizontalChart, 
  Filter, 
  RenderCardHolder, 
  RenderMultiBarStackedBarChartWidget, 
  RenderMultipleProgressBarWithTotalBar, 
  RenderPamsCardArray, 
  RenderStackBarChartWidget, 
  RenderTableWidget, 
  RenderTableWithActions, 
  RenderTabsWidget } from '../../../components';

import { timeFrameOptions } from '../../../data/constants';
import { checkIsLessThan24hrs } from '../../../common/helperFunctions';

import { GetDashboardByIdQuery } from '../../../interfaces/dashboardInterfaces';
import { TabData } from '../../../interfaces/widgetInterface';



type filterValueType = { days:number, ticksize:number };

const Iam = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {dashboardId=''} = useParams();
  const { dashBoardDetails, isLoading } = useSelector(dashboardData);

  const [filterValue, setFilterValue] = useState<filterValueType>({ days:1, ticksize:600000});
  const [startDateValue, setStartDateValue] = useState<Dayjs>(dayjs());
  const [endDateValue, setEndDateValue] = useState<Dayjs>(dayjs());

  const [value, setValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number, data: TabData) => {
    event.preventDefault();
    if(data.tabs_content === 'server_side'){
      dispatch(getDashboardDetails({id:dashboardId , ticksize:3600000, filter:`&${data.name}=${data.tabs[newValue]}`}));
    }else if(data.tabs_content === 'client_side'){
      setValue(newValue);  
    }
    setValue(newValue);  
  }

  const handleStartDateChange = (newValue: Dayjs) => {
    setStartDateValue(newValue);
  };

  const handleEndDateChange = (newValue: Dayjs) => {
    setEndDateValue(newValue);
  };

  const handleFilter = () =>{
    
    const startTime = new Date(startDateValue?.format()).getTime();
    const endTime = new Date(endDateValue?.format()).getTime();
    const tickSize = checkIsLessThan24hrs(new Date(startDateValue?.format()), new Date(endDateValue?.format()));

    fetchData({id:dashboardId , start:startTime.toString(), end:endTime.toString(), ticksize:tickSize ? 600000 : 3600000, filter:''});
  }

  const handleFilterChange = (event: SelectChangeEvent) => {
    
    const {value} = event.target;
    const tickSize = timeFrameOptions.find((item) => item.value === parseInt(value))?.ticksize;

    setFilterValue((prev => ({
        ...prev,
        days: parseInt(value),
        ticksize: tickSize ?? 3600000
      })
    ));

    const startTime = new Date(new Date().setDate(new Date().getDate() - parseInt(event.target.value))).getTime();
    const endTime = new Date(endDateValue?.format()).getTime();

    fetchData({id:dashboardId , start:startTime.toString(), end:endTime.toString(), ticksize:tickSize ?? 3600000, filter:''});
  };


  React.useEffect(() => {
    fetchData({id:dashboardId , ticksize:3600000, filter:''});
  }, [dashboardId]);

  const fetchData = (queryData: GetDashboardByIdQuery) => {
    dispatch(getDashboardDetails(queryData));
  };

  if (isLoading) {
    return <Loader/>;
  }

  return (
    <Box paddingX={{xl:4, xs:2}} paddingY={{xl:2, xs:2}}>
      {(dashBoardDetails && Object.keys(dashBoardDetails).length <= 0) || !dashBoardDetails && (
        <Box sx={{height:{xs:`calc(100vh - 76px)`, sm: `calc(100vh - 84px)`}}} display='flex' justifyContent={'center'} alignItems='center'>
          <Typography variant='h4'>
            No Data Available
          </Typography>
        </Box>
      )}
      {dashBoardDetails && Object.keys(dashBoardDetails).length > 0 && (
        <>
          <Stack
            width={"100%"}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography fontSize={{xl:"30px", md:'24px', xs:'22px'}} fontWeight={500}>{dashBoardDetails?.name}</Typography>
            <Stack direction={"row"} alignItems={"center"}>
              {dashBoardDetails?.type?.split(',').includes('historical') ? 
              <Filter 
                filterValue={filterValue} 
                handleChange={handleFilterChange} 
                startDateValue={startDateValue} 
                endDateValue={endDateValue} 
                handleEndDateChange={handleEndDateChange} 
                handleStartDateChange={handleStartDateChange} 
                handleFilter={handleFilter}
                /> : null
              }
            </Stack>
          </Stack>
          <Box className="grid-container" sx={{minHeight:{xs:`calc(100vh - 76px)`, sm: `calc(100vh - 84px)`}}}>
            {dashBoardDetails?.widgets.map((widget: any, index:number)=>{  
                return (
                    <CustomGrid  key={index} row={widget['row']} col={widget['col']} rowSpan={widget['size-y']} colSpan={widget['size-x']}>
                        {widget.directive_type === 'label' && <RenderLabel data={widget}/>}
                        {widget.directive_type === 'card' && <RenderCard data={widget}/>}
                        {widget.directive_type === 'line-chart' && <RenderLineChart data={widget} />
                        }
                        {widget.directive_type === 'bar-chart' && <RenderBarChartWidget 
                          data={widget} />
                        }
                        {widget.directive_type === 'card-array' && <RenderCardArray data={widget}/>}
                        {widget.directive_type === 'doughnut-chart' && <RenderDoughnutChart data={widget}/>}
                        {widget.directive_type === 'multiline-progress-bar' && <RenderMultipleProgressBar data={widget}/>}
                        {widget.directive_type === 'array' && <RenderArrayData data={widget}/>}
                        {widget.directive_type === "horizontal-barchart" && <RenderHorizontalChart data={widget}/>}
                        {widget.directive_type === 'table' && <RenderTableWidget data={ widget?.chart?.table_datasets ? widget.chart.table_datasets[value] : widget}/>}
                        {widget.directive_type === 'tabs' && <RenderTabsWidget data={widget} selectedTabIndex={value} handleChange={handleTabChange}/>}
                        {widget.directive_type === 'multiline-progress-with-total-bar' && <RenderMultipleProgressBarWithTotalBar data={widget} />}
                        {widget.directive_type === 'stacked-bar-chart' && <RenderStackBarChartWidget data={widget}  />}
                        {widget.directive_type === 'multibar-stacked-bar-chart' && <RenderMultiBarStackedBarChartWidget data={widget}  />}
                        {widget.directive_type === 'card-holder' && <RenderCardHolder data={widget}  />}
                        {widget.directive_type === 'pams-card-array' && <RenderPamsCardArray data={widget}  />}
                        {widget.directive_type === 'table-with-actions' && <RenderTableWithActions data={widget}  />}
                    </CustomGrid>
                )
              })}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Iam;
