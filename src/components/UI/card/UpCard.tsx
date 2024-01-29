import { Box, Button, Stack, Typography } from '@mui/material'
import { fullcapacity_down, fullcapacity_top, group } from '../../../assets/images'
import { useNavigate } from 'react-router-dom'

const UpCard = ({navigatelink}:{navigatelink:string}) => {

 const navigate=useNavigate()
  return (
    <Box height={'500px'} width={'100%'} sx={{
        backgroundColor:'secondary.main',
        borderRadius:'15px',
        position:'relative',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }}>
        <Box component={'img'} src={fullcapacity_down} alt='Up Card Image' draggable={false} sx={{
            position:'absolute',
            left:0,
            bottom:0
        }}></Box>
        <Box component={'img'} draggable={false} alt='Up Card Image' src={fullcapacity_top} sx={{
            position:'absolute',
            right:0,
            top:0
        }}></Box>
        <Box sx={{
            height:'50%',
            width:'80%',
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between'
        }}>
          <Stack direction={{xs:'column',lg:'row'}} alignItems={'center'}>
            <Typography variant='h3' color={'white'}>The environment is running at full capacity</Typography>
            <Box component={'img'} display={{xs:'none',md:'flex'}} alt='Up Card Image' src={group} height={'81px'}  marginY={"20px"}></Box>
          </Stack>
          <Button sx={{
            color:'black',
            backgroundColor:'white',
            width:'120px',
            borderRadius:'30px',
            ":hover":{
                color:'black',
                backgroundColor:'white',
            }
          }} onClick={()=> navigate(`/dashboard/details/${navigatelink}`)}>View More</Button>
        </Box>
       

    </Box>
  )
}

export default UpCard