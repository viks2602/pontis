import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

import { timeFrameOptions } from "../../../data/constants";

const Filter = ({filterValue, handleChange, startDateValue, endDateValue, handleEndDateChange, handleStartDateChange, handleFilter}:any) => {

  return (
    <Box>
      <Select
        value={filterValue.days}
        size="small"
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        MenuProps={{
          PaperProps: {
            sx: {
              '& .MuiMenuItem-root': {
                padding: 1,
                width: '100%',
              },
              '& .Mui-selected': {
                color: '#98c6ef',
              },
              "& .MuiList-root": {
                padding: 2
              }
            },
          },
        }}
      >
        {timeFrameOptions.map((timeFrame) => (
          <MenuItem key={timeFrame.value} value={timeFrame.value}>{timeFrame.label}</MenuItem>
        ))}
        <Divider />
        <Box className='filter-date-picker'>
          <Typography>Custom Range</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs }>
            <DemoContainer components={['DatePicker', 'DatePicker']} sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <DatePicker
                value={startDateValue}
                onChange={handleStartDateChange}
                maxDate={endDateValue}  
              />
              <Typography fontSize={15}>to</Typography>
              <DatePicker
                value={endDateValue}
                onChange={handleEndDateChange}
                maxDate={dayjs()}  
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box display='flex' justifyContent='end' mt={1}>
          <Button 
            variant="contained" 
            sx={{
              backgroundColor:'rgba(142, 198, 248, 0.75)', 
              boxShadow:'none', 
              '&.MuiButton-root:hover':{
                backgroundColor:'rgba(142, 198, 248, 0.75)',
                boxShadow:'none'
              }
            }} 
            onClick={handleFilter}>Search</Button>
        </Box>
      </Select>
    </Box>
  );
};

export default Filter;



