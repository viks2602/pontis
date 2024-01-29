import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import CustomCard from '../../UI/card/Card';
import ViewMore from '../../UI/card/ViewMore';
import HorizontalBarChart from '../../charts/BarChart/HorizontalBarChart';
import Timeframe from '../../UI/timeframe/Timeframe';

import { dashboardData } from '../../../redux/slice/dashboardSlice';

import { Dataset2 } from '../../../interfaces/widgetInterface';

import { globalCss } from '../../../styles/muiCss';

const RenderHorizontalChart = ({data}: any) => {
  const {dashBoardDetails} = useSelector(dashboardData);

    return (
        <CustomCard sx={globalCss.widgetCardContainer}>
        <ViewMore view_more_link={data.view_more_link}>
          <Box padding={2} justifyContent={'space-between'} alignItems={'center'}>
            <Box display={'flex'} justifyContent={'space-between'}>
                 <Tooltip title={data.name} arrow>
                   <Typography width={'auto'} className='text-overflow-ellipsis' fontSize={{xl:'20px', sm:'18px'}} mr='8px'>{data.name}</Typography>
                 </Tooltip>
              <Box >
               {!dashBoardDetails?.type?.split(',').includes('historical') && <Timeframe title={data?.chart?.aggregate_health?.time_frame['type']}/>}
              </Box>
            </Box>
           
            <HorizontalBarChart data={data?.chart} />
            <Box display="flex" justifyContent={"center"} mt={2} gap={2}  flexWrap={'wrap'}/* width={'70%'} */>
              {data?.chart.datasets &&
                data?.chart.datasets.map((item:Dataset2, i: number) => {
                  return (
                    <Box
                      className="legend"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "5px",
                      }}
                      key={i}
                    >
                      <Box
                        className="dot"
                        style={{
                          backgroundColor:
                            item.backgroundColor,
                          height: "13px",
                          width: "13px",
                          borderRadius: "50%",
                        }}
                      ></Box>
                      <Typography component="span" className="label">
                        {item.label}
                      </Typography>
                    </Box>
                  );
                })}
            </Box>
          </Box>
          </ViewMore>
        </CustomCard>
      );
}

export default RenderHorizontalChart