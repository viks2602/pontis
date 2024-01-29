import {
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSystemInfraGroupData } from "../../../../../redux/slice/systemInfraGroupDataSlice";
import { globalCss } from "../../../../../styles/muiCss";
import AddIcon from "@mui/icons-material/Add";
import { getSystemInfraEnvironmentData } from "../../../../../redux/slice/systemInfraEnvironmentData";
import { getSeversApi } from "../../../../../services/webApis/webApis";
import { Loader } from "../../../..";

type Props = {
  mode: string;
  clone: boolean;
  getServerById: any;
  serverData:any
};

const GroupMembershipField = ({
  selectedGroups,
  setSelectedGroups,
  values,
}: any) => {
  const { setFieldValue, errors, touched, setFieldTouched } =
    useFormikContext<any>();
  const { isLoadingGroup, systemInfraGroupData, errorGroup } = useSelector(
    getSystemInfraGroupData
  );

  useEffect(() => {
    setFieldValue("groupMemberships", selectedGroups);
    setFieldTouched("groupMemberships", false);
  }, [selectedGroups]);

  const handleChipClick = (label: string) => {
    if (selectedGroups.includes(label)) {
      setSelectedGroups((prevSelected: any) =>
        prevSelected.filter((item: string) => item != label)
      );
    } else {
      setSelectedGroups((prevSelected: any) => [...prevSelected, label]);
    }
  };

  return (
    <>
      {!isLoadingGroup && (
        <FormControl>
          <label style={{ color: "#979797" }}>Group Memberships</label>
          <Box display={"flex"} gap={2} sx={{ flexWrap: "wrap" }} my={1}>
            {systemInfraGroupData &&
              systemInfraGroupData.infrastructure_groups.map(
                (data: any, key: number) => {
                  return (
                    <Chip
                      key={key}
                      label={data.name}
                      clickable
                      onClick={() => handleChipClick(data.name)}
                      sx={{
                        color: selectedGroups.includes(data.name)
                          ? "white"
                          : "#51abff",
                        backgroundColor: selectedGroups.includes(data.name)
                          ? "primary"
                          : "white",
                        border: "1px solid #51abff",
                        "&:hover": "none",
                      }}
                      color={
                        selectedGroups.includes(data.name)
                          ? "primary"
                          : "default"
                      }
                    />
                  );
                }
              )}
          </Box>
          <FormHelperText sx={{ color: "error.main" }}>
            {errors.groupMemberships &&
              touched.groupMemberships &&
              String(errors.groupMemberships)}
          </FormHelperText>

          <label style={{ color: "#979797" }}>
            Groups are used to help you filter and find servers and services
          </label>
        </FormControl>
      )}
    </>
  );
};

