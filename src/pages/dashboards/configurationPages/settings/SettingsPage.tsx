import { Box, Button, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useEffect, useState } from "react";
import CustomCard from "../../../../components/UI/card/Card";
import MetadataTable from "../../../../components/tables/MetadataTable";
import { globalCss } from "../../../../styles/muiCss";

import { getMetadataTypesApi } from "../../../../services/webApis/webApis";
import NewSetting from "../../../../components/UI/forms/NewSetting";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const [metaDataTypes, setMetaDatTypes] = useState<any>();
  const [open, setOpen] = useState(false);
  const navigate=useNavigate();
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getMetaDataTypes = async () => {
    const response = await getMetadataTypesApi();
    setMetaDatTypes(response.data.types);
  };
  useEffect(() => {
    getMetaDataTypes();
  }, []);

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
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
        >
          <Button
            onClick={handleOpen}
            variant="outlined"
            size="small"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <AddIcon />
            <Typography component="span" textTransform="capitalize">
              New Settings
            </Typography>
          </Button>

          {open && <NewSetting open={open} handleClose={handleClose} getMetaDataTypes={getMetaDataTypes}/>}

          <Button
            onClick={()=>navigate("metadata")}
            variant="contained"
            size="small"
            sx={{ color: "white", display: "flex", alignItems: "center" }}
          >
            <AddIcon />
            <Typography component="span" textTransform="capitalize">
              New Metadata
            </Typography>
          </Button>
        </Box>
      </Box>
      <Box>
        <Typography fontSize={{ xl: "24px", sm: "20px", xs: "18px" }}>
          Settings
        </Typography>
      </Box>
      <Grid container columnSpacing={2} mt={2}>
        <Grid item lg={9} md={9} sm={12} xs={12}>
          {metaDataTypes && (
            <CustomCard
              sx={[{ ...globalCss.widgetCardContainer }, { p: "10px" }]}
            >
              <MetadataTable metaDataTypes={metaDataTypes} />
            </CustomCard>
          )}
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <Box height={"100%"} border={"1px solid red"}></Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsPage;
