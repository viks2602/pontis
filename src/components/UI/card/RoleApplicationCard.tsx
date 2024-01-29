import { useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import { mapIconToRoleAndApplicationImage } from '../../../common/helperFunctions'

const MainCard=({data}: any)=>{
    
    return (
        <Box height={'118px'} maxWidth={'100%'} display={'flex'} >
            <Box height={'100%'} width={'30%'}  display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Box component={'img'} height={'70px'} src={mapIconToRoleAndApplicationImage(data?.id)}></Box>
            </Box>
            <Box height={'100%'} width={'70%'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'start'}>
                <Tooltip title={data.name} arrow>
                 <Typography   className='text-overflow-ellipsis' maxWidth={'150px'} sx={{fontSize:'14px'}}>{data.name}</Typography>
                </Tooltip>
                <Tooltip title={data.chart.number} arrow>
                 <Typography  className='text-overflow-ellipsis' sx={{fontSize:'34px',fontWeight:600}}>{data.chart.number}</Typography>
                </Tooltip>

                <Box display={'flex'} flexDirection={'row'} gap={2}>
                 <Tooltip title={data.chart.percent} arrow>
                  <Typography  className='text-overflow-ellipsis'  sx={{fontSize:'12px',color:data.chart.percent<0?'rgba(176, 11, 67, 1)':'rgba(39, 174, 96, 1)'}}>{data.chart.percent}%</Typography>
                </Tooltip>
                <Tooltip title={data?.chart?.aggregate_health?.time_frame['type']} arrow>
                  <Typography  className='text-overflow-ellipsis' sx={{fontSize:'12px',color:'gray'}}>{data?.chart?.aggregate_health?.time_frame['type']}</Typography>
                </Tooltip>

                </Box>
            </Box>
        </Box>
    )
}

const CardHolder=({data}: any)=>{
       return (
        <Box width={'100%'} >
            <Box width={'100%'}  justifyContent={'space-around'} flexDirection={'column'}>          
              <MainCard data={data}/>
            </Box>
        </Box>
       )
}

const RoleApplicationCard = ({cardData}:any) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Box sx={{
      
        width:'100%',
        display:'flex',
        justifyContent:'space-around',
        paddingY:2,
        gap:2
    }}>
        <Grid container columnSpacing={1}>
            {cardData.map((card:any,i:number)=>(
                <Grid key={i} item lg={3} sm={6} xs={12} display={{xs:"initial",sm:'flex'}}>
                    <CardHolder data={card}/>
                    {isMobile && <Divider orientation='horizontal' flexItem sx={{margin:2,borderBottomWidth: 2}}/> }
                   {!isMobile && <Divider orientation="vertical"  flexItem sx={{margin:2,borderRightWidth: 3,display:{xs:'flex',sm:i%2!=0?'none':'flex',lg:i==3?'none':'flex'}}}/>}
                </Grid>
            ))}
        </Grid>
    </Box>
  )
}

export default RoleApplicationCard