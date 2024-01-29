import React from "react";

import { useSelector } from "react-redux";

import { Box, Tooltip, Typography } from "@mui/material";

import CustomCard from "../../UI/card/Card";
import ViewMore from "../../UI/card/ViewMore";
import RenderGraphSelect from "../renderGraphSelect/RenderGraphSelect";
import Timeframe from "../../UI/timeframe/Timeframe";
import RenderTabsWidget from "../renderTabsWidget/RenderTabsWidget";
import MultipleBarStackedBarChart from "../../charts/multipleBarStackedBarChart/MultipleBarStackedBarChart";
import MultiBarStackedBarLegends from "../../charts/chart-legends/MultiBarStackedBarLegends";

import { dashboardData } from "../../../redux/slice/dashboardSlice";
import { Dataset2 } from "../../../interfaces/widgetInterface";

import { globalCss } from "../../../styles/muiCss";


interface Props {
  data: any
}

const RenderMultiBarStackedBarChartWidget = ({
  data
}: Props) => {
  const {dashBoardDetails} = useSelector(dashboardData);

  const chartContainerRef = React.useRef<HTMLElement|null>(null);
  const headerRef = React.useRef<HTMLElement|null>(null);
  const footerRef = React.useRef<HTMLElement|null>(null);

  const [height, setHeight] = React.useState(220);
  const [chartData, setChartData] = React.useState<any>(data.chart?.tabs ? data.chart?.items[0] : data);
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
  
  const [optionIndex, setOptionIndex] = React.useState(0);
  const [graphFilterValue, setGraphFilterValue] = React.useState("");

  const handleChange = (event:React.ChangeEvent<HTMLSelectElement>, options:Dataset2[]) => {
    event.stopPropagation();

    setGraphFilterValue(event.target.value);
    setOptionIndex(options.findIndex((option:Dataset2) => option.label === event.target.value));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setSelectedTabIndex(newValue);  
    setChartData(data.chart?.items[newValue])
  }


  React.useEffect(()=>{
   setTimeout(() => {
    if(chartContainerRef.current && headerRef.current && footerRef.current){
      setHeight(chartContainerRef.current?.clientHeight - (headerRef.current.clientHeight + footerRef.current.clientHeight));
    }
   }, 0.01);
  },[data]);

    return (
        <CustomCard sx={globalCss.widgetCardContainer}>
          <ViewMore view_more_link={data.view_more_link}>
            <Box padding={'20px 10px 10px 10px'} height={'100%'}  ref={chartContainerRef}>
              <Box width={'100%'} display={'flex'} justifyContent={'center'} ref={headerRef}>
                <Box mb={2} width={'97%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                {!data.chart.tabs ? <Tooltip title={data.name} arrow>
                   <Typography width={'auto'} className='text-overflow-ellipsis' fontSize={{xl:'20px', sm:'18px'}} mr='8px'>{data.name}</Typography>
                 </Tooltip> : 
                  data.chart.tabs && <RenderTabsWidget data={data.chart} selectedTabIndex={selectedTabIndex} handleChange={handleTabChange}/>
                 }
                <Box >
                {!dashBoardDetails?.type?.split(',').includes('historical') && <Timeframe title={data?.chart?.aggregate_health?.time_frame['type']}/>}
                {chartData?.filter &&  <RenderGraphSelect value={graphFilterValue} handleChange={handleChange} options={chartData?.chart?.datasets}/>}
                </Box>
              </Box>
              </Box>
              <MultipleBarStackedBarChart
                labels={chartData?.chart?.labels}  
                datasets={chartData ? chartData.filter ? [chartData?.chart?.datasets[optionIndex]] : chartData?.chart?.datasets : data.chart.datasets} 
                height={height} 
                x_axis_title={data?.chart?.x_axis_title} 
                y_axis_title={data?.chart?.y_axis_title}
                legend={data.legends}
                xAxisTicks={data.chart.ticks}
              />
            <Box ref={footerRef} display={"flex"} justifyContent={"center"}>
              {data?.legends && <MultiBarStackedBarLegends data={data.chart.legends_categories} />}
            </Box>
        </Box>
      </ViewMore>
    </CustomCard>
  );
};

export default RenderMultiBarStackedBarChartWidget;
