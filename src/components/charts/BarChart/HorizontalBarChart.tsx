import { Box } from '@mui/material';

import { Chart as ChartJS, BarElement, LinearScale, CategoryScale} from 'chart.js';

import {Bar} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
)

const HorizontalBarChart = (data: any) => {
  
  const handleResize = (chart: ChartJS) => {
    chart.resize();
    }

  const options = {
    indexAxis: 'y' as const,
    events:[],
    layout:{
      padding:{
        right:25
      }
    },
    maintainAspectRatio: false,
    responsive: true,
    onresize: handleResize,
    scales:{
      x:{
        grid:{
          display:false
        },
        border:{
          display:false
        },
        ticks: {
          font: {
              size: 14,
          }
      }
      },
      y:{
        title: { display: true },
        grid:{
          display:false
        },
        border:{
          display:false
        },
        ticks: {
          font: {
              size: 14,
          }
      }
    }
    },
    animation: {
      duration: 1,
      onComplete: function({ chart }:{chart: ChartJS}) {
        const ctx = chart.ctx;
        ctx.fillStyle = 'grey';
    
        chart.config.data.datasets.forEach(function(dataset, i) {
          const meta = chart.getDatasetMeta(i);

          meta.data.forEach(function(bar, index) {
            const data = dataset.data[index];
    
            ctx.fillText(data+'', bar.x+2, bar.y +5);
          });
        });
      }
    },
    plugins: {
      legend: {
        display:false,
        position: 'bottom' as const,
        labels:{
          font:{
            size:16
          },
          usePointStyle: true,
        }
      },
    },
  };
  
  
  const labels = data?.data?.labels ?  data?.data?.labels : [];
  const dataList = {
    labels,
    datasets: data.data.datasets
  };


  return (
      <Box >
        <Bar 
          options={options} 
          data={dataList} 
          height={data?.data?.labels?.length * 100 / 1.5}
        />
      </Box>
  )
}

export default HorizontalBarChart