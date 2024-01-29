import { Link } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

import CustomCard from '../../UI/card/Card';
import ViewMore from '../../UI/card/ViewMore';
import Timeframe from '../../UI/timeframe/Timeframe';

import { mapIconToImageSource } from '../../../common/helperFunctions';

import { globalCss } from '../../../styles/muiCss';

export interface Item {
  name: string
  value: string
  statistic_icon: string
}

const RenderArrayData = ({data}: any) => {
  
    return (
        <CustomCard sx={globalCss.widgetCardContainer}>
          <ViewMore view_more_link={data.view_more_link}>
            <Box padding='20px 10px 10px 10px' display='flex' flexDirection='column' height={'100%'}>
                <Box display={'flex'} flex={0} justifyContent={'space-between'} alignItems={'center'} paddingX={2} >
                <Tooltip title={data.name} arrow>
                  <Typography className='text-overflow-ellipsis' fontSize={{xl:'20px', sm:'18px'}} mr='8px'>{data.name}</Typography>
                </Tooltip>
                  <Timeframe title={data?.chart?.aggregate_health?.time_frame['type']}/>
                  {data.view_more && <Link to={`/dashboard/details/${data.view_more_link}`}>View more</Link>}
                </Box>
                <Stack flex={1} /* minHeight={'100%'} */ justifyContent={'space-between'}>
                {
                  Array.isArray(data.chart.items) &&
                  data.chart.items.map((item:Item,index:number)=>{

                    const imgSrc = mapIconToImageSource(item.statistic_icon);

                    return (
                      <Box key={index} 
                        display='flex' 
                        justifyContent='space-between'
                        alignItems='center' 
                        gap={'16px'} alignContent='center' 
                        m={'20px 10px'}
                      >
                        <Box width='50%' overflow={'hidden'} display={'flex'} alignItems={'center'} gap={'8px'}>
                          <Box component={'img'} src={imgSrc} alt='Statistics Icon Image' draggable={false}></Box>
                          <Tooltip title={item.value} arrow>
                          <Typography className='text-overflow-ellipsis' fontSize={{xl:'20px', xs:'16px'}} fontWeight={500}>{item.value}</Typography>
                        </Tooltip>

                        </Box>
                        <Box width='50%' overflow={'hidden'}>
                        <Tooltip title={item.name} arrow>
                          <Typography className='text-overflow-ellipsis' component={'p'} color={'gray'}>{item.name}</Typography>
                        </Tooltip>
                        </Box>
                      </Box>
                    )
                  })
                }
                </Stack>
            </Box>
          </ViewMore>
        </CustomCard>
      )
}

export default RenderArrayData