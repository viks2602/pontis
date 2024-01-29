import { Box, Button, Chip, Grid, Tab, Tabs, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ServerChoiceForm from "../../../../components/UI/forms/ServerChoiceForm";
import { useEffect, useState } from "react";
import {
  getServerByServerIdApi,
  getSeversApi,
} from "../../../../services/webApis/webApis";
import ServerCertificate from "./components/ServerCertificate";
import CustomCard from "../../../../components/UI/card/Card";
import { globalCss } from "../../../../styles/muiCss";
import { Loader } from "../../..";
import { useNavigate } from "react-router-dom";


import ServerDoughnutChart from "../../../../components/charts/doughnutChart/ServerDoughnutChart";
import CertificatesCard from "../../../../components/UI/card/CertificatesCard";
import WifiIcon from "@mui/icons-material/Wifi";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PowerIcon from "@mui/icons-material/Power";
import { isAllRespondingPingPort, isAllRespondingTransactions } from "../../../../common/helperFunctions";
import { serverIcon } from "../../../../assets/images";
import ServerData from "./components/ServerData";
type Props = {};
const commonTitleTypographyStyle = {
  fontSize: { xl: "14px" },
  color: "#979797",
};
const commonValueTypographyStyle = {
  fontSize: { xl: "16px" },
  color: "black",
};

const DetailServer = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [serverData, setServerData] = useState([]);
  const [serverDetailsTabs, setServerDetailsTabs] = useState("System Info");
  const [singleServerData, setSingleServerData] = useState<any>([]);
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const serverId = params.get("serverId");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getSingleServerData = async () => {
    const response = await getServerByServerIdApi(serverId as string);
    setSingleServerData(await response.data);
  };

  const fetchServersData = async () => {
    const response = await getSeversApi(
      "id,connection_urls,server_type,status,disk,cpu,memory,hostname,description,groups,environment"
    );
    setServerData(await response.data);
  };
  useEffect(() => {
    fetchServersData();
    getSingleServerData();
  }, []);

  const tabsData = [
    "System Info",
    "Certificates",
    "Data",
    "IBM ISAM AAC",
    "IBM ISAM Web",
  ];

  const ConnectionsCards = ({ data }: { data: any }) => {
    const Url = ({ url }: { url: string }) => {
      return (
        <Grid item xs={12} md={6} sx={{ wordWrap: "break-word" }}>
          <Typography sx={commonTitleTypographyStyle}>URL</Typography>
          <Typography sx={commonValueTypographyStyle}>{url}</Typography>
        </Grid>
      );
    };
    const Login = ({ login }: { login: string }) => {
      return (
        <Grid item xs={12} md={6} sx={{ wordWrap: "break-word" }}>
          <Typography sx={commonTitleTypographyStyle}>Login</Typography>
          <Typography sx={commonValueTypographyStyle}>{login}</Typography>
        </Grid>
      );
    };
    const SearchBase = ({ search_base }: { search_base: string }) => {
      return (
        <Grid item xs={12} md={6} sx={{ wordWrap: "break-word" }}>
          <Typography sx={commonTitleTypographyStyle}>Search Base</Typography>
          <Typography sx={commonValueTypographyStyle}>{search_base}</Typography>
        </Grid>
      );
    };
    const ClientId = ({ client_id }: { client_id: string }) => {
      return (
        <Grid item xs={12} md={6} sx={{ wordWrap: "break-word" }}>
          <Typography sx={commonTitleTypographyStyle}>Client ID</Typography>
          <Typography sx={commonValueTypographyStyle}>{client_id}</Typography>
        </Grid>
      );
    };
    const DatabaseDriver = ({
      database_driver,
    }: {
      database_driver: string;
    }) => {
      return (
        <Grid item xs={12} md={6} sx={{ wordWrap: "break-word" }}>
          <Typography sx={commonTitleTypographyStyle}>
            Database Driver
          </Typography>
          <Typography sx={commonValueTypographyStyle}>
            {database_driver}
          </Typography>
        </Grid>
      );
    };
    const SecMasterLogin = ({
      sec_master_login,
    }: {
      sec_master_login: string;
    }) => {
      return (
        <Grid item xs={12} md={6} sx={{ wordWrap: "break-word" }}>
          <Typography sx={commonTitleTypographyStyle}>
            Sec Master Login
          </Typography>
          <Typography sx={commonValueTypographyStyle}>
            {sec_master_login}
          </Typography>
        </Grid>
      );
    };
    const LogParser = ({ logParser }: { logParser: string }) => {
      return (
        <Grid item xs={12} md={6} sx={{ wordWrap: "break-word" }}>
          <Typography sx={commonTitleTypographyStyle}>Log Parser</Typography>
          <Typography sx={commonValueTypographyStyle}>{logParser}</Typography>
        </Grid>
      );
    };
    const LogFiles = ({ logfiles }: { logfiles: string }) => {
      return (
        <Grid item xs={12} md={6} sx={{ wordWrap: "break-word" }}>
          <Typography sx={commonTitleTypographyStyle}>Log Files</Typography>
          <Typography sx={commonValueTypographyStyle}>{logfiles}</Typography>
        </Grid>
      );
    };
    const Community = ({ community }: { community: string }) => {
      return (
        <Grid item xs={12} md={6} sx={{ wordWrap: "break-word" }}>
          <Typography sx={commonTitleTypographyStyle}>Community</Typography>
          <Typography sx={commonValueTypographyStyle}>{community}</Typography>
        </Grid>
      );
    };

    return (
      <Box
        sx={[
          {
            ...globalCss.cardBorderColorCss,
          },
          { p: "10px", minHeight: "100px", borderRadius: "5px" },
        ]}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={commonTitleTypographyStyle}>
              Connection Type
            </Typography>
            <Typography sx={commonValueTypographyStyle}>{data.type}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={commonTitleTypographyStyle}>Name</Typography>
            <Typography sx={commonValueTypographyStyle}>{data.name}</Typography>
          </Grid>
          {data.url && data.url.length > 0 && <Url url={data.url} />}
          {data.login && data.login.length > 0 && <Login login={data.login} />}
          {data.sec_master_login && data.sec_master_login.length > 0 && (
            <SecMasterLogin sec_master_login={data.sec_master_login} />
          )}
          {data.search_base && data.search_base.length > 0 && (
            <SearchBase search_base={data.search_base} />
          )}
          {data.client_id && data.client_id.length > 0 && (
            <ClientId client_id={data.client_id} />
          )}
          {data.database_driver && data.database_driver.length > 0 && (
            <DatabaseDriver database_driver={data.database_driver} />
          )}
          {data.logParser && data.logParser.length > 0 && (
            <LogParser logParser={data.logParser} />
          )}
          {data.logfiles && data.logfiles.length > 0 && (
            <LogFiles logfiles={data.logfiles} />
          )}
          {data.community && data.community.length > 0 && (
            <Community community={data.community} />
          )}
        </Grid>
      </Box>
    );
  };

  const Certificates = () => {
    console.log(singleServerData);
    return (
      <Box>
        {singleServerData?.data &&
        singleServerData?.data?.certs &&
        singleServerData?.data?.certs?.items ? (
          <ServerCertificate serverData={singleServerData} />
        ) : (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"40vh"}
          >
            <Typography>No Certificates Available</Typography>
          </Box>
        )}
      </Box>
    );
  };

  const Data = () => {
    return (
      <Box>
        <Typography>Data</Typography>
      </Box>
    );
  };
  const IBMISAM = () => {
    return (
      <Box>
        <Typography>IBM ISAM</Typography>
      </Box>
    );
  };
  const IBMISAMWeb = () => {
    return (
      <Box>
        <Typography>IBM ISAM Web</Typography>
      </Box>
    );
  };
  const SystemInfo = () => {
    return (
      <Box>
        {singleServerData ? (
          <CustomCard
            sx={[
              {
                ...globalCss.widgetCardContainer,
                ...globalCss.cardBorderColorCss,
                ...globalCss.hideScrollBarCss,
              },
              { p: "10px", height: "690px", overflow: "auto" },
            ]}
          >
            <Box display={"flex"} flexDirection={"column"} gap={2}>
              <Box>
                <Box>
                  <Typography
                    fontSize={{ xl: "20px", sm: "18px" }}
                    fontWeight={500}
                  >
                    Basic System Information
                  </Typography>
                </Box>
                <Box>
                  <Grid container spacing={2} mt={0}>
                    <Grid item xs={12} md={6} sx={{ wordWrap: "break-word" }}>
                      <Typography sx={commonTitleTypographyStyle}>
                        FQDN (Fully Qualified Domian Name)
                      </Typography>
                      <Typography sx={commonValueTypographyStyle}>
                        {singleServerData.hostname &&
                        singleServerData.hostname.length > 0
                          ? singleServerData.hostname
                          : "N/A"}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ wordWrap: "break-word" }}>
                      <Typography sx={commonTitleTypographyStyle}>
                        ID
                      </Typography>
                      <Typography sx={commonValueTypographyStyle}>
                        {singleServerData.id && singleServerData.id.length > 0
                          ? singleServerData.id
                          : "N/A"}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ wordWrap: "break-word" }}>
                      <Typography sx={commonTitleTypographyStyle}>
                        Environment
                      </Typography>
                      <Typography sx={commonValueTypographyStyle}>
                        {singleServerData.environment &&
                        singleServerData.environment.length > 0
                          ? singleServerData.environment
                          : "N/A"}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ wordWrap: "break-word" }}>
                      <Typography sx={commonTitleTypographyStyle}>
                        Network Zone
                      </Typography>
                      <Typography sx={commonValueTypographyStyle}>
                        {singleServerData.network_zone &&
                        singleServerData.network_zone.length > 0
                          ? singleServerData.network_zone
                          : "N/A"}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ wordWrap: "break-word" }}>
                      <Typography sx={commonTitleTypographyStyle}>
                        Groups
                      </Typography>
                      <Typography sx={commonValueTypographyStyle}>
                        {singleServerData.groups
                          ? singleServerData.groups.join(", ")
                          : "N/A"}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ wordWrap: "break-word" }}>
                      <Typography sx={commonTitleTypographyStyle}>
                        Description
                      </Typography>
                      <Typography sx={commonValueTypographyStyle}>
                        {singleServerData.description &&
                        singleServerData.description.length > 0
                          ? singleServerData.description
                          : "N/A"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Box>
                <Box>
                  <Typography
                    fontSize={{ xl: "20px", sm: "18px" }}
                    fontWeight={500}
                  >
                    Server Details
                  </Typography>
                </Box>
                <Box>
                  <Grid container spacing={2} mt={0}>
                    <Grid item xs={12} md={6} sx={{ wordWrap: "break-word" }}>
                      <Typography sx={commonTitleTypographyStyle}>
                        Server Label
                      </Typography>
                      <Typography sx={commonValueTypographyStyle}>
                        {singleServerData.server_type &&
                        singleServerData.server_type.label
                          ? singleServerData.server_type.label
                          : "N/A"}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ wordWrap: "break-word" }}>
                      <Typography sx={commonTitleTypographyStyle}>
                        Type
                      </Typography>
                      <Typography sx={commonValueTypographyStyle}>
                        {singleServerData.server_type &&
                        singleServerData.server_type.type
                          ? singleServerData.server_type.type
                          : "N/A"}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ wordWrap: "break-word" }}>
                      <Typography sx={commonTitleTypographyStyle}>
                        Products
                      </Typography>
                      <Typography sx={commonValueTypographyStyle}>
                        {singleServerData.server_type &&
                        singleServerData.server_type.products_installed
                          ? singleServerData.server_type.products_installed
                              .map((data: any) => data.id)
                              .join(", ")
                          : "N/A"}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ wordWrap: "break-word" }}>
                      <Typography sx={commonTitleTypographyStyle}>
                        Role
                      </Typography>
                      <Typography sx={commonValueTypographyStyle}>
                        {singleServerData.server_type &&
                        singleServerData.server_type.role
                          ? singleServerData.server_type.role
                          : "N/A"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Box>
                <Box>
                  <Typography
                    fontSize={{ xl: "20px", sm: "18px" }}
                    fontWeight={500}
                  >
                    Connections
                  </Typography>
                </Box>
                <Box display={"flex"} flexDirection={"column"} gap={2} mt={2}>
                  {singleServerData &&
                    singleServerData.connection_urls &&
                    singleServerData.connection_urls.map((data: any) => (
                      <ConnectionsCards data={data} />
                    ))}
                </Box>
              </Box>
            </Box>
          </CustomCard>
        ) : (
          <Loader />
        )}
      </Box>
    );
  };

  const renderServerDetailsTabs = () => {
    switch (serverDetailsTabs) {
      case "System Info":
        return <SystemInfo />;
      case "Certificates":
        return <Certificates />;

      case "Data":
        return <ServerData singleserverData={singleServerData}/>;
      case "IBM ISAM AAC":
        return <IBMISAM />;
    }
  };

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
            {open && (
              <ServerChoiceForm
                open={open}
                handleClose={handleClose}
                serverData={serverData}
              />
            )}
          </Button>
        </Box>
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={4}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontSize={{ xl: "24px", sm: "20px", xs: "18px" }}>
            Servers
          </Typography>
          <Button
            variant="contained"
            size="medium"
            sx={{ color: "white", width: "100px" }}
            onClick={() => {
              navigate(`../servers/server?serverId=${serverId}&edit=true`);
            }}
          >
            Edit
          </Button>
        </Box>

        <Box>
          <Grid container spacing={2} width={"100%"}>
            <Grid item xs={12} lg={8}>
              <Box width={"100%"}>
                <Tabs
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  value={serverDetailsTabs}
                  onChange={(event: React.SyntheticEvent, newValue: string) => {
                    setServerDetailsTabs(newValue);
                  }}
                  aria-label="alert-types-tabs"
                >
                  {tabsData.map((data: string) => (
                    <Tab
                      key={data}
                      label={data}
                      sx={{
                        margin: "0 10px",
                        fontSize: "16px",
                        color: "#144374",
                        fontWeight:
                          serverDetailsTabs === data ? "600" : "normal",
                      }}
                      value={data}
                    />
                  ))}
                </Tabs>
                <Box width={"100%"}>{renderServerDetailsTabs()}</Box>
              </Box>
            </Grid>

            {/* main server details */}
            <Grid item xs={12} lg={4}>
              <Box display="flex" flexDirection="column" gap={2} mt={1}>
                <Box
                  flex={1}
                  padding={1}
                  sx={{
                    ...globalCss.widgetCardContainer,
                    backgroundColor: "rgba(147, 203, 255, 0.14)",
                  }}
                  position="relative"
                  overflow="hidden"
                  height={"80px"}
                  borderRadius={"4px"}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    columnGap={4}
                    height={"100%"}
                  >
                    <Box
                      component="img"
                      src={serverIcon}
                     
                    />
                    <Box >
                      <Typography
                        fontSize={"2.5rem"}
                        fontWeight={600}
                        color="#1363AC"
                      >
                        {singleServerData?.id}
                      </Typography>
                      <Typography fontSize={"12px"} fontWeight={450}>
                        {singleServerData?.hostname}
                      </Typography>
                      <Typography fontSize={"11px"} fontWeight={300}>
                        {singleServerData?.description}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Typography
                    fontSize={"10px"}
                    fontWeight={350}
                    color={"#979797"}
                  >
                    Server Type
                  </Typography>
                  <Typography fontSize={"14px"} fontWeight={450}>
                    {singleServerData?.server_type?.label}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    fontSize={"10px"}
                    fontWeight={350}
                    color={"#979797"}
                  >
                    Consoles
                  </Typography>
                  {singleServerData?.console_urls?.map((console: any) => {
                    return (
                      <Typography
                        key={console}
                        fontSize={"14px"}
                        fontWeight={400}
                        color={"#369FFF"}
                      >
                        {console.name}
                      </Typography>
                    );
                  })}
                </Box>
                <Box display={"flex"} gap={"80px"}>
                  <Box>
                    <Typography
                      fontSize={"10px"}
                      fontWeight={350}
                      color={"#979797"}
                    >
                      Environment
                    </Typography>
                    <Typography fontSize={"14px"} fontWeight={420}>
                      {singleServerData?.environment}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      fontSize={"10px"}
                      fontWeight={350}
                      color={"#979797"}
                    >
                      Network Zone
                    </Typography>
                    <Typography fontSize={"14px"} fontWeight={420}>
                      {singleServerData?.network_zone}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography
                    fontSize={"10px"}
                    fontWeight={350}
                    color={"#979797"}
                  >
                    Groups
                  </Typography>
                  <Box display={"flex"} gap={1} sx={{ flexWrap: "wrap" }}>
                    {singleServerData?.groups?.map((label: string) => {
                      return (
                        <Chip
                          key={label}
                          label={label}
                          clickable
                          sx={{
                            color: "#369FFF",
                            backgroundColor: "white",
                            border: "1px solid #369FFF",
                            "&:hover": "none",
                            fontSize: "14px",
                          }}
                        />
                      );
                    })}
                  </Box>
                </Box>
                <Box display={"flex"} justifyContent={"center"}>
                  <Box
                    maxWidth={{ lg: "120px", md: "80px", sm: "120px" }}
                    m={0.5}
                  >
                    <ServerDoughnutChart
                      serverData={singleServerData}
                      type={"cpu"}
                    />
                  </Box>
                  <Box
                    maxWidth={{ lg: "120px", md: "80px", sm: "120px" }}
                    m={0.5}
                  >
                    <ServerDoughnutChart
                      serverData={singleServerData}
                      type={"ram"}
                    />
                  </Box>
                  <Box
                    maxWidth={{ lg: "120px", md: "80px", sm: "120px" }}
                    m={0.5}
                  >
                    <ServerDoughnutChart
                      serverData={singleServerData}
                      type={"storage"}
                    />
                  </Box>
                </Box>
                <Box display={"flex"} justifyContent={"space-around"}>
                  <Box>
                    <Box display={"flex"} justifyContent={"center"}>
                      <WifiIcon
                        sx={{
                          color:
                            singleServerData?.data?.status?.ping?.responding ===
                            true
                              ? "#53c65d"
                              : "#979797",
                          width: 50,
                          height: 50,
                        }}
                      />
                    </Box>

                    <Box display={"flex"} justifyContent={"center"} m={1}>
                      <Typography
                        fontSize={"10px"}
                        fontWeight={350}
                        color={"#979797"}
                      >
                        Ping
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Box display={"flex"} justifyContent={"center"}>
                      <PowerIcon
                        sx={{
                          color: isAllRespondingPingPort(singleServerData)
                            ? "#53c65d"
                            : "#B8C4CE",
                          width: 50,
                          height: 50,
                        }}
                      />
                    </Box>

                    <Box display={"flex"} justifyContent={"center"} m={1}>
                      <Typography
                        fontSize={"10px"}
                        fontWeight={350}
                        color={"#979797"}
                      >
                        Ports
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Box display={"flex"} justifyContent={"center"}>
                      <AccountBalanceIcon
                        sx={{
                          color: isAllRespondingTransactions(singleServerData)
                            ? "#53c65d"
                            : "#B8C4CE",
                          width: 50,
                          height: 50,
                        }}
                      />
                    </Box>
                    <Box display={"flex"} justifyContent={"center"} m={1}>
                      <Typography
                        fontSize={"10px"}
                        fontWeight={350}
                        color={"#979797"}
                      >
                        Transactions
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Box display={"flex"} justifyContent={"center"}>
                      <FavoriteIcon
                        sx={{
                          color: () => {
                            const healthScore =
                              singleServerData?.data?.status?.health?.score;
                            if (healthScore >= 0 && healthScore <= 3) {
                              return "#FF0000"; //red
                            } else if (healthScore >= 4 && healthScore <= 7) {
                              return "#FFBE2B"; //yellow
                            } else if (healthScore >= 8 && healthScore <= 10) {
                              return "#53c65d"; //green
                            } else {
                              return "#B8C4CE";
                            }
                          },
                          width: 50,
                          height: 50,
                        }}
                      />
                    </Box>

                    <Box display={"flex"} justifyContent={"center"} m={1}>
                      <Typography
                        fontSize={"10px"}
                        fontWeight={350}
                        color={"#979797"}
                      >
                        Health
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <CertificatesCard
                    type="totalServers"
                    title="Total Issued Certificates"
                    data={
                      singleServerData?.data?.certs?.items?.length
                        ? singleServerData?.data?.certs?.items?.length
                        : 0
                    }
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailServer;
