import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import AceEditor from "react-ace";
import React, { useEffect } from "react";
import {
  createMetadataApi,
  createMetadataTypesApi,
  getMetadataTypesApi,
  updateMetaDataApi,
} from "../../../../services/webApis/webApis";
import { useDispatch, useSelector } from "react-redux";
import {
  getTableMetaData,
  getTableMetaDataFromApi,
} from "../../../../redux/slice/metaDataTableSlice";
import {
  getMetaData,
  getMetaDataFromApi,
  setMetaData,
} from "../../../../redux/slice/metaDataSlice";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import { toast } from "react-toastify";

type Props = {};
const commonTitleTypographyStyle = {
  fontSize: { xl: "14px" },
  color: "#979797",
};

const NewMetaDataPage = (props: Props) => {
  const navigate = useNavigate();
  const [metaDataTypes, setMetaDatTypes] = React.useState<any>();
  const { state } = useLocation();
  
  const currentURL = window.location.href;
  const url = new URL(currentURL);

  const editParam = url.searchParams.get("edit");
  const viewParam = url.searchParams.get("view");

  const dispatch = useDispatch();
  const [jsonError, setJsonError] = React.useState<{
    error: boolean;
    message: any;
  }>({ error: false, message: "" });
  const { isLoadingMetaData, metaData } = useSelector(getMetaData);
  const [jsonData, setJsonData] = React.useState(
    JSON.stringify(JSON.parse(JSON.stringify(metaData)), null, 2)
  );

  useEffect(() => {
    dispatch(getTableMetaDataFromApi({ item: "ui_settings" }) as any);
  }, []);

  const getMetaDataTypes = async () => {
    const response = await getMetadataTypesApi();
    const nonEmptyTypes = response.data.types.filter(
      (type: string) => type !== ""
    );
    setMetaDatTypes(nonEmptyTypes);
  };

  React.useEffect(() => {
    getMetaDataTypes();
  }, []);

  const validationSchema = Yup.object({
    type: Yup.string().required("Type is required"),
  });
  type InitialValuesType = {
    type: string;
    metaData: any;
  };
  const buildParams = (type:string, metaData:any) => {
    if (metaData.id) {
      return `${type}/${metaData.id}`;
    } else if (metaData.name) {
      return `${type}/${encodeURIComponent(metaData.name)}`;
    } else {
      toast.error("Please provide either id and name in metaData");
      return ""; 
    }
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      type: "",
      metaData: "",
    } as InitialValuesType,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("meow")
      if (editParam === "true") {
        try {
          const response =await updateMetaDataApi({
            params: buildParams(values.type, values.metaData) ,
            data: values.metaData,
          })
          if (response.status === 200) {
            toast.success("MetaData Updated Successfully");
            navigate(-1);
          } else {
            toast.error(response?.data?.error || "Something went wrong");
          }
        } catch (error) {
          toast.error(error?.response?.data?.error || "Something went wrong");
        }
        

      } else {
        try {
          const response = await createMetadataApi({
            params: `${values.type}`,
            data: values.metaData,
          });
          if (response.status === 201) {
            toast.success("MetaData created successfully");
            navigate(-1);
          } else {
            toast.error(response?.data?.error || "Something went wrong");
          }
        } catch (error) {
          toast.error(error?.response?.data?.error || "Something went wrong");
        }
      }
    },
  });

  React.useEffect(() => {
    if (viewParam === "true" && state.metaData && state.metaDataType) {
      setJsonData(
        JSON.stringify(JSON.parse(JSON.stringify(state.metaData)), null, 2)
      );
      setFieldValue("type", state.metaDataType);
    }
    if (editParam === "true" && state.metaData && state.metaDataType) {
      setJsonData(
        JSON.stringify(JSON.parse(JSON.stringify(state.metaData)), null, 2)
      );
      dispatch(setMetaData(state.metaData));
      setFieldValue("type", state.metaDataType);
    }
  }, [viewParam, editParam]);

  const handleJsonChange = (newJsonContent) => {
    try {
      JSON.parse(newJsonContent);
      const formattedJson = JSON.stringify(JSON.parse(newJsonContent), null, 2);
      const parsedJson = JSON.parse(newJsonContent);

      setJsonData(formattedJson);
      setFieldValue("metaData", parsedJson);
      setFieldTouched("metaData", true);
      setJsonError({ error: false, message: "" });
    } catch (error) {
      setJsonData(newJsonContent);
      setJsonError({ error: true, message: error });
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
      </Box>
      <form onSubmit={handleSubmit}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mt={3}
        >
          <Typography fontSize={{ xl: "24px", sm: "20px", xs: "18px" }}>
            {editParam === "true"
              ? "Edit Metadata"
              : viewParam === "true"
              ? "View Metadata"
              : "Metadata"}
          </Typography>

          <Box display={`flex`} justifyContent={`space-between`}>
            {viewParam !== "true" ? (
              <Box display={"flex"} gap={2}>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => {
                    console.log("meow");
                  }}
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
                  {editParam === "true" ? "SAVE CHANEGES" : "CREATE"}
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate(-1);
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
            ) : (
              <Box display={"flex"} gap={2}>
                <Button
                  onClick={(e) => {
                    e.preventDefault(); 
                    console.log("onclick")
                    navigate(
                      "/dashboard/configuration/settings/metadata?view=false&edit=true",
                      {
                        state: {
                          metaData: state.metaData,
                          metaDataType: state.metaDataType,
                        },
                      }
                    );
                  }}
                  type="button"
                  variant="contained"
                  sx={{
                    width: "100px",
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
                  Edit
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate(-1);
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
            )}
          </Box>
        </Box>
        <Box display={"flex"} mt={3}>
          <Stack gap={1} width={"100%"}>
            {viewParam !== "true" && (
              <FormControl sx={{ width: "100%" }}>
                <Typography sx={commonTitleTypographyStyle}>Type</Typography>
                <Select
                  name="type"
                  value={values.type}
                  onChange={handleChange}
                  displayEmpty
                  error={Boolean(errors.type && touched.type)}
                  variant="outlined"
                  required
                >
                  {metaDataTypes &&
                    metaDataTypes.map((type: any, i: number) => {
                      return (
                        <MenuItem key={i} value={type}>
                          {type}
                        </MenuItem>
                      );
                    })}
                </Select>

                {touched.type && errors.type && (
                  <Typography color={"error"}>
                    {errors?.type as string}
                  </Typography>
                )}
              </FormControl>
            )}

            <FormControl>
              {jsonError.error && (
                <Box
                  sx={{
                    backgroundColor: "red",
                    color: "#fff",
                    p: 1,
                    mb: 2,
                    borderRadius: "3px",
                  }}
                >
                  <Typography>{jsonError.message.toString()}</Typography>
                </Box>
              )}
              <Typography sx={commonTitleTypographyStyle}>Metadata</Typography>
              {!isLoadingMetaData && jsonData && (
                <AceEditor
                  placeholder="Placeholder Text"
                  mode="json"
                  theme="github"
                  name="json-editor"
                  onChange={handleJsonChange}
                  fontSize={14}
                  showPrintMargin={false}
                  showGutter={true}
                  highlightActiveLine={true}
                  value={jsonData}
                  height="750px"
                  width="100%"
                  wrapEnabled={true}
                  setOptions={{
                    useWorker: false,
                    showLineNumbers: true,
                    tabSize: 2,
                  }}
                />
              )}
            </FormControl>
          </Stack>
        </Box>
      </form>
    </Box>
  );
};

export default NewMetaDataPage;
