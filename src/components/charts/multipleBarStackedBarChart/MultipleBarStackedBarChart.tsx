import React from 'react';

import { Box } from '@mui/material';

import { Chart as ChartJS, BarElement, LinearScale, CategoryScale} from 'chart.js';
import {Bar} from 'react-chartjs-2';

interface Props {
  datasets: any,
  labels: string[],
  height: number | string,
  x_axis_title: string,
  y_axis_title: string,
  legend:boolean,
  xAxisTicks:boolean
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
)

const MultipleBarStackedBarChart = ({datasets, labels, height,x_axis_title,y_axis_title, xAxisTicks}: Props) => {
  const chartBoxRef = React.useRef<HTMLElement|null>(null);

  React.useEffect(()=>{
    if(chartBoxRef.current){
      chartBoxRef.current.style.height = height+'px'
    }
  },[height])

  const options = {
    events:[],
    layout:{
      padding:{
        top:30,
        left:10,
      }
    },
    maintainAspectRatio: false,
    responsive: true,
    scales:{
      x:{
        stacked: true,
        title: { display: true, text: x_axis_title },
        grid:{
          display:false
        },
        ticks:{
          display:xAxisTicks ? true : false,
          maxRotation: 0,
          minRotation: 0
        },
        border:{
          display:false
        }
      },
      y:{
        stacked: true,
        title: { display: true, text: y_axis_title },
        grid:{
          display:false
        },
        border:{
          display:false
        }
      }
    },
    plugins: {
      legend: {
        display:false,
        position: 'bottom' as const,
        labels:{
          usePointStyle: true,
        }
      },
      
    },
  };

  return (
    <Box ref={chartBoxRef} id={`chart-box-${height}`}>
      <Bar
        options={options} 
        data={{datasets:datasets, labels}}
        />
    </Box>
  )
}

export default MultipleBarStackedBarChart