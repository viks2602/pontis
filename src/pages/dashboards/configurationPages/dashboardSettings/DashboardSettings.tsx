import { Box, Typography, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useLayoutEffect } from 'react';

const DashboardSettings = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  useEffect(()=>{
    if(pathname === '/dashboard/configuration/dashboards' || pathname === '/dashboard/configuration/dashboards/'){
      navigate('/dashboard/configuration/dashboards/list')
    }
  },[pathname, navigate]);

  return (
    <Box p={2}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography fontSize={{xl:"30px", md:'24px', xs:'22px'}} mb={1} fontWeight={500}>Administrator Panel</Typography>
        {pathname !== '/dashboard/configuration/dashboards/add-new' || 'dashboard/configuration/dashboards/edit-dashboard'  && <Box>
          <Button onClick={()=> navigate('add-new')} variant="contained" size="small" sx={{color:'white', display:'flex', alignItems:'center'}}><AddIcon /><Typography component='span' textTransform="capitalize">New Dashboard</Typography></Button>
        </Box>
        }
      </Box>
      <Outlet/>
    </Box>
  )
}

export default DashboardSettings