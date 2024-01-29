
import { CircularProgressProps } from '@mui/material'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const CustomLoader = (props: CircularProgressProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
        <CircularProgress {...props} />
    </Box>
  )
}

export default CustomLoader