import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
  formGroupClasses,
} from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSystemInfraGroupData,
  getSystemInfratructureGroupDataFromApi,
} from "../../../../redux/slice/systemInfraGroupDataSlice";

import BasicInformation from "./components/BasicInformation";
import Type from "./components/Type";
import DataCollection from "./components/DataCollection";
import {
  getSystemInfraEnvironmentData,
  getSystemInfratructureEnvironmentDataFromApi,
} from "../../../../redux/slice/systemInfraEnvironmentData";
import { newServerValidationSchema } from "../../../../validation/yup/newServerYupValidation";
import { getSystemInfratructureOSTypeDataFromApi } from "../../../../redux/slice/systemInfraOSTypesData";
import { getSystemInfratructureConnectionDataFromApi } from "../../../../redux/slice/sysemInfraConnectionUrlSlice";
import CustomCard from "../../card/Card";
import { globalCss } from "../../../../styles/muiCss";
import { Loader } from "../../..";
import {
  createServerApi,
  getServerByServerIdApi,
  getSeversApi,
  updateServerByServerIdApi,
} from "../../../../services/webApis/webApis";
import { getServerDataFromApi } from "../../../../redux/slice/serverSlice";
import { getSystemInfratructureSupportSoftwareDataFromApi } from "../../../../redux/slice/systemInfraSupportedSoftwareSlice";
import { toast } from "react-toastify";

type Props = {};
interface InitialValuesType {
  clonedFrom?: string;
  fqdn: string;
  id: string;
  environment: string;
  newtworkZone: string;
  groupMemberships: string[];
  description: string;
  administrativeConsoleURLs: { name: string; url: string }[];

  type: string;
  serverTypeId: string;
  serverTypeType: string;
  products: { id: string; label: string }[];

  serverRole: string;

  collectData: boolean;
  dataCollectionURLs: {
    type: string;
    login: string;
    url: string;
    sec_master_login: string;
    password: string;
    name: string;
    sec_master_password: string;
    search_base: string;
    client_id: string;
    client_password: string;
    database_driver: string;
    logParser: string;
    logfiles: string;
    priv_password: string;
    comuunity: string;
  }[];

