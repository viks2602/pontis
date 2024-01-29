import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";

import { Box } from '@mui/material'

import "react-toastify/dist/ReactToastify.css";

const ViewMore = ({ view_more_link,children } : {view_more_link:string, children:any}) => {

  const navigate = useNavigate()
  
  return (
    <Box  onDoubleClick={()=> {
        if(!view_more_link){
            toast.error("No Detail View Available", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
          }
          else{
              navigate(`/dashboard/details/${view_more_link}`)
          }
    }} sx={{cursor:'pointer'}} height={'100%'} display={'flex'} flexDirection={'column'}>
        {
         children
        }
    </Box>
  )
}

export default ViewMore