const AdministrativeConsoleUrlCard = ({ data, index }: any) => {
  const { handleChange, submitForm, touched, errors, values, setFieldValue } =
    useFormikContext<any>();

  const handleDeleteAdministrativeConsoleUrl = (
    setFieldValue: any,
    values: any,
    index: number
  ) => {
    const updatedAdministrativeConsoleUrls = [
      ...values.administrativeConsoleURLs,
    ];
    updatedAdministrativeConsoleUrls.splice(index, 1);
    setFieldValue(
      "administrativeConsoleURLs",
      updatedAdministrativeConsoleUrls
    );
  };

  const hasKey = (
    obj: any,
    key: string | number | symbol
  ): key is keyof typeof obj => key in obj;

  const hasNameError =
    hasKey(errors, "administrativeConsoleURLs") &&
    hasKey(errors.administrativeConsoleURLs, index) &&
    hasKey(touched, "administrativeConsoleURLs") &&
    hasKey(touched.administrativeConsoleURLs, index) &&
    errors.administrativeConsoleURLs[index]?.name &&
    touched.administrativeConsoleURLs[index]?.name;

  const hasUrlError =
    hasKey(errors, "administrativeConsoleURLs") &&
    hasKey(errors.administrativeConsoleURLs, index) &&
    hasKey(touched, "administrativeConsoleURLs") &&
    hasKey(touched.administrativeConsoleURLs, index) &&
    errors.administrativeConsoleURLs[index]?.url &&
    touched.administrativeConsoleURLs[index]?.url;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      gap={2}
    >
      <Box
        sx={[
          globalCss.cardBorderColorCss,
          {
            p: 1,
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          },
        ]}
      >
        <Box display={"flex"} gap={2}>
          <FormControl sx={{ flex: 1 }}>
            <label style={{ color: "#979797" }}>Name</label>

            <TextField
              name={`administrativeConsoleURLs[${index}].name`}
              value={values.administrativeConsoleURLs[index].name}
              onChange={handleChange}
              error={hasNameError}
              helperText={
                hasNameError
                  ? errors.administrativeConsoleURLs[index]?.name
                  : ""
              }
              type="text"
              size="small"
            />
          </FormControl>
          <FormControl sx={{ flex: 1 }}>
            <label style={{ color: "#979797" }}>Url</label>
            <TextField
              name={`administrativeConsoleURLs[${index}].url`}
              value={values.administrativeConsoleURLs[index].url}
              onChange={handleChange}
              error={hasUrlError}
              helperText={
                hasUrlError ? errors.administrativeConsoleURLs[index]?.url : ""
              }
              // error={Boolean(errors.administrativeConsoleURLs &&  errors.administrativeConsoleURLs[index].url && touched.administrativeConsoleURLs && (touched.administrativeConsoleURLs[index].url || ''))}
              // helperText={(touched.administrativeConsoleURLs && touched.administrativeConsoleURLs[index].url && errors.administrativeConsoleURLs && errors.administrativeConsoleURLs[index].url) || ''}
              type="text"
              size="small"
            />
          </FormControl>
        </Box>
        <Box>
          <Button
            onClick={() =>
              handleDeleteAdministrativeConsoleUrl(setFieldValue, values, index)
            }
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
    </Box>
  );
};

