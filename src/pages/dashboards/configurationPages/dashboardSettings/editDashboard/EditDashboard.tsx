import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboardByIdApi,
  updateDashboardApi,
} from "../../../../../services/webApis/webApis";
import {
  dashboardData,
  setCreateDashboardData,
} from "../../../../../redux/slice/dashboardSlice";
import { toast } from "react-toastify";
import { dashboardDefaultData } from "../../../../../data/constants";

const EditDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { newDashboardData } = useSelector(dashboardData);
  const dashboardId = location.state;

  const upadate = sessionStorage.getItem("isUpdate");

  const [editDashboardData, setEditDashboardData] = useState("");
  const [jsonError, setJsonError] = React.useState<{
    error: boolean;
    message: any;
  }>({ error: false, message: "" });

  useEffect(() => {
    if (upadate == "true") {
      getData();
    } else {
      setEditDashboardData(
        JSON.stringify(JSON.parse(JSON.stringify(newDashboardData)), null, 2)
      );
    }
  }, []);

  async function getData() {
    try {
      const response = await getDashboardByIdApi(dashboardId);
      setEditDashboardData(
        JSON.stringify(JSON.parse(JSON.stringify(response.data)), null, 2)
      );
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }

  const handleJsonChange = (newJsonContent) => {
    try {
      JSON.parse(newJsonContent);
      const formattedJson = JSON.stringify(JSON.parse(newJsonContent), null, 2);
      setEditDashboardData(formattedJson);
      setJsonError({ error: false, message: "" });
      dispatch(setCreateDashboardData(formattedJson));
    } catch (error) {
      setEditDashboardData(newJsonContent);
      setJsonError({ error: true, message: error });
    }
  };

  const handleUpdateDashboard = async () => {
    try {
      const response = await updateDashboardApi(editDashboardData, dashboardId);
      if (response.status === 200) {
        toast.success("Dashboard Updated successfully");
        navigate("/dashboard/configuration/dashboards/list");
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography fontSize={{ xl: "24px", sm: "20px", xs: "18px" }} mb={1}>
          Edit Dashboard
        </Typography>
        <Box display="flex" gap={1} alignItems="center">
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/dashboard/configuration/dashboards/preview", {
                state: dashboardId,
              });
              dispatch(setCreateDashboardData(JSON.parse(editDashboardData)));
            }}
          >
            Preview
          </Button>
          <Button variant="contained" onClick={handleUpdateDashboard}>
            Save
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              dispatch(setCreateDashboardData(dashboardDefaultData));
              navigate(`/dashboard/configuration/dashboards`);
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
          {editDashboardData && (
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
              value={editDashboardData}
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditDashboard;
