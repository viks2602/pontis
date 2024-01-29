import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';

import { useAuth } from '../../../context/AuthHandler';

const Profile = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const auth=useAuth();
    const navigate = useNavigate();

    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
  return (
  <Box>
    <IconButton onClick={handleClick} sx={{
      backgroundColor:'#F2F9FF'
    }}>
     <PersonIcon sx={{
      width:{xl:40, sm:30},
      height:{xl:40, sm:30},
      color:'primary.main'
     }}/>
    </IconButton>
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={() => {
         auth?.logout()
         navigate("/");
      }} >
        Log out
      </MenuItem>
    </Menu>
  </Box>
  )
}

export default Profile