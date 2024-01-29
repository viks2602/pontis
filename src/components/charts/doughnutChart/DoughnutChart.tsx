import { Box, Typography } from "@mui/material";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

interface Labels {
  name: string;
  value: number | string;
  color: string;
}

ChartJS.register(Legend, Tooltip, ArcElement);

const DoughnutChart = (list: any) => {
  const labels: Labels[] = list.data.labels.map(
    (name: string, index: number) => ({
      name,
      value: list.data.datasets[0].data[index],
      color: list.data.datasets[0].backgroundColor[index],
    })
  );

  const data = {
    labels: list.data.labels,
    datasets: list.data.datasets,
  };

  const options: ChartOptions<"doughnut"> = {
    layout: {
      padding: {
        top: 24,
      },
    },
    maintainAspectRatio: false,
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

  const plugins = [
    {
      id: "doughnut-chart",
      afterDraw: function (chart: ChartJS) {
        if (chart.config.options?.elements?.arc?.circular !== undefined) {
          const { ctx } = chart;
          const chartHeight = chart.chartArea.height;
          const chartWidth = chart.chartArea.width;

          ctx.restore();

          const fontSize = (chart.width / 150).toFixed(2);
          // Make text1 bold by setting font-weight to "bold" only for text1
          ctx.font = `${Math.min(parseInt(fontSize), 1.2)}em Poppins`;

          ctx.textBaseline = "middle";
          ctx.fillStyle = "black";

          const text1 = list.data.totalTypes;
          const text2 = list.data.text_1;
          const text3 = list.data.text_2;
          const textX = Math.round(
            (chartWidth - ctx.measureText(text1).width) / 2
          );
          const textX2 = Math.round(
            (chartWidth - ctx.measureText(text2).width + 10) / 2
          );
          const textX3 = Math.round(
            (chartWidth - ctx.measureText(text3).width + 10) / 2
          );

          const textY = chartHeight / 2.4 + 24;

          // Set the font-weight to "bold" only for text1
          ctx.font = `bold ${Math.min(parseInt(fontSize), 1.2)}em Poppins`;

          ctx.fillText(text1, textX, textY);
          // Reset the font-weight to its previous value for the other text variables
          ctx.font = `${Math.min(parseInt(fontSize), 1)}em Poppins`;
          ctx.fillStyle = "grey";

          ctx.fillText(text2, textX2, textY + 20);
          ctx.fillText(text3, textX3, textY + 40);
          ctx.save();
        }
      },
    },
  ];

  const legends =
    list.data.labels &&
    list.data.labels.length &&
    labels.map((item: Labels, i: number) => {
      return (
        <div className="legend" key={i}>
          <div
            className="dot"
            style={{
              backgroundColor: item.color,
              height: "13px",
              width: "13px",
            }}
          ></div>
          <Box display="flex" justifyContent="space-between" width={"100%"}>
            <Typography component="span" className="label">
              {item.name}
            </Typography>
            <Typography component="span" fontWeight="bold" className="label">
              {item.value}
            </Typography>
          </Box>
        </div>
      );
    });

  return (
    <Box height="100%">
      <Box style={{ display: "flex", justifyContent: "center" }} mt={2}>
        <Doughnut
          height={185}
          data={data}
          options={options}
          plugins={plugins}
        />
      </Box>
      <Box display="flex" justifyContent="center" mt={3} width="100%">
        <Box className="chart-legends" width="100%">
          {legends}
        </Box>
      </Box>
    </Box>
  );
};

export default DoughnutChart;
