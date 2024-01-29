import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

import { useSelector } from 'react-redux';
import { dashboardData } from '../../../redux/slice/dashboardSlice';

import { failureDown, failureUp } from '../../../assets/images';

type Props = {
  name:string,
  number:string,
  percent:number,
  id:string,
  timeLabel: string
}

const FailureIssueCard = ({name,number,percent,id, timeLabel}:Props) => {

  const {dashBoardDetails} = useSelector(dashboardData);

  const getIcon = (iconId: string) => {
    if(iconId === 'iamadmin-ticket') {
      return <ConfirmationNumberOutlinedIcon sx={{ color: 'primary.main', fontSize: '40px' }} />
    }else if(iconId === 'iamadmin-audit') {
      return <SummarizeOutlinedIcon sx={{ color: 'primary.main', fontSize: '40px' }} />
    }else if(iconId === 'iamadmin-transaction') {
      return <AccountBalanceWalletOutlinedIcon sx={{ color: 'primary.main', fontSize: '40px' }} />
    }else{
      return null
    }
  }
  return (
    <Stack sx={{
        height: {xs:'130px',md:'120px',xl:"135px"},
        borderRadius:'15px',
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        boxShadow: '10px 10px 21px -3px #dbe7ee',
    }}>
        <Box component='img' src={failureDown} alt="Failure Down Image" style={{
          position:'absolute',
          left:0,
          bottom:0,
         
        }}/>
        <Box component='img' src={failureUp} alt="Failure Down Image" style={{
          position:'absolute',
          top:0,
          right:0
        }}/>
        <Stack sx={{
          height:'70%',
          width:'80%',
          zIndex:1,
          justifyContent:'space-between'
        }} >
         <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Tooltip title={name} arrow>
            <Typography className='text-overflow-ellipsis' width={'auto'} fontSize={'1.2rem'}>{name}</Typography>
          </Tooltip>
          {getIcon(id)}
         </Stack>
         <Typography fontSize={'1.8rem'} fontWeight={'bold'}>{number}</Typography>
         <Stack direction='row'  alignItems={'center'} >
          <Typography sx={{
             color: percent < 0 ? 'red' : 'green',
             fontSize: '0.9rem'
           }}
            fontFamily={'roboto'}
           >{percent < 0 ? `${percent}%` : `+${percent}%`}</Typography>
            {!dashBoardDetails?.type?.split(',').includes('historical') && 
            <Typography 
              className='text-overflow-ellipsis'
              sx={{
              color:'grey',
              fontSize:'10px',
              ml:'10px',
            }}>{timeLabel}</Typography>}
          
         </Stack>
        </Stack>
    </Stack>
  )
}

export default FailureIssueCard