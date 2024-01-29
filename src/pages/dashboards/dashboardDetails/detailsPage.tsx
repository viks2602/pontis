import React, {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs, { Dayjs } from 'dayjs';

import { SelectChangeEvent } from "@mui/material/Select";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { 
  CustomGrid, 
  Filter, 
  Loader, 
  RenderTableWidget, 
  RenderTabsWidget 
} from '../../../components';

import { AppDispatch } from '../../../redux/store';
import { dashboardData, getDashboardDetails } from '../../../redux/slice/dashboardSlice';

import { timeFrameOptions } from '../../../data/constants';
import { checkIsLessThan24hrs } from '../../../common/helperFunctions';

import { GetDashboardByIdQuery } from '../../../interfaces/dashboardInterfaces';
import { TabData } from '../../../interfaces/widgetInterface';

import { OpenNew } from '../../../assets/icons/OpenNew';


type filterValueType = { days:number, ticksize:number };

const DetailsPage = () => {
  const navigate= useNavigate();
  const {detailDashboardId} = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const {dashBoardDetails, isLoading} = useSelector(dashboardData);

  const [filterValue, setFilterValue] = useState<filterValueType>({ days:1, ticksize:600000});
  const [startDateValue, setStartDateValue] = useState<Dayjs>(dayjs());
  const [endDateValue, setEndDateValue] = useState<Dayjs>(dayjs());

  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    fetchData({id:detailDashboardId ? detailDashboardId :"", ticksize:3600000, filter:''});
  }, [detailDashboardId]);

  const fetchData = (queryData: GetDashboardByIdQuery) => {
    dispatch(getDashboardDetails(queryData));
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number, data: TabData) => {
    event.preventDefault();
    if(data.tabs_content === 'server_side'){
      dispatch(getDashboardDetails({id:detailDashboardId ? detailDashboardId : '', ticksize:3600000, filter:`&${data.name}=${data.tabs[newValue]}`}));
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
    const tickSize = checkIsLessThan24hrs(new Date(startDateValue?.format()), new Date(endDateValue?.format()))
    fetchData({id:detailDashboardId ? detailDashboardId :"", start:startTime.toString(), end:endTime.toString(), ticksize:tickSize ? 600000 : 3600000, filter:''});
  }

  const handleFilterChange = (event: SelectChangeEvent) => {
    
    const {value} = event.target;
    const tickSize = timeFrameOptions.find((item) => item.value === parseInt(value))?.ticksize || 36000000;
    setFilterValue((prev => {
      return {
      ...prev,
      days: parseInt(value),
      ticksize: tickSize || 3600000
      }
    }));

    const startTime = new Date(new Date().setDate(new Date().getDate() - parseInt(event.target.value))).getTime();
    const endTime = new Date(endDateValue?.format()).getTime();
    fetchData({id:detailDashboardId ? detailDashboardId :"", start:startTime.toString(), end:endTime.toString(), ticksize:tickSize, filter:''});
  };
  

  if (isLoading) {
    return <Loader/>
  }

  const renderLabels = (data: any) =>{  
    return (
      <Box display='flex' justifyContent='space-between'>
        <Box display='flex' alignItems='center'  gap={2}>
          <KeyboardBackspaceIcon onClick={()=>navigate(-1)} sx={{cursor:'pointer'}}/>
          <Typography fontSize={{xl:'24px', sm:'20px'}}>
              {data.name}
          </Typography>
          {data.tool_link && (
              <Tooltip title={data.tool_link} placement="top-start">
                <Box className="cursor-pointer" display='flex' alignItems={'center'}>
                    <OpenNew sx={{height:"30px", width:"30px"}} onClick={() => window.open(data.tool_link, '_blank')}/>
                </Box>
              </Tooltip>
          )}
        </Box>
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
      </Box>
    )
  }

  return (
    <>
      {(dashBoardDetails && Object.keys(dashBoardDetails).length <= 0) || !dashBoardDetails && (
        <Box sx={{height:{xs:`calc(100vh - 76px)`, sm: `calc(100vh - 84px)`}}} display='flex' justifyContent={'center'} alignItems='center'>
          <Typography variant='h4'>
            No Data Available
          </Typography>
        </Box>
      )}
      {dashBoardDetails && Object.keys(dashBoardDetails).length > 0 && (
        <Box padding={2}>
          <Box display='flex' gap={1} alignItems='center' mb={2}>
          </Box>
          <Box className="grid-container" sx={{minHeight:{xs:`calc(100vh - 76px)`, sm: `calc(100vh - 84px)`}}}>
            {dashBoardDetails?.widgets.map((widget: any, index: number)=>{
                return (
                    <CustomGrid  key={index} row={widget['row']} col={widget['col']} rowSpan={widget['size-y']} colSpan={widget['size-x']}>
                            {widget.directive_type === 'label' && renderLabels(widget)}
                            {widget.directive_type === 'table' && <RenderTableWidget data={ widget.chart?.table_datasets ? widget.chart.table_datasets[value] : widget}/>}
                            {widget.directive_type === 'tabs' && <RenderTabsWidget data={widget} selectedTabIndex={value} handleChange={handleChange}/>}
                    </CustomGrid>
                )
            })}
          </Box>
        </Box>
      )}
    </>
  )
}

export default DetailsPage