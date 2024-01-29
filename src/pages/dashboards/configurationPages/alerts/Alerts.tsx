import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Divider,
  Grid,
  Tab,
  Tabs,
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';

import CustomCard from "../../../../components/UI/card/Card";
import { globalCss } from '../../../../styles/muiCss';
import AlertsTable from "../../../../components/tables/AlertsTable";
import { useDispatch, useSelector } from 'react-redux';
import { alertsData, getAlertsData, setAlertsFilteredData } from "../../../../redux/slice/alertSlice";
import AlertForm from "../../../../components/UI/forms/AlertForm";
import { getSessionStorageData } from "../../../../common/helperFunctions";
import { getServerDataFromApi } from "../../../../redux/slice/serverSlice";
import { getAlertTemplateDataFromApi } from "../../../../redux/slice/alertTemplateSlice";
import { number_of_roles_img, roles_removed_img } from "../../../../assets/images";
import AlertlogsTable from "../../../../components/tables/AlertlogsTable";

const Alerts = () => {
  const [open, setOpen] = React.useState(false);
  const [alertsType, setAlertType] = React.useState<string>("User");

  const dispatch = useDispatch();
  const {
    isLoading,
    alertsData: alertsArray,
    alertFilteredData,
  } = useSelector(alertsData);

  React.useEffect(() => {
    if (alertsArray) {
      filterAlertsByType("User");
    }
  }, [alertsArray]);

  React.useEffect(() => {
    dispatch(getAlertsData() as any);
    dispatch(getServerDataFromApi({ item: "static_data" }) as any);
    dispatch(getAlertTemplateDataFromApi() as any);
  }, [dispatch]);

  const handleOpen = () => setOpen(true);

  function filterAlertsByType(type: string) {
    if (type === "User") {
      const filteredData = alertsArray?.alerts.filter((alert) => {
        return alert.alertType === "User";
      });
      dispatch(setAlertsFilteredData(filteredData));
    } else if (type === "System") {
      const filteredData = alertsArray?.alerts.filter((alert) => {
        return alert.alertType === "System";
      });
      dispatch(setAlertsFilteredData(filteredData));
    } else if (type === "Own") {
      const filteredData = alertsArray?.alerts.filter((alert) => {
        return alert.owner.user_id === getSessionStorageData()?.userName;
      });
      dispatch(setAlertsFilteredData(filteredData));
    }
  }

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
        <Box>
          <Button
            onClick={handleOpen}
            variant="contained"
            size="small"
            sx={{ color: "white", display: "flex", alignItems: "center" }}
          >
            <AddIcon />
            <Typography component="span" textTransform="capitalize">
              New Alert
            </Typography>
          </Button>
        </Box>
      </Box>
      <Grid container columnSpacing={2}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography fontSize={{ xl: "24px", sm: "20px", xs: "18px" }}>
            Alerts
          </Typography>
          <Box my={2}>
            <CustomCard
              sx={[
                { ...globalCss.widgetCardContainer },
                { p: "10px", height: "auto" },
              ]}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Box>
                  <Tabs
                    value={alertsType}
                    onChange={(
                      event: React.SyntheticEvent,
                      newValue: string
                    ) => {
                      setAlertType(newValue);
                      filterAlertsByType(newValue);
                    }}
                    aria-label="alert-types-tabs"
                  >
                    <Tab label="User" value="User" />
                    <Tab label="System" value="System" />
                  </Tabs>
                </Box>
                <div>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ color: "#ffffff" }}
                    onClick={() => filterAlertsByType("Own")}
                  >
                    Show only your Alerts
                  </Button>
                </div>
              </Box>
              <Box>
                <AlertsTable
                  isLoading={isLoading}
                  alertsArray={alertFilteredData}
                />
              </Box>
            </CustomCard>
          </Box>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box
            my={7}
            display="flex"
            flexDirection="column"
            gap={2}
            maxWidth={"100%"}
          >
            <CustomCard
              sx={[{ ...globalCss.widgetCardContainer }, { p: "10px" }]}
            >
              <Box display="flex" my={3}>
                <Box
                  height={"100%"}
                  width={"30%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Box
                    component={"img"}
                    height={"70px"}
                    src={number_of_roles_img}
                  ></Box>
                </Box>
                <Box
                  height={"100%"}
                  width={"70%"}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"start"}
                  mx={1}
                >
                  <Typography
                    className="text-overflow-ellipsis"
                    maxWidth={"150px"}
                    sx={{ fontSize: "14px" }}
                  >
                    Your Alerts
                  </Typography>
                  <Typography
                    className="text-overflow-ellipsis"
                    sx={{ fontSize: "34px", fontWeight: 600 }}
                  >
                    8
                  </Typography>
                  <Typography
                    className="text-overflow-ellipsis"
                    sx={{ fontSize: "12px", color: "gray" }}
                  >
                    Since 6 months
                  </Typography>
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ m: 1, borderWidth: 2 }}
                />

                <Box
                  height={"100%"}
                  width={"30%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {/* <Box component={"img"} height={"70px"} src={warning}></Box> */}
                </Box>
                <Box
                  height={"100%"}
                  width={"70%"}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"start"}
                  mx={1}
                >
                  <Typography
                    className="text-overflow-ellipsis"
                    maxWidth={"150px"}
                    sx={{ fontSize: "14px" }}
                  >
                    Warnings
                  </Typography>
                  <Typography
                    className="text-overflow-ellipsis"
                    sx={{ fontSize: "34px", fontWeight: 600 }}
                  >
                    15
                  </Typography>
                  <Typography
                    className="text-overflow-ellipsis"
                    sx={{ fontSize: "12px", color: "gray" }}
                  >
                    Since 6 months
                  </Typography>
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ m: 1, borderWidth: 2 }}
                />

                <Box
                  height={"100%"}
                  width={"30%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Box
                    component={"img"}
                    height={"70px"}
                    src={roles_removed_img}
                  ></Box>
                </Box>
                <Box
                  height={"100%"}
                  width={"70%"}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"start"}
                  mx={1}
                >
                  <Typography
                    className="text-overflow-ellipsis"
                    maxWidth={"150px"}
                    sx={{ fontSize: "14px" }}
                  >
                    Critical
                  </Typography>
                  <Typography
                    className="text-overflow-ellipsis"
                    sx={{ fontSize: "34px", fontWeight: 600 }}
                  >
                    5
                  </Typography>
                  <Typography
                    className="text-overflow-ellipsis"
                    sx={{ fontSize: "12px", color: "gray" }}
                  >
                    Since 6 months
                  </Typography>
                </Box>
              </Box>
            </CustomCard>
            <CustomCard
              sx={[{ ...globalCss.widgetCardContainer }, { p: "10px" }]}
            >
              <Typography
                fontSize={{ xl: "20px", sm: "18px", xs: "16px" }}
                my={2}
              >
                Alert Logs
              </Typography>
              <Box>
                <AlertlogsTable
                  isLoading={isLoading}
                  alertsArray={alertFilteredData}
                />
              </Box>
            </CustomCard>
          </Box>
        </Grid>
      </Grid>
      {open && <AlertForm type="ADD" open={open} setOpen={setOpen} />}
    </Box>
  );
};


export default Alerts