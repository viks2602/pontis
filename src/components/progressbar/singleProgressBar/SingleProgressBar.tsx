import { linearProgressClasses, styled } from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function SingleProgressBars({color, value}: {color:'string', value: number}) {
  
    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 5,
          backgroundColor: color,
        },
      }));
      
    return (
      <Box sx={{ flexGrow: 1 }} mt={1}>
        <BorderLinearProgress variant="determinate" value={value} />
      </Box>
    );
  }