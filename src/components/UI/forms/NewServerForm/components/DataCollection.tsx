import {
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { globalCss } from "../../../../../styles/muiCss";
import AddIcon from "@mui/icons-material/Add";
import { getSystemInfraConnectionData } from "../../../../../redux/slice/sysemInfraConnectionUrlSlice";
import ConnectionTestLogsTable from "../../../../tables/ConnectionTestLogsTable";

type Props = {};

const DataCollectionUrlsCard = ({
  index,
  systemInfraConnectionData,
}: {
  index: number;
  systemInfraConnectionData: any;
}) => {
  const { handleChange, submitForm, touched, errors, values, setFieldValue } =
    useFormikContext<any>();
  const [connectionTypeFields, setConnectionTypeFields] = useState<any>([]);

  const hasKey = (
    obj: any,
    key: string | number | symbol
  ): key is keyof typeof obj => key in obj;

  const hasFieldError = (fieldName: string) =>
    hasKey(errors, "dataCollectionURLs") &&
    hasKey(errors.dataCollectionURLs, index) &&
    hasKey(touched, "dataCollectionURLs") &&
    hasKey(touched.dataCollectionURLs, index) &&
    hasKey(errors.dataCollectionURLs[index], fieldName) &&
    hasKey(touched.dataCollectionURLs[index], fieldName);

  // Usage
  const hasConnectionTypeError = hasFieldError("type");
  const hasNameError = hasFieldError("name");
  const hasLoginError = hasFieldError("login");
  const hasSecMasterLoginError = hasFieldError("sec_master_login");
  const hasURLError = hasFieldError("url");
  const hasPasswordError = hasFieldError("password");
  const hasSecMasterPasswordError = hasFieldError("sec_master_password");

  const handleDeleteDataCollectionUrl = () => {
    const updatedDataCollectionUrls = values.dataCollectionURLs.filter(
      (dataCollectionUrl: any, i: number) => i !== index
    );
    setFieldValue("dataCollectionURLs", updatedDataCollectionUrls);
  };

  useEffect(() => {
    if (systemInfraConnectionData.infrastructure_connection_urls) {
      setConnectionTypeFields(
        systemInfraConnectionData.infrastructure_connection_urls.filter(
          (data: any) => data.id === values.dataCollectionURLs[index].type
        )[0]
          ? systemInfraConnectionData.infrastructure_connection_urls.filter(
              (data: any) => data.id === values.dataCollectionURLs[index].type
            )[0].fields
          : []
      );
    }
  }, [systemInfraConnectionData]);

  console.log(systemInfraConnectionData)
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      sx={[globalCss.cardBorderColorCss, { borderRadius: "5px" }]}
      p={2}
    >
      <Box display={"flex"} mb={1}>
        <FormControl sx={{ width: "100%" }}>
          <Typography variant="body1" style={{ color: "#979797" }}>
            Connection Type
          </Typography>

          <Select
            name={`dataCollectionURLs[${index}].type`}
            value={values.dataCollectionURLs[index].type}
            onChange={handleChange}
            displayEmpty
            variant="outlined"
            error={Boolean(hasConnectionTypeError)}
          >
            {systemInfraConnectionData &&
              systemInfraConnectionData.infrastructure_connection_urls.map(
                (data: any, key: number) => (
                  <MenuItem
                    onClick={() => setConnectionTypeFields(data.fields)}
                    key={key}
                    value={data.id}
                  >
                    {data.id}
                  </MenuItem>
                )
              )}
          </Select>
          {/* <FormHelperText sx={{ color: "error.main" }}>
            {hasConnectionTypeError &&
              touched.dataCollectionURLs[index]?.type &&
              errors.dataCollectionURLs[index]?.type}
          </FormHelperText> */}
        </FormControl>
      </Box>
      <Box display={"flex"}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl sx={{ width: "100%" }}>
              <Typography variant="body1" style={{ color: "#979797" }}>
                Name
              </Typography>
              <TextField
                name={`dataCollectionURLs[${index}].name`}
                value={values.dataCollectionURLs[index].name}
                onChange={handleChange}
                // error={Boolean(hasNameError)}
                // helperText={
                //   hasNameError ? errors.dataCollectionURLs[index]?.name : ""
                // }
                type="text"
                size="small"
              />
            </FormControl>
          </Grid>
          {connectionTypeFields.length > 0 &&
            connectionTypeFields.includes("login") && (
              <Grid item xs={6}>
                <FormControl sx={{ width: "100%" }}>
                  <Typography variant="body1" style={{ color: "#979797" }}>
                    Login
                  </Typography>
                  <TextField
                    name={`dataCollectionURLs[${index}].login`}
                    value={values.dataCollectionURLs[index].login}
                    onChange={handleChange}
                    // error={Boolean(hasLoginError)}
                    // helperText={
                    //   hasLoginError
                    //     ? errors.dataCollectionURLs[index]?.login
                    //     : ""
                    // }
                    type="text"
                    size="small"
                  />
                </FormControl>
              </Grid>
            )}
          {connectionTypeFields.length > 0 &&
            connectionTypeFields.includes("url") && (
              <Grid item xs={6}>
                <FormControl sx={{ width: "100%" }}>
                  <Typography variant="body1" style={{ color: "#979797" }}>
                    URL
                  </Typography>
                  <TextField
                    name={`dataCollectionURLs[${index}].url`}
                    value={values.dataCollectionURLs[index].url}
                    onChange={handleChange}
                    // error={Boolean(hasURLError)}
                    // helperText={
                    //   hasURLError ? errors.dataCollectionURLs[index]?.url : ""
                    // }
                    type="text"
                    size="small"
                  />
                </FormControl>
              </Grid>
            )}

          {connectionTypeFields.length > 0 &&
            connectionTypeFields.includes("password") && (
              <Grid item xs={6}>
                <FormControl sx={{ width: "100%" }}>
                  <Typography variant="body1" style={{ color: "#979797" }}>
                    Password
                  </Typography>
                  <TextField
                    name={`dataCollectionURLs[${index}].password`}
                    value={values.dataCollectionURLs[index].password}
                    onChange={handleChange}
                    // error={Boolean(hasPasswordError)}
                    // helperText={
                    //   hasPasswordError
                    //     ? errors.dataCollectionURLs[index]?.password
                    //     : ""
                    // }
                    type="password"
                    size="small"
                  />
                </FormControl>
              </Grid>
            )}

          {connectionTypeFields.length > 0 &&
            connectionTypeFields.includes("sec_master_login") && (
              <Grid item xs={6}>
                <FormControl sx={{ width: "100%" }}>
                  <Typography variant="body1" style={{ color: "#979797" }}>
                    Sec Master Login
                  </Typography>
                  <TextField
                    name={`dataCollectionURLs[${index}].sec_master_login`}
                    value={values.dataCollectionURLs[index].sec_master_login}
                    onChange={handleChange}
                    // error={Boolean(hasSecMasterLoginError)}
                    // helperText={
                    //   hasSecMasterLoginError
                    //     ? errors.dataCollectionURLs[index]?.sec_master_login
                    //     : ""
                    // }
                    type="text"
                    size="small"
                  />
                </FormControl>
              </Grid>
            )}

          {connectionTypeFields.length > 0 &&
            connectionTypeFields.includes("sec_master_password") && (
              <Grid item xs={6}>
                <FormControl sx={{ width: "100%" }}>
                  <Typography variant="body1" style={{ color: "#979797" }}>
                    Sec Master Password
                  </Typography>
                  <TextField
                    name={`dataCollectionURLs[${index}].sec_master_password`}
                    value={values.dataCollectionURLs[index].sec_master_password}
                    // error={Boolean(hasSecMasterPasswordError)}
                    // helperText={
                    //   hasSecMasterPasswordError
                    //     ? errors.dataCollectionURLs[index]?.sec_master_password
                    //     : ""
                    // }
                    onChange={handleChange}
                    type="password"
                    size="small"
                  />
                </FormControl>
              </Grid>
            )}
          {connectionTypeFields.length > 0 &&
            connectionTypeFields.includes("search_base") && (
              <Grid item xs={6}>
                <FormControl sx={{ width: "100%" }}>
                  <Typography variant="body1" style={{ color: "#979797" }}>
                    Search Base
                  </Typography>
                  <TextField
                    name={`dataCollectionURLs[${index}].search_base`}
                    value={values.dataCollectionURLs[index].search_base}
                    // error={Boolean(hasSearchBaseError)}
                    // helperText={
                    //   hasSearchBaseError
                    //     ? errors.dataCollectionURLs[index]?.search_base
                    //     : ""
                    // }
                    onChange={handleChange}
                    type="text"
                    size="small"
                  />
                </FormControl>
              </Grid>
            )}

          {connectionTypeFields.length > 0 &&
            connectionTypeFields.includes("client_id") && (
              <Grid item xs={6}>
                <FormControl sx={{ width: "100%" }}>
                  <Typography variant="body1" style={{ color: "#979797" }}>
                    Client Id
                  </Typography>
                  <TextField
                    name={`dataCollectionURLs[${index}].client_id`}
                    value={values.dataCollectionURLs[index].client_id}
                    // error={Boolean(hasSecMasterPasswordError)}
                    // helperText={
                    //   hasSecMasterPasswordError
                    //     ? errors.dataCollectionURLs[index]?.client_id
                    //     : ""
                    // }
                    onChange={handleChange}
                    type="text"
                    size="small"
                  />
                </FormControl>
              </Grid>
            )}
          {connectionTypeFields.length > 0 &&
            connectionTypeFields.includes("client_password") && (
              <Grid item xs={6}>
                <FormControl sx={{ width: "100%" }}>
                  <Typography variant="body1" style={{ color: "#979797" }}>
                    Client Password
                  </Typography>
                  <TextField
                    name={`dataCollectionURLs[${index}].client_password`}
                    value={values.dataCollectionURLs[index].client_password}
                    // error={Boolean(hasSecMasterPasswordError)}
                    // helperText={
                    //   hasSecMasterPasswordError
                    //     ? errors.dataCollectionURLs[index]?.client_password
                    //     : ""
                    // }
                    onChange={handleChange}
                    type="password"
                    size="small"
                  />
                </FormControl>
              </Grid>
            )}
          {connectionTypeFields.length > 0 &&
            connectionTypeFields.includes("database_driver") && (
              <Grid item xs={6}>
                <FormControl sx={{ width: "100%" }}>
                  <Typography variant="body1" style={{ color: "#979797" }}>
                    Database Driver
                  </Typography>
                  <TextField
                    name={`dataCollectionURLs[${index}].database_driver`}
                    value={values.dataCollectionURLs[index].database_driver}
                    // error={Boolean(hasSecMasterPasswordError)}
                    // helperText={
                    //   hasSecMasterPasswordError
                    //     ? errors.dataCollectionURLs[index]?.database_driver
                    //     : ""
                    // }
                    onChange={handleChange}
                    type="text"
                    size="small"
                  />
                </FormControl>
              </Grid>
            )}
          {connectionTypeFields.length > 0 &&
            connectionTypeFields.includes("logParser") && (
              <Grid item xs={6}>
                <FormControl sx={{ width: "100%" }}>
                  <Typography variant="body1" style={{ color: "#979797" }}>
                    Log Parser
                  </Typography>
                  <TextField
                    name={`dataCollectionURLs[${index}].logParser`}
                    value={values.dataCollectionURLs[index].logParser}
                    // error={Boolean(hasSecMasterPasswordError)}
                    // helperText={
                    //   hasSecMasterPasswordError
                    //     ? errors.dataCollectionURLs[index]?.logParser
                    //     : ""
                    // }
                    onChange={handleChange}
                    type="text"
                    size="small"
                  />
                </FormControl>
              </Grid>
            )}
          {connectionTypeFields.length > 0 &&
            connectionTypeFields.includes("logfiles") && (
              <Grid item xs={6}>
                <FormControl sx={{ width: "100%" }}>
                  <Typography variant="body1" style={{ color: "#979797" }}>
                    Log Files
                  </Typography>
                  <TextField
                    name={`dataCollectionURLs[${index}].logfiles`}
                    value={values.dataCollectionURLs[index].logfiles}
                    // error={Boolean(hasSecMasterPasswordError)}
                    // helperText={
                    //   hasSecMasterPasswordError
                    //     ? errors.dataCollectionURLs[index]?.logfiles
                    //     : ""
                    // }
                    onChange={handleChange}
                    type="text"
                    size="small"
                  />
                </FormControl>
              </Grid>
            )}
          {connectionTypeFields.length > 0 &&
            connectionTypeFields.includes("priv_password") && (
              <Grid item xs={6}>
                <FormControl sx={{ width: "100%" }}>
                  <Typography variant="body1" style={{ color: "#979797" }}>
                    Priv Password
                  </Typography>
                  <TextField
                    name={`dataCollectionURLs[${index}].priv_password`}
                    value={values.dataCollectionURLs[index].priv_password}
                    // error={Boolean(hasSecMasterPasswordError)}
                    // helperText={
                    //   hasSecMasterPasswordError
                    //     ? errors.dataCollectionURLs[index]?.priv_password
                    //     : ""
                    // }
                    onChange={handleChange}
                    type="password"
                    size="small"
                  />
                </FormControl>
              </Grid>
            )}
          {connectionTypeFields.length > 0 &&
            connectionTypeFields.includes("comuunity") && (
              <Grid item xs={6}>
                <FormControl sx={{ width: "100%" }}>
                  <Typography variant="body1" style={{ color: "#979797" }}>
                    Community
                  </Typography>
                  <TextField
                    name={`dataCollectionURLs[${index}].comuunity`}
                    value={values.dataCollectionURLs[index].comuunity}
                    // error={Boolean(hasSecMasterPasswordError)}
                    // helperText={
                    //   hasSecMasterPasswordError
                    //     ? errors.dataCollectionURLs[index]?.comuunity
                    //     : ""
                    // }
                    onChange={handleChange}
                    type="text"
                    size="small"
                  />
                </FormControl>
              </Grid>
            )}
        </Grid>
      </Box>

      <Box display={"flex"} gap={2} mt={2}>
        <Button
          variant="outlined"
          size="small"
          sx={{
            boxShadow: "none",
            borderRadius: "10px",
            ":hover": {
              boxShadow: "none",
              background: "#5db1ff",
            },
            background: "#5db1ff",
            color: "white",
          }}
        >
          Test
        </Button>
        <Button
          onClick={handleDeleteDataCollectionUrl}
          variant="contained"
          size="small"
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
          DELETE
        </Button>
      </Box>
    </Box>
  );
};

