import { LinearProgress, styled, linearProgressClasses } from "@mui/material";

export const BorderLinearProgress = styled(LinearProgress)(({theme,color}) => ({
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor:color
  },
}));
