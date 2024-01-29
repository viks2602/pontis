import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomCard from "../../../../components/UI/card/Card";
import { globalCss } from "../../../../styles/muiCss";

import UserCard from "../../../../components/UI/card/UserCard";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getServerData,
  getServerDataFromApi,
} from "../../../../redux/slice/serverSlice";


import { constructServersDoughnutChartData } from "../../../../common/helperFunctions";
import DoughnutChart from "../../../../components/charts/doughnutChart/DoughnutChart";
import ServersTable from "../../../../components/tables/ServersTable";
import UserForm from "../../../../components/UI/forms/UserForm";
import ServerChoiceForm from "../../../../components/UI/forms/ServerChoiceForm";
import { getSeversApi } from "../../../../services/webApis/webApis";
import { Loader } from "../../..";

const ServersPage = () => {
  const [open, setOpen] = useState(false);
  const [serverData, setServerData] = useState<any>();
  const [totalGroups, setTotalGroups] = useState<string[]>([]);
  const [serverTypes, setServerTypes] = useState<any>();
  const [serverDoughnutChartData, setServerDoughnutChartData] = useState<any>();
  // const dispatch = useDispatch();
  // const {serverData}=useSelector(getServerData)

  // useEffect(() => {
  //   dispatch(getServerDataFromApi({item:""}) as any);
  // }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getTotalGroups = useCallback(() => {
    if (serverData) {
      const uniqueGroupsData = serverData.reduce(
        (accumulator: any, data: any) => {
          const groups = data.groups || [];
          groups.forEach((group: string) => {
            if (!accumulator.includes(group)) {
              accumulator.push(group);
            }
          });

          return accumulator;
        },
        []
      );
      setTotalGroups(uniqueGroupsData);
    }
  }, [serverData]);

  const getServerType = useCallback(() => {
    if (serverData) {
      const typeCountMap: { [type: string]: number } = {};

      serverData.forEach((data: any) => {
        const serverType = data.server_type;
        const type = serverType.type;
        typeCountMap[type] = (typeCountMap[type] | 0) + 1;
      });

      const typesArray = Object.entries(typeCountMap).map(([type, count]) => ({
        type,
        count,
      }));
      setServerTypes(typesArray);
    }
  }, [serverData]);

  const fetchServersData = async () => {
    const response = await getSeversApi(
      "id,connection_urls,server_type,status,disk,cpu,memory,hostname,description,groups,environment"
    );
    setServerData(await response.data);
  };

  useEffect(() => {
    fetchServersData();
  }, []);

  useEffect(() => {
    if (serverData) {
      getTotalGroups();
      getServerType();
    }
  }, [serverData]);



  useEffect(() => {
    if (serverTypes) {
      const labels = serverTypes.map((data: any) => data.type);
      const backgroundColors = ["#b7b1f9", "#4cd4ff", "#76d27f", "#face60"];
      const text1 = "Types";
      const data = constructServersDoughnutChartData(
        serverTypes,
        labels,
        backgroundColors,
        text1
      );
      setServerDoughnutChartData(data);
    }
  }, [serverTypes]);

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
            variant="contained"
            onClick={handleOpen}
            size="small"
            sx={{ color: "white", display: "flex", alignItems: "center" }}
          >
            <AddIcon />
            <Typography component="span" textTransform="capitalize">
              New Server
            </Typography>
          </Button>
          {open && (
            <ServerChoiceForm
                open={open}
                handleClose={handleClose}
                serverData={serverData}
            />
          )}
        </Box>
      </Box>
      <Grid container columnSpacing={2} direction={"column"}>
        <Grid item>
          <Box>
            <Typography fontSize={{ xl: "24px", sm: "20px", xs: "18px" }}>
              Servers
            </Typography>
          </Box>
        </Grid>
        <Grid item mt={2}>
          <Grid container columnSpacing={2} height={"auto"}>
            <Grid item lg={9} xs={12}>
              <Box>
                {serverData ? (
                  <CustomCard
                    sx={[{ ...globalCss.widgetCardContainer }, { p: "10px" }]}
                  >
                    {serverData && (
                      <ServersTable
                        serverData={serverData}
                        height={670}
                        totalGroups={totalGroups}
                        serverTypes={serverTypes}
                      />
                    )}
                  </CustomCard>
                ) : (
                  <Loader />
                )}
              </Box>
            </Grid>
            <Grid item lg={3} xs={12} sx={{ mt: { xs: 2, lg: 0 } }}>
              <Box
                height={"100%"}
                display={"flex"}
                flexDirection={"column"}
                gap={2}
              >
                <Box>
                  {serverData && (
                    <UserCard
                      type="totalservers"
                      title="Total Servers"
                      data={serverData.length}
                    />
                  )}
                </Box>
                <Box>
                  {totalGroups.length != 0 && (
                    <UserCard
                      type="groupserver"
                      title="Total Groups"
                      data={totalGroups.length}
                    />
                  )}
                </Box>
                <Box>
                  {serverDoughnutChartData && (
                    <CustomCard
                      sx={[
                        globalCss.widgetCardContainer,
                        {
                          boxShadow: "15px 20px 40px -32px rgba(208,242,254,1)",
                          border: "2px solid #d0f2fe",
                        },
                      ]}
                    >
                      <Box px={2}>
                        <Tooltip title={"Users in Groups"} arrow>
                          <Typography
                            width={"auto"}
                            className="text-overflow-ellipsis"
                            fontSize={{ xl: "20px", xs: "18px" }}
                            mr="8px"
                            mt={1}
                          >
                            Server Types
                          </Typography>
                        </Tooltip>
                        <Box>
                          <DoughnutChart data={serverDoughnutChartData} />
                        </Box>
                      </Box>
                    </CustomCard>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServersPage;