const DataCollection = (props: Props) => {
  const { handleChange, submitForm, touched, errors, values, setFieldValue } =
    useFormikContext<any>();
  const switchLabel = { inputProps: { "aria-label": "Switch demo" } };
  const { isLoadingConnection, errorConnection, systemInfraConnectionData } =
    useSelector(getSystemInfraConnectionData);

  const handleAddDataConnectionUrl = () => {
    const updatedDataCollectionURLsData = {
      type: "",
      login: "",
      url: "",
      sec_master_login: "",
      password: "",
      name: "",
      sec_master_password: "",
    };

    setFieldValue("dataCollectionURLs", [
      ...values.dataCollectionURLs,
      updatedDataCollectionURLsData,
    ]);
  };

  return (
    <>
      <Box display={"flex"} flexDirection={"column"} gap={3} sx={{ mt: 2 }}>
        <Box mt={2} display={"flex"} flexDirection={"column"} gap={2}>
          <Box>
            <Typography sx={{ fontWeight: 600 }}>
              Data Collection Status
            </Typography>
            <Typography variant="body1" style={{ color: "#979797" }}>
              Data Collection is ON by default and should be kept ON in order
              for the system to function correctly. However, in some cases you
              may wish to disable collection temporarily. When collection is
              disabled, no data will be collected for the server and no alert
              notifications for the server will be sent.
            </Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"start"}
            gap={2}
            alignItems={"center"}
          >
            <Typography variant="body1" style={{ color: "#979797" }}>
              Collect Data
            </Typography>
            <Stack direction="row" alignItems="center">
              <Switch
                {...switchLabel}
                checked={values.collectData}
                onChange={(e) => {
                  setFieldValue("collectData", e.target.checked);
                }}
              />

              <Typography>{values.collectData ? "On" : "Off"}</Typography>
            </Stack>
          </Box>
        </Box>
        <Box mt={2} display={"flex"} flexDirection={"column"} gap={2}>
          <Box>
            <Typography sx={{ fontWeight: 600 }}>
              Data Collection URLs
            </Typography>
            <Typography variant="body1" style={{ color: "#979797" }}>
              This data us used by iamaware collectors
            </Typography>
          </Box>
          <Stack gap={2}>
            {values.dataCollectionURLs.map((item: any, index: number) => {
              return (
                <DataCollectionUrlsCard
                  key={index}
                  index={index}
                  systemInfraConnectionData={systemInfraConnectionData}
                />
              );
            })}
          </Stack>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Button
              onClick={handleAddDataConnectionUrl}
              variant="contained"
              size="small"
              sx={{
                maxWidth: "180px",
                borderRadius: "5px",
                boxShadow: "none",
                ":hover": {
                  boxShadow: "none",
                  backgroundColor: "primary.main",
                },
                color: "white",
                backgroundColor: "primary.main",
              }}
            >
              <AddIcon />
              <Typography component="span" textTransform="capitalize">
                Add Console Url
              </Typography>
            </Button>
            <Button variant="outlined">Test All Connections</Button>
          </Box>
        </Box>
        <Box mt={2} display={"flex"} flexDirection={"column"} gap={2}>
          <Box>
            <Typography sx={{ fontWeight: 600 }}>Remote Collection</Typography>
            <Typography variant="body1" style={{ color: "#979797" }}>
              This collection is only if you are using a remote collector
            </Typography>
            <FormControl sx={{ width: "100%", mt: 2 }}>
              <Typography variant="body1" style={{ color: "#979797" }}>
                Remote Collector Hostname
              </Typography>
              <TextField
                name={`remoteCollectorHostname`}
                value={values.remoteCollectorHostname}
                onChange={handleChange}
                error={Boolean(
                  errors.remoteCollectorHostname &&
                    touched.remoteCollectorHostname
                )}
                helperText={
                  errors.remoteCollectorHostname &&
                  touched.remoteCollectorHostname &&
                  String(errors.remoteCollectorHostname)
                }
                type="text"
                size="small"
              />
            </FormControl>
          </Box>
        </Box>
        <Box mt={2} display={"flex"} flexDirection={"column"} gap={2}>
          <Box>
            <Typography sx={{ fontWeight: 600 }}>
              Connection Test Logs
            </Typography>
            <Typography variant="body1" style={{ color: "#979797" }}>
              These logs state the result of the connection tests fired
            </Typography>
            <ConnectionTestLogsTable />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DataCollection;
