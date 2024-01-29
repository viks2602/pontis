import { Link } from 'react-router-dom'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import DownTimeCard from '../../UI/card/DownTimeCard'
import ViewMore from '../../UI/card/ViewMore'
import UpCard from '../../UI/card/UpCard'

import { Item } from '../../../interfaces/widgetInterface'

import { sortDownTimeArrayByStatus } from '../../../common/helperFunctions'


const RenderCardArray = ({data}:any) => {

   const sortedData = sortDownTimeArrayByStatus(data?.chart?.items);

    return (
        <>
          <Box display='flex' justifyContent='space-between'  alignItems={'center'} mb={'0px'} /*  mt={1} */ /* border={'1px solid red'}  */padding={'10px 0px'}>
          <Typography fontSize={{xl:'24px', sm:'20px'}}>
            {data.name}
          </Typography>
          {data.view_more && <Link to={`/dashboard/details/${data.view_more_link}`}>View more</Link>}
          </Box>
          {
             sortedData.length==0 || sortedData[0].status==='up'  ? <UpCard navigatelink={data.view_more_link}/> :<>
            <Grid container columnSpacing={2} rowSpacing={3} >
            {sortedData.map((item:Item, index:number) => {
              return (       
                <Grid key={index} item sm={6} xs={12}>
                  <ViewMore view_more_link={data.view_more_link}>
                    <DownTimeCard title={item.name} duration={item.down_time} serverType={item.status} timeFrameLabel={data?.chart?.aggregate_health?.time_frame['type']}/>
                  </ViewMore>
                </Grid>
              )
            })}
          </Grid>
            </>
          }
       </>
       
      )
}

export default RenderCardArray