import { Box } from '@mui/material';

import { 
  Chart as ChartJS, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, Tooltip, Filler, Legend, CategoryScale 
} from 'chart.js';

import {Line} from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler, 
  Legend
)

const LineChart = ({datasets, labels, height,x_axis_title,y_axis_title}: any) => {
  const options = {
    borderWidth:2,
    pointRadius:1.5,
    layout:{
      padding: {          
        left:-5,
        bottom:15          
      }
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        max: Math.max(...datasets[0].data) + 100,
        suggestedPadding: 20,
        beginAtZero:true,
        title:{
          display:true,
          text:y_axis_title
        },
        grid:{
            color:'#f2f3f5',
            drawTicks:false,
        },
        border:{
            display:false
          },
          ticks:{
            stepSize:Math.max(...datasets[0].data) < 999 ? (Math.max(...datasets[0].data)/6).toFixed(0) : (Math.max(...datasets[0].data)/6).toFixed(0),
            callback: (value: any) => {
              if(value < 999) return value.toFixed(0)
              else if(value > 999) return (value/1000).toFixed(0) + 'k'
            },
            padding:10,
              font: {
                  size: 14,
              }
          }
      },
      x: {
        title:{
          display:true,
          text:x_axis_title
        },
        grid:{
            color:'#f2f3f5',
            drawTicks:false,
        },
        border:{
            display:false
        },
        ticks:{
          padding:5,
          font: {
              size: 14,
          },
          maxRotation: 0,
          minRotation: 0
        },
      },
    },
    plugins:{
        legend: {
            display: false,
            labels:{
              usePointStyle: true,
            }
        },
    }
  }

  return (
      <Box style={{height:height}} >
        <Line
            data={{datasets:datasets, labels}}
            options={options}           
        />
      </Box>
  )

}

export default LineChart