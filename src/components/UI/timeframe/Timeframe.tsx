import  Chip from '@mui/material/Chip'

import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Timeframe = ({title}:{title:string}) => {
  return (
    <Chip
     label={title}
     size="small"
     icon={<AccessTimeIcon />}
     sx={{
        width:{sm:'70px',md:'100px'},
        color:'grey',
        fontSize:'10px'
     }}
   />
  )
}

export default Timeframe