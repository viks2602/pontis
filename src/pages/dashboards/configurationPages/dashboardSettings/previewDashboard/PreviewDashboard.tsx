import { useLocation, useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  Filter,
  CustomGrid,
  RenderLabel,
  RenderCard,
  RenderLineChart,
  RenderBarChartWidget,
  RenderCardArray,
  RenderDoughnutChart,
  RenderMultipleProgressBar,
  RenderArrayData,
  RenderHorizontalChart,
  RenderTableWidget,
  RenderTabsWidget,
  RenderMultipleProgressBarWithTotalBar,
  RenderStackBarChartWidget,
  RenderMultiBarStackedBarChartWidget,
  RenderCardHolder,
  RenderPamsCardArray,
  RenderTableWithActions,
} from "../../../../../components";
import {
  dashboardData,
  getDashboardDetails,
} from "../../../../../redux/slice/dashboardSlice";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Button } from "@mui/material";

const PreviewDashboard = () => {
  const location = useLocation();
  const params = useParams();
  
  const dashboardParamsId=params.id;

  const navigate=useNavigate();
  const { newDashboardData } = useSelector(dashboardData);

  const [displayPreviewData, setdisplayPreviewData] = React.useState<any>({});
  React.useEffect(() => {
    sessionStorage.setItem("isUpdate",'false')
    if (params?.id) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (typeof newDashboardData == "string") {
      setdisplayPreviewData(JSON.parse(newDashboardData));
    } else {
      setdisplayPreviewData(newDashboardData);
    }
  }, [newDashboardData]);

  
  const fetchData = async () => {
    const response = await getDashboardDetails({
      id: dashboardParamsId,
      ticksize: 3600000,
      filter: "",
    });
  };

  return (
    <Box>
      {(displayPreviewData && Object.keys(displayPreviewData).length <= 0) ||
        (!displayPreviewData && (
          <Box
            sx={{
              height: { xs: `calc(100vh - 76px)`, sm: `calc(100vh - 84px)` },
            }}
            display="flex"
            justifyContent={"center"}
            alignItems="center"
          >
            <Typography variant="h4">No Data Available</Typography>
          </Box>
        ))}
      {displayPreviewData && Object.keys(displayPreviewData).length > 0 && (
        <>
          <Box display="flex" justifyContent="space-between">
            <Typography
              fontSize={{ xl: "24px", sm: "20px", xs: "18px" }}
              mb={1}
            >
              Edit Dashboard
            </Typography>
            <Box display="flex" gap={1} alignItems="center">
              <Button
                variant="outlined"
                onClick={() => {                  
                  navigate(-1);
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
          <Stack
            width={"100%"}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography
              fontSize={{ xl: "30px", md: "24px", xs: "22px" }}
              fontWeight={500}
            >
              {displayPreviewData?.name}
            </Typography>
            <Stack direction={"row"} alignItems={"center"}>
              {displayPreviewData?.type?.split(",").includes("historical") ? (
                <Filter
                  filterValue={1}
                  handleChange={() => {}}
                  startDateValue={1}
                  endDateValue={1}
                  handleEndDateChange={() => {}}
                  handleStartDateChange={() => {}}
                  handleFilter={() => {}}
                />
              ) : null}
            </Stack>
          </Stack>
          <Box
            className="grid-container"
            sx={{
              minHeight: { xs: `calc(100vh - 76px)`, sm: `calc(100vh - 84px)` },
            }}
          >
            {displayPreviewData?.widgets.map((widget: any, index: number) => {
              return (
                <CustomGrid
                  key={index}
                  row={widget["row"]}
                  col={widget["col"]}
                  rowSpan={widget["size-y"]}
                  colSpan={widget["size-x"]}
                >
                  {widget.directive_type === "label" && (
                    <RenderLabel data={widget} />
                  )}
                  {widget.directive_type === "card" && (
                    <RenderCard data={widget} />
                  )}
                  {widget.directive_type === "line-chart" && (
                    <RenderLineChart data={widget} />
                  )}
                  {widget.directive_type === "bar-chart" && (
                    <RenderBarChartWidget data={widget} />
                  )}
                  {widget.directive_type === "card-array" && (
                    <RenderCardArray data={widget} />
                  )}
                  {widget.directive_type === "doughnut-chart" && (
                    <RenderDoughnutChart data={widget} />
                  )}
                  {widget.directive_type === "multiline-progress-bar" && (
                    <RenderMultipleProgressBar data={widget} />
                  )}
                  {widget.directive_type === "array" && (
                    <RenderArrayData data={widget} />
                  )}
                  {widget.directive_type === "horizontal-barchart" && (
                    <RenderHorizontalChart data={widget} />
                  )}
                  {widget.directive_type === "table" && (
                    <RenderTableWidget
                      data={
                        widget?.chart?.table_datasets
                          ? widget.chart.table_datasets[value]
                          : widget
                      }
                    />
                  )}
                  {widget.directive_type === "tabs" && (
                    <RenderTabsWidget
                      data={widget}
                      selectedTabIndex={value}
                      handleChange={handleTabChange}
                    />
                  )}
                  {widget.directive_type ===
                    "multiline-progress-with-total-bar" && (
                    <RenderMultipleProgressBarWithTotalBar data={widget} />
                  )}
                  {widget.directive_type === "stacked-bar-chart" && (
                    <RenderStackBarChartWidget data={widget} />
                  )}
                  {widget.directive_type === "multibar-stacked-bar-chart" && (
                    <RenderMultiBarStackedBarChartWidget data={widget} />
                  )}
                  {widget.directive_type === "card-holder" && (
                    <RenderCardHolder data={widget} />
                  )}
                  {widget.directive_type === "pams-card-array" && (
                    <RenderPamsCardArray data={widget} />
                  )}
                  {widget.directive_type === "table-with-actions" && (
                    <RenderTableWithActions data={widget} />
                  )}
                </CustomGrid>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
};

export default PreviewDashboard;