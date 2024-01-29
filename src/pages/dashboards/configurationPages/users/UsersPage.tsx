import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomCard from "../../../../components/UI/card/Card";
import { globalCss } from "../../../../styles/muiCss";
import React, { useEffect, useState } from "react";
import {
  getGroupsApi,
  getUsersApi,
} from "../../../../services/webApis/webApis";
import UsersTable from "../../../../components/tables/UsersTable";
import UserCard from "../../../../components/UI/card/UserCard";
import DoughnutChart from "../../../../components/charts/doughnutChart/DoughnutChart";
import {  constructUsersDoughnutChartData } from "../../../../common/helperFunctions";
import {
  ICreateUserInterface,
  IUserGroupsCount,
} from "../../../../interfaces/usersInterface";

import { Loader } from "../../..";
import UserForm from "../../../../components/UI/forms/UserForm";
import { useDispatch } from "react-redux";
import { getGroupsDataFromApi } from "../../../../redux/slice/groupsSlice";

const UsersPage = () => {
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = useState<ICreateUserInterface[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [totalUser, setTotalUser] = useState<number>(0);
  const [totalGroups, setTotalGroups] = useState<number>(0);
  const [doughnutChartData, setDoughnutChartData] = useState<any>();
  const [userGroupsCounts, setUserGroupsCounts] = useState<IUserGroupsCount>({
    fullAdmin: 0,
    dashboardAdmin: 0,
    reportsUser: 0,
    others: 0,
    none: 0,
  });

  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getUserAndGroupsDetails = async () => {
    const userResponse = await getUsersApi();
    setUsers(await userResponse.data.users);
    setTotalUser(await userResponse.data.users.length);

    const groupResponse = await getGroupsApi();
    setTotalGroups(await groupResponse.data.groups.length);
    setLoading(true);
  };

  React.useEffect(() => {
    getUserAndGroupsDetails();
  }, []);

  React.useEffect(() => {
    if (users) {
      const counts = {
        fullAdmin: 0,
        dashboardAdmin: 0,
        reportsUser: 0,
        others: 0,
        none: 0,
      };

      users.forEach((user) => {
        if (user.groupMemberships.includes("fulladmin")) {
          counts.fullAdmin += 1;
        }

        if (user.groupMemberships.includes("dashboardadmin")) {
          counts.dashboardAdmin += 1;
        }

        if (user.groupMemberships.includes("reportsuser")) {
          counts.reportsUser += 1;
        }

        if (
          !user.groupMemberships.includes("fulladmin") &&
          !user.groupMemberships.includes("dashboardadmin") &&
          !user.groupMemberships.includes("reportsuser") &&
          user.groupMemberships.length != 0
        ) {
          counts.others += 1;
        }

        if (user.groupMemberships.length === 0) {
          counts.none += 1;
        }
      });
      setUserGroupsCounts(counts);
    }

    dispatch(getGroupsDataFromApi() as any);
  }, [users,dispatch]);

  console.log(doughnutChartData)

  useEffect(() => {
    if (totalGroups) {
      const chartData = constructUsersDoughnutChartData(
        userGroupsCounts,
        ["fullAdmin", "dashboardAdmin", "reportsUser", "none", "others"],
        totalGroups
      );
      setDoughnutChartData(chartData);
    }
  }, [userGroupsCounts, totalGroups]);

  return (
    <>
      {!loading ? (
        <Loader />
      ) : (
        <Box sx={{ p: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
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
                  New User
                </Typography>
              </Button>
              {open && (
                <UserForm type="ADD" open={open} handleClose={handleClose}   getUserAndGroupsDetails={getUserAndGroupsDetails} />
              )}
            </Box>
          </Box>
          <Grid container columnSpacing={2} direction={"column"}>
            <Grid item>
              <Box>
                <Typography fontSize={{ xl: "24px", sm: "20px", xs: "18px" }}>
                  Users
                </Typography>
              </Box>
            </Grid>
            <Grid item mt={2}>
              <Grid container columnSpacing={2} height={"auto"}>
                <Grid item lg={9} xs={12}>
                  <Box>
                    <CustomCard
                      sx={[{ ...globalCss.widgetCardContainer }, { p: "10px" }]}
                    >
                      <Box py={2} display="flex" justifyContent="space-between">
                        <Typography
                          fontSize={{ xl: "20px", sm: "18px" }}
                          fontWeight={400}
                        >
                          All Users in Environment
                        </Typography>
                      </Box>
                      <Box>
                        {users && <UsersTable users={users} height={710} getusers={getUserAndGroupsDetails} />}
                      </Box>
                    </CustomCard>
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
                      {!!totalUser && (
                        <UserCard
                          type="users"
                          title="Total Users"
                          data={totalUser}
                        />
                      )}
                    </Box>
                    <Box>
                      {!!totalGroups && (
                        <UserCard
                          type="groups"
                          title="Total Groups"
                          data={totalGroups}
                        />
                      )}
                    </Box>
                    <Box>
                      {doughnutChartData && (
                        <CustomCard
                          sx={[
                            globalCss.widgetCardContainer,
                            {
                              boxShadow:
                                "15px 20px 40px -32px rgba(208,242,254,1)",
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
                                Users in Groups
                              </Typography>
                            </Tooltip>
                            <Box>
                              {doughnutChartData && (
                                <DoughnutChart data={doughnutChartData} />
                              )}
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
      )}
    </>
  );
};

export default UsersPage;