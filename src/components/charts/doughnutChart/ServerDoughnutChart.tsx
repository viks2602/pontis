import { Box, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

const ServerDoughnutChart = ({ serverData, type }: any) => {
  let percentage: number = 0.0;

  let parameterName: string = "";
  let color: string = "#53c65d"; // Default green color

  if (type === "cpu") {
    percentage = serverData?.data?.cpu?.percent_used || 0;
    parameterName = "CPU";
  } else if (type === "ram") {
    percentage = serverData?.data?.memory?.percent_used || 0;
    parameterName = "RAM";
  } else {
    const storage = serverData?.data?.disk?.items;
    percentage =
      storage?.reduce((total: any, item: any) => {
        return total + parseFloat(item.percent_used);
      }, 0) || 0;

    parameterName = "Storage";
  }

  if (percentage >= 36 && percentage <= 70) {
    color = "#f5cd19"; // Yellow color
  } else if (percentage > 70) {
    color = "#ff0000"; // Red color
  }

  const data = {
    labels: ["CPU"],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [color, "#e6eaed"],
        borderColor: [color, "#e6eaed"],
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    layout: {
      padding: {
        top: 24,
      },
    },
    maintainAspectRatio: false,
    cutout: "75%",
    elements: {
      arc: {
        circular: true,
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
        position: "bottom" as const,
        align: "center" as const,
        labels: {
          usePointStyle: true,
        },
      },
    },
  };

  return (
    <>
      <Box style={{ height: 120 }}>
        <Doughnut data={data} options={options} />
      </Box>
      <Box display="flex" justifyContent="center" flexDirection="column">
        <Box display="flex" justifyContent="center" mt={1}>
          <Typography
            fontSize={{ lg: "18px", md: "16px", xs: "14px" }}
            fontWeight={500}
          >
            {percentage}%
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <Typography className="label" color="gray">
            {parameterName}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ServerDoughnutChart;
