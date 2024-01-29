import { Box, Card } from '@mui/material'

const CustomCard = ({ customChildrenStyle, children, sx} : any) => {
  return (
    <Card sx={sx} style={{borderRadius:'12px'}}>
        <Box sx={customChildrenStyle} height={'100%'}>
          {children}
        </Box>
    </Card>
  )
}

export default CustomCard;