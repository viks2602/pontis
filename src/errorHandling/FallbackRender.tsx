import { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function FallbackRender({  resetErrorBoundary }:FallbackProps) {
  const navigate = useNavigate();

  return (
    <Box role="alert" display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
      <Stack textAlign='center' alignItems='center' gap={2} maxWidth={'600px'}>
        <Typography variant="h3">Woops!</Typography>
        <Typography variant="h3">Something went wrong :(</Typography>
        <Box display='flex' gap={2}>
          <Button sx={{}} variant="outlined" onClick={resetErrorBoundary}>Reload page</Button>
          <Button sx={{}} variant="contained" onClick={()=>navigate(-1)}>GO BACK</Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default FallbackRender