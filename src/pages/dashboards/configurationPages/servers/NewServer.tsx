import { Box, Button, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { globalCss } from "../../../../styles/muiCss";

import React from "react";
import CustomCard from "../../../../components/UI/card/Card";
import MyForm from "./MyForm";
import NewServerForm from "../../../../components/UI/forms/NewServerForm/NewServerForm";

type Props = {};

const NewServer = (props: Props) => {
  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          fontSize={{ xl: "30px", md: "24px", xs: "22px" }}
          mb={1}
          fontWeight={500}
        >
          Administrator Panel
        </Typography>
      </Box>
      <Grid container columnSpacing={2} direction={"column"}>
        <Grid item mt={2}>
          <NewServerForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewServer;