  remoteCollectorHostname: string;
}
const NewServerForm = (props: Props) => {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState<InitialValuesType>({
    clonedFrom: "",
    fqdn: "",
    id: "",
    environment: "",
    newtworkZone: "",
    groupMemberships: [""],
    description: "",
    administrativeConsoleURLs: [{ name: "", url: "" }],
    type: "",
    serverTypeId: "",
    serverTypeType: "",
    products: [
      {
        id: "",
        label: "",
      },
    ],

    serverRole: "",
    collectData: false,
    dataCollectionURLs: [
      {
        type: "",
        login: "",
        url: "",
        sec_master_login: "",
        password: "",
        name: "",
        sec_master_password: "",

        search_base: "",
        client_id: "",
        client_password: "",
        database_driver: "",
        logParser: "",
        logfiles: "",
        priv_password: "",
        comuunity: "",
      },
    ],
    remoteCollectorHostname: "",
  });

  const [serverDetailsTabs, setServerDetailsTabs] =
    React.useState("basic_information");
  const [mode, setMode] = useState<"EDIT" | "CREATE">("CREATE");
  const [clone, setClone] = useState(false);
  const [singleServer, setSingleServer] = useState<any>();
  const [serverData, setServerData] = useState<any>();

  const location = useLocation();

  const { isLoadingGroup } = useSelector(getSystemInfraGroupData);
  const { isLoadingEnv } = useSelector(getSystemInfraEnvironmentData);

  const params = new URLSearchParams(location.search);
  const cloneServer = params.get("cloneServer");
  const newServer = params.get("newServer");
  const serverId = params.get("serverId");
  const isEdit = params.get("edit") || false;
  const navigate = useNavigate();

  const renderTabsComponent = () => {
    switch (serverDetailsTabs) {
      case "basic_information":
        return (
          <BasicInformation
            mode={mode}
            clone={clone}
            getServerById={getServerById}
            serverData={serverData}
          />
        );
      case "type":
        return <Type />;
      case "data_collection":
        return <DataCollection />;
    }
  };

  const getServerById = async (params: string) => {
    const resposne = await getServerByServerIdApi(params);
    setSingleServer(await resposne.data);
  };

  const fetchServersData = async () => {
    const response = await getSeversApi(
      "id,connection_urls,server_type,status,disk,cpu,memory,hostname,description,groups,environment"
    );
    setServerData(await response.data);
  };

  React.useEffect(() => {
    if (cloneServer && newServer && serverId) {
      getServerById(serverId);
      setClone(true);
      setInitialValues((prev) => ({
        ...prev,
        clonedFrom: cloneServer,
        fqdn: newServer,
      }));
    } else if (serverId && isEdit) {
      setMode("EDIT");
      setClone(false);
      getServerById(serverId);
      setInitialValues((prev) => ({
        ...prev,
        clonedFrom: "",
      }));
    } else {
      setMode("CREATE");
    }
    fetchServersData();
    dispatch(getSystemInfratructureGroupDataFromApi() as any);
    dispatch(getSystemInfratructureEnvironmentDataFromApi() as any);
    dispatch(getSystemInfratructureOSTypeDataFromApi() as any);
    dispatch(getSystemInfratructureConnectionDataFromApi() as any);
    dispatch(getSystemInfratructureSupportSoftwareDataFromApi() as any);
  }, [location]);

  React.useEffect(() => {
    if (singleServer) {
      setInitialValues((prev) => ({
        ...prev,
        // clonedFrom: clone ? newServer : singleServer.hostname || "",
        fqdn: clone ? newServer : singleServer.hostname || "",
        id: mode === "EDIT" ? singleServer.id : "",
        environment: singleServer.environment || "",
        description: singleServer.description || "",
        newtworkZone: singleServer.network_zone || "",
        groupMemberships: singleServer.groups || [],
        administrativeConsoleURLs: singleServer.console_urls || [
          { name: "", url: "" },
        ],
        type: `${singleServer.server_type.label}` || "",
        serverTypeId: `${singleServer.server_type.id}` || "",
        serverTypeType: `${singleServer.server_type.type}` || "",
        products:
          singleServer.server_type.products_installed.map(
            (data: any) => data
          ) || [],

        serverRole: singleServer.server_type.role || "",
        collectData: singleServer.disable_collection === "no" ? true : false,
        dataCollectionURLs: singleServer.connection_urls,
      }));
    }
  }, [singleServer]);

  return (
    <>
      {!isLoadingGroup && !isLoadingEnv && serverData ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={newServerValidationSchema}
            enableReinitialize={true}
            onSubmit={async (values, actions) => {
              const data = {
                hostname: values.fqdn,
                id: values.id,
                environment: values.environment,
                description: values.description,
                network_zone: values.newtworkZone,
                groups: values.groupMemberships,
                console_urls: values.administrativeConsoleURLs,
                server_type: {
                  id: values.serverTypeId,
                  type: values.serverTypeType,
                  label: values.type,
                  role: values.serverRole,
                  products_installed: values.products,
                },
                disable_collection: values.collectData ? "no" : "yes",
                connection_urls: values.dataCollectionURLs,
                collector_hostname: values.remoteCollectorHostname,
              };
              console.log(data);

              if (mode === "CREATE") {
                try {
                  const response = await createServerApi(data);
                  if (response.status === 201) {
                    toast.success("server created successfully");
                    navigate("/dashboard/configuration/servers", {
                      replace: true,
                    });
                  } else {
                    toast.error("server not created");
                  }
                } catch (error) {
                  toast.error(
                    error?.response?.data?.error || "Something went wrong"
                  );
                }
              } else if (mode === "EDIT") {
                try {
                  const response = await updateServerByServerIdApi(
                    serverId as string,
                    data
                  );

                  if (response.status === 200) {
                    toast.success("server updated successfully");
                    navigate("/dashboard/configuration/servers", {
                      replace: true,
                    });
                  } else {
                    navigate("/dashboard/configuration/servers", {
                      replace: true,
                    });
                    toast.error("server not created");
                  }
                } catch (error) {
                  console.log(error);
                  toast.error(
                    error?.response?.data?.error || "Something went wrong"
                  );
                }
              }
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box display={`flex`} justifyContent={`space-between`} mt={2}>
                    <Typography
                      fontSize={{ xl: "24px", sm: "20px", xs: "18px" }}
                    >
                      {mode === "EDIT" ? "Edit Server" : "New Server"}
                    </Typography>
                    <Box display={"flex"} gap={2}>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          borderRadius: "10px",
                          boxShadow: "none",
                          ":hover": {
                            boxShadow: "none",
                            backgroundColor: "primary.main",
                          },
                          color: "white",
                          backgroundColor: "primary.main",
                        }}
                      >
                        {mode === "EDIT" ? "Save Changes" : "Create"}
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          navigate("/dashboard/configuration/servers", {
                            replace: true,
                          });
                        }}
                        sx={{
                          boxShadow: "none",
                          borderRadius: "10px",
                          ":hover": {
                            boxShadow: "none",
                            background: "#f46162",
                          },
                          background: "#f46162",
                          color: "white",
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                  <CustomCard
                    sx={[{ ...globalCss.widgetCardContainer }, { p: "10px" }]}
                  >
                    <Box>
                      <Box>
                        <Tabs
                          value={serverDetailsTabs}
                          onChange={(
                            event: React.SyntheticEvent,
                            newValue: string
                          ) => {
                            setServerDetailsTabs(newValue);
                          }}
                          aria-label="alert-types-tabs"
                        >
                          <Tab
                            label="Basic Information"
                            value="basic_information"
                            sx={{
                              color: "#144374",
                              fontWeight:
                                serverDetailsTabs === "basic_information"
                                  ? "600"
                                  : "normal",
                            }}
                          />
                          <Tab
                            label="Type"
                            value="type"
                            sx={{
                              color: "#144374",
                              fontWeight:
                                serverDetailsTabs === "type" ? "600" : "normal",
                            }}
                          />
                          <Tab
                            label="Data Collection"
                            value="data_collection"
                            sx={{
                              color: "#144374",
                              fontWeight:
                                serverDetailsTabs === "data_collection"
                                  ? "600"
                                  : "normal",
                            }}
                          />
                        </Tabs>
                      </Box>

                      {renderTabsComponent()}
                    </Box>
                  </CustomCard>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default NewServerForm;
