import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import { dashboardDefaultData } from "../../../../../data/constants";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  dashboardData,
  setCreateDashboardData,
} from "../../../../../redux/slice/dashboardSlice";
import { createDashboardApi } from "../../../../../services/webApis/webApis";
import { toast } from "react-toastify";

const AddNewDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { newDashboardData } = useSelector(dashboardData);

  const [jsonData, setJsonData] = React.useState(
    JSON.stringify(JSON.parse(JSON.stringify(newDashboardData)), null, 2)
  );
  const [jsonError, setJsonError] = React.useState<{
    error: boolean;
    message: any;
  }>({ error: false, message: "" });

  const handleJsonChange = (newJsonContent) => {
    try {
      JSON.parse(newJsonContent);
      const formattedJson = JSON.stringify(JSON.parse(newJsonContent), null, 2);
      setJsonData(formattedJson);
      setJsonError({ error: false, message: "" });
    } catch (error) {
      setJsonData(newJsonContent);
      setJsonError({ error: true, message: error });
    }
  };

  const handleCreateDashboard = async () => {
    try {
      const response = await createDashboardApi(jsonData);
      if (response.status === 200) {
        toast.success("Dashboard created successfully");
        navigate(-1);
      } else {
        toast.error(response?.data?.error || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography fontSize={{ xl: "24px", sm: "20px", xs: "18px" }} mb={1}>
          Add Dashboard
        </Typography>
        <Box display="flex" gap={1} alignItems="center">
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/dashboard/configuration/dashboards/preview");
              dispatch(setCreateDashboardData(JSON.parse(jsonData)));
            }}
          >
            Preview
          </Button>
          <Button variant="contained" onClick={handleCreateDashboard}>
            Create
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              dispatch(setCreateDashboardData(dashboardDefaultData));
              navigate(-1);
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
      <Grid container>
        <Grid item md={12} position="relative">
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddNewDashboard;
