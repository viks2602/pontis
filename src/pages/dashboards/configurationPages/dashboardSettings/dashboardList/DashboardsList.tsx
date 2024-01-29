import React from 'react'
import { Box, Typography, Grid } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import DashboardsTable from '../../../../../components/tables/DashboardsTable';
import { Loader } from '../../../..';
import CustomCard from '../../../../../components/UI/card/Card';
import { GetDashboardByIdQuery } from '../../../../../interfaces/dashboardInterfaces';
import { dashboardData, getDashboardDetails } from '../../../../../redux/slice/dashboardSlice';
import { AppDispatch } from '../../../../../redux/store';
import { globalCss } from '../../../../../styles/muiCss';
import { constructDashboartTypeDoughnutChartData, mapImageToPAMSCard } from '../../../../../common/helperFunctions';
import { grayEllipseImage } from '../../../../../assets/images';
import DoughnutChart from '../../../../../components/charts/doughnutChart/DoughnutChart';

const DashboardsList = () => {

  const dispatch = useDispatch<AppDispatch>();
  const {dashBoardDetails, isLoading} = useSelector(dashboardData);

  const [doughnutChartData, setDoughnutChartData] = React.useState<any>(null);
  const [dashboardTypeData, setDashboardTypeData] =  React.useState<any>();
  const [dashboardTypeDoughnutChartData, setDashboardTypeDoughnutChartData] = React.useState<any>();
  const transformDoughnutChartData = React.useCallback(() => {
    if(dashBoardDetails){

      const typeCountMap: { [type: string]: number } = {
        "top-level":0,
        "historical":0,
        "detailed":0,
        "Other":0
      };
      const doughnutChartData: {[type:string] : number} = {};
      
      dashBoardDetails.forEach((data)=>{
        const dashboardType = data.type;

        if(dashboardType === 'top-level'){
          typeCountMap["top-level"] += 1
        }else if(dashboardType === 'historical'){
          typeCountMap.historical += 1
        }else if(dashboardType === 'detailed'){
          typeCountMap.detailed += 1
        }else{
          typeCountMap.Other += 1
        }
        const typesArray = Object.entries(typeCountMap).map(([type, count]) => ({
          type,
          count,
        }));
        setDashboardTypeData(typesArray)
      });

      const labels = Object.keys(doughnutChartData);
      const datasets = [{
            "label": "",
            "data": Object.values(doughnutChartData), 
            "backgroundColor": [
                "#49C354BF",
                "#00C6FFBF",
                "#9F97F7BF",
                "#FFBE2BBF",
            ],
            "borderColor": [
                "#49C354BF",
                "#00C6FFBF",
                "#9F97F7BF",
                "#FFBE2BBF",
            ],
            "cutout": "85%"
        }];

    const chartData = {
      "text_1": "Dashboard",
      "text_2": "Types",
      "totalTypes": Object.values(doughnutChartData).length,
      "labels" : labels,
      "datasets": datasets
    }
      
      setDoughnutChartData({chart:chartData});
    }

  },[dashBoardDetails , dashboardTypeData]);

  React.useEffect(()=>{
    if(dashboardTypeData){
      const labels = dashboardTypeData.map((data: any) => data.type);
        const backgroundColors = ["#b7b1f9", "#4cd4ff", "#76d27f", "#face60","#FA6240"];
        const text1 = "Dashboard";
        const text2 = "Types"
        const data = constructDashboartTypeDoughnutChartData(
          dashboardTypeData,
          labels,
          backgroundColors,
          text1, text2
        );
        setDashboardTypeDoughnutChartData(data);
    }
  },[dashboardTypeData,dashBoardDetails])

  React.useEffect(() => {
    fetchData({id:"", ticksize:3600000, filter:''});
  }, []);

  React.useEffect(()=>{
    transformDoughnutChartData();
  },[dashBoardDetails])

  const fetchData = (queryData: GetDashboardByIdQuery) => {
    dispatch(getDashboardDetails(queryData));
  };



  if (isLoading) {
    return <Loader/>
  }
 
  return (
    <Box>
      <Grid container columnSpacing={2}>
        <Grid item lg={8} xs={12}>
          <Typography fontSize={{xl:'24px', sm:'20px', xs:'18px'}}>Dashboards</Typography>
          <Box my={2}>
            <CustomCard sx={[ {...globalCss.widgetCardContainer}, {p:'10px'},]}>
            <Typography fontSize={{xl:'18px', sm:'16px', xs:'14px'}}>All Dashboards</Typography>
              <Box m={2}>
                <DashboardsTable isLoading={isLoading} dashboardsArray={dashBoardDetails} fetchData={fetchData} />
              </Box>
            </CustomCard>
          </Box>
        </Grid>
        <Grid item lg={4} xs={12}>
        <Box my={7} display="flex" flexDirection="column" gap={4} >
            <Box
              flex={1}
              padding={2}
              sx={globalCss.widgetCardContainer}
              position="relative"
              overflow="hidden"
              borderRadius={"12px"}
              height={"100px"}

            >
              <Box
                display="flex"
                alignItems="center"
                position="relative"
                columnGap={2}
                height={"100%"}
              >
               
                <Box my={1} mx={2}>
                <Typography fontSize={{ xl: "18px", sm: "16px", xs: "14px" }}>
                Total Dashboards
              </Typography>
                <Typography fontSize={"2.125rem"} fontWeight={600}>
                    {dashBoardDetails?.length}
                  </Typography>

                </Box>
              </Box>
              <Box
                component="img"
                src={mapImageToPAMSCard(1)}
                position="absolute"
                zIndex={-1}
                bottom={0}
                right={0}
              />
              <Box
                component="img"
                src={grayEllipseImage}
                position="absolute"
                zIndex={-1}
                top={8}
                right={0}
              />
            </Box>
            <CustomCard   sx={[{ ...globalCss.widgetCardContainer }, { p: "10px" }]}
>           
          <Box m={2}>
            <Typography fontSize={{ xl: "18px", sm: "16px", xs: "14px" }}>
              Types of Dashboards
            </Typography>
            { dashboardTypeDoughnutChartData && <DoughnutChart data={dashboardTypeDoughnutChartData}/>}
          </Box>
            </CustomCard>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DashboardsList;