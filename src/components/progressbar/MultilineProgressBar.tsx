import { Typography } from '@mui/material';

import './multilineProgressBar.scss';

interface Props {
    data: Dataset[],
    totalValue: number,
    scales?:boolean
}

export interface Dataset {
    name: string
    color: string
    value: number
  }

const MultiColorProgressBar = ({data, totalValue, scales}: Props) => {    
        
        const bars = data && data.length && data.map((item: Dataset, i:number) => {
            if(item.value > 0) {
                return (
                    <div className="bar" style={{'backgroundColor': item.color, 'width': (item.value/totalValue )*100 + '%'}}  key={i}>
                    </div>
                )
            }
        });


    const calibrations = scales === undefined &&  data && data.length && data.map(function(item: Dataset, i: number) {
        if(item.value > 0) {
            return (
                <div className="graduation" style={{'color': item.color, 'width': (item.value/totalValue )*100 + '%'}}  key={i}>
                    <div className='vertical_graduation' style={{backgroundColor:item.color}}></div>
                </div>
            )
        }
    });


    const values = scales===undefined  &&  data && data.length && data.map(function(item: Dataset, i: number) {
        if(item.value > 0) {
            return (
                <div className="value" style={{'color': "#ccccc", 'width': (item.value/totalValue )*100 + '%'}}  key={i}>
                    <Typography fontSize={'13px'} color={'grey'}>{item.value}</Typography>
                </div>
            )
        }
    }, this);
  
      return (
        <div className="multicolor-bar">
            <div className="values">
                {values}
            </div>
            <div className="scale" >
                {calibrations}
            </div>
            <div className="bars">
                {bars}
            </div>
        </div>
      );
  }

export default MultiColorProgressBar;
  