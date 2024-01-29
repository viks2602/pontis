import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { BorderLinearProgress } from "../../progressbar/BorderLinearProgressBar";

import { dashboardData } from "../../../redux/slice/dashboardSlice";

import SouthEastIcon from "@mui/icons-material/SouthEast";
import NorthWestIcon from "@mui/icons-material/NorthWest";

import { downLeft, downRight, downTop, slowLeft, slowRight, slowTop, upLeft, upRight, upTop } from "../../../assets/images";
import { getDownTimeCardColor } from "../../../common/helperFunctions";

type ServerPerformanceCardProps = {
  type: string;
  borderColor: string;
}

type DownTimeCardProps = {
  title: string;
  duration: string;
  serverType: string;
  timeFrameLabel:string
}

const ServerPerformanceCard = ({ type,  borderColor }: ServerPerformanceCardProps) => {

  return (
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "12px",
          border: `2px solid ${borderColor}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "3px 5px 3px 5px",
          ":hover": {
            cursor: "pointer",
          },
        }}
      >
        {type === "up" ? (
          <NorthWestIcon
            sx={{
              height: "15px",
            }}
          />
        ) : (
          <SouthEastIcon
            sx={{
              height: "15px",
            }}
          />
        )}

        <Typography
          sx={{
            fontSize: {xl:"15px", sm:'12px'},
          }}
        >
          {type}
        </Typography>
      </Box>
  );
};

const DownTimeCard = ({ title, duration, serverType, timeFrameLabel }:DownTimeCardProps) => {

  const {dashBoardDetails} = useSelector(dashboardData);

  const [assets, setAssets] = useState({
    img1: "",
    img2: "",
    img3: "",
    backgroundColor: "",
    borderColor: "",
    ProgressBarColor: "",
  });

  useEffect(() => {
    if (serverType === "down") {
      setAssets({
        img1:  downLeft,
        img2: downTop,
        img3: downRight,
        backgroundColor: "linear-gradient(145deg, #f8b397 20%, #f9c1b8 60%)",
        borderColor: "#FF6327",
        ProgressBarColor: "error",
      });
    } else if (serverType === "slow") {
      setAssets({
        img1:  slowLeft,
        img2: slowTop,
        img3: slowRight,
        backgroundColor: "linear-gradient(145deg,#fbdf96 20%,#fdefc5 60%)",
        borderColor: "#FFBE2B",
        ProgressBarColor: "warning",
      });
    } else {
      setAssets({
        img1: upLeft,
        img2: upTop,
        img3: upRight,
        backgroundColor: "linear-gradient(145deg,#62db6c 20%,#9BDFC4 60%)",
        borderColor: "#49C354",
        ProgressBarColor: "success",
      });
    }
  }, [serverType]);

  return (
    <Stack
      sx={{
        height: {xs:'145px',xl:"155px"},
        background: assets.backgroundColor,
        borderRadius: "15px",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <Box
        component="img"
        src={assets.img1}
        sx={{
          position: "absolute",
          bottom: "0",
          left: "0",
        }}
        alt=""
      />
      <Box
        component="img"
        src={assets.img2}
        sx={{
          position: "absolute",
          top: "0",
          right: "0",
        }}
        alt=""
      />
      <Box
        component="img"
        src={assets.img3}
        sx={{
          position: "absolute",
          bottom: "0",
          right: "0",
        }}
        alt=""
      />
      <Stack height="70%" width="80%" justifyContent="space-between" /* mb={2} */>
        <Stack
          width="100%"
          justifyContent="space-between"
          direction="row"
          alignItems="start"
        >
        <Tooltip title={title} arrow>
          <Typography  className='text-overflow-ellipsis' fontSize={{xl:'18px', sm:'14px'}}>{title}</Typography>
        </Tooltip>
          <ServerPerformanceCard
            type={serverType}
            borderColor={assets.borderColor}
          />
        </Stack>
        <Stack>
          <Box display={'flex'} alignItems={'center'}>
          <Tooltip title={duration} arrow>
           <Typography  className='text-overflow-ellipsis' fontSize={"1.5rem"} fontWeight={600}>{duration}</Typography>
          </Tooltip>

           {!dashBoardDetails?.type?.split(',').includes('historical') && <Typography fontSize={"10px"} ml={'10px'} color={'grey'} >{timeFrameLabel}</Typography>
            }
          </Box>
          <BorderLinearProgress
            variant="determinate"
            value={parseInt(duration.substring(0,3))}
            color={getDownTimeCardColor(assets.ProgressBarColor)}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DownTimeCard;