const BasicInformation = ({ mode, clone, getServerById,serverData }: Props) => {
  const { handleChange, submitForm, setFieldValue, touched, errors, values } =
    useFormikContext<any>();
  const [allServerData, setAllServerData] = useState<any>(serverData);

  const [selectedGroups, setSelectedGroups] = React.useState<string[]>(
    values.groupMemberships
  );
  const { isLoadingEnv, systemInfraEnvironmentData, errorEnv } = useSelector(
    getSystemInfraEnvironmentData
  );

 

  const handleAddAdministrativeConsoleUrl = (
    setFieldValue: any,
    values: any
  ) => {
    const newConsoleUrl = { name: "", url: "" };
    setFieldValue("administrativeConsoleURLs", [
      ...values.administrativeConsoleURLs,
      newConsoleUrl,
    ]);
  };



  return (
    <>
      {allServerData ? (
        <Box display={"flex"} flexDirection={"column"} gap={3} sx={{ mt: 2 }}>
          {clone && (
            <Box>
              <FormControl sx={{ width: "100%" }}>
                <label style={{ color: "#979797" }}>Cloned From</label>
                <Select
                  name="clonedFrom"
                  value={values.clonedFrom}
                  onChange={handleChange}
                  displayEmpty
                  variant="outlined"
                >
                  {allServerData.map((data: any, key: number) => (
                    <MenuItem
                      onClick={() => {
                        getServerById(data.id);
                      }}
                      key={key}
                      value={data.hostname}
                    >{`${data.id} (${data.hostname})`}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}

          <Box display={"flex"} gap={2} flexDirection={"column"}>
            <Box>
              <Typography sx={{ fontWeight: 600 }}>
                Basic System Information
              </Typography>
            </Box>
            <Stack direction={"row"} gap={2}>
              <Box flex={1} display={"flex"} flexDirection={"column"} gap={2}>
                <FormControl>
                  <label style={{ color: "#979797" }}>
                    FQDN (Fully Qualified Domian Name)
                  </label>
                  <TextField
                    name="fqdn"
                    value={values.fqdn as string}
                    onChange={handleChange}
                    type="text"
                    size="small"
                    error={Boolean(errors.fqdn && touched.fqdn)}
                    helperText={
                      errors.fqdn && touched.fqdn && String(errors.fqdn)
                    }
                  />
                </FormControl>
                {!isLoadingEnv && systemInfraEnvironmentData && (
                  <FormControl>
                    <label style={{ color: "#979797" }}>Environment</label>
                    <Select
                      name="environment"
                      value={values.environment}
                      onChange={handleChange}
                      displayEmpty
                      variant="outlined"
                      error={Boolean(errors.environment && touched.environment)}
                    >
                      {systemInfraEnvironmentData &&
                        systemInfraEnvironmentData.infrastructure_environments
                          .length > 0 &&
                        systemInfraEnvironmentData.infrastructure_environments.map(
                          (data: any) => (
                            <MenuItem value={data.name}>{data.name}</MenuItem>
                          )
                        )}
                    </Select>
                    <FormHelperText sx={{ color: "error.main" }}>
                      {errors.environment &&
                        touched.environment &&
                        String(errors.environment)}
                    </FormHelperText>
                  </FormControl>
                )}

                <GroupMembershipField
                  selectedGroups={selectedGroups}
                  setSelectedGroups={setSelectedGroups}
                  values={values}
                />
              </Box>
              <Box flex={1} display={"flex"} flexDirection={"column"} gap={2}>
                <FormControl>
                  <label style={{ color: "#979797" }}>ID</label>
                  <TextField
                    name="id"
                    value={values.id}
                    onChange={handleChange}
                    error={Boolean(errors.id && touched.id)}
                    helperText={errors.id && touched.id && String(errors.id)}
                    type="text"
                    size="small"
                  />
                </FormControl>
                <FormControl>
                  <label style={{ color: "#979797" }}>Network Zone</label>
                  <TextField
                    name="newtworkZone"
                    value={values.newtworkZone}
                    onChange={handleChange}
                    error={Boolean(errors.newtworkZone && touched.newtworkZone)}
                    helperText={
                      errors.newtworkZone &&
                      touched.newtworkZone &&
                      String(errors.newtworkZone)
                    }
                    type="text"
                    size="small"
                  />
                </FormControl>
                <FormControl>
                  <label style={{ color: "#979797" }}>Description</label>
                  <TextField
                    name="description"
                    defaultValue={values.description}
                    onChange={handleChange}
                    error={Boolean(errors.description && touched.description)}
                    helperText={
                      errors.description &&
                      touched.description &&
                      String(errors.description)
                    }
                    type="text"
                    size="small"
                  />
                </FormControl>
              </Box>
            </Stack>
          </Box>
          <Box display={"flex"} gap={2} flexDirection={"column"}>
            <Box mt={2}>
              <Typography sx={{ fontWeight: 600 }}>
                Administrative Console URLs
              </Typography>
            </Box>
            <Stack direction={"column"} gap={2}>
              <label style={{ color: "#979797" }}>
                These URLs are displayed as links when viewing information about
                this system
              </label>
              <Box display={"flex"} flexDirection={"column"} gap={2}>
                {values.administrativeConsoleURLs.length > 0 &&
                  values.administrativeConsoleURLs.map(
                    (data: any, index: number) => (
                      <AdministrativeConsoleUrlCard
                        values={values}
                        index={index}
                        key={index}
                      />
                    )
                  )}

                <Button
                  onClick={() =>
                    handleAddAdministrativeConsoleUrl(setFieldValue, values)
                  }
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
              </Box>
            </Stack>
          </Box>
        </Box>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default BasicInformation;
