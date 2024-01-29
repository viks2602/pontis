import { Box, Typography } from "@mui/material";
import React from "react";
import {
  groupIconImage,
  groupServer,
  totalServer,
  userEclipse1,
  userEclipse2,
  userIconImage,
} from "../../../assets/images";


const UserCard = ({
  type,
  title,
  data,
}: {
  type: string;
  title: string;
  data: number;
}) => {
  const userCardIcon =
    type === "users"
      ? userIconImage
      : type === "totalservers"
      ? totalServer
      : type === "groupserver"
      ? groupServer
      : groupIconImage;

  return (
    <Box
      height={"150px"}
      width={"100%"}
      borderRadius={"10px"}
      border={"2px solid #d0f2fe"}
      position={"relative"}
      overflow={"hidden"}
      boxShadow={" 15px 20px 40px -32px rgba(208,242,254,1)"}
    >
      <Box
        component={"img"}
        draggable={false}
        src={userEclipse1}
        position={"absolute"}
        sx={{ right: 0 }}
        zIndex={"-1000"}
      ></Box>
      <Box
        component={"img"}
        draggable={false}
        src={userEclipse2}
        position={"absolute"}
        sx={{ bottom: 0 }}
        zIndex={"-1000"}
      ></Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          p: 1,
        }}
      >
        <Box>
          <Typography sx={{ fontSize: "20px" }}>{title}</Typography>
          <Typography sx={{ fontWeight: 500, fontSize: "34px" }}>
            {data}
          </Typography>
        </Box>
        <Box>
          <Box component={"img"} src={userCardIcon} alt="" />
        </Box>
      </Box>
    </Box>
  );
};

export default UserCard;
