import { Link } from 'react-router-dom'

import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const RenderLabel = ({data}: any) => {

    return (
        <Box display='flex' justifyContent='space-between'  alignItems={'center'} m={'8px 0px 0px 0px'} >
            <Tooltip title={data.name}>
                <Typography className='text-overflow-ellipsis' fontSize={{xl:'24px', sm:'20px', xs:'18px'}}>
                    {data.name}
                </Typography>
            </Tooltip>
        {data.view_more && <Link to={`/dashboard/details/${data.view_more_link}`}>View more</Link>}
        </Box>
      )
}

export default RenderLabel