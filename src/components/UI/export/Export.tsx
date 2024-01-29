import React, { useState } from 'react'
import { Box, IconButton, Menu, MenuItem } from '@mui/material';

import { saveAs } from 'file-saver';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

import DownloadIcon from '@mui/icons-material/Download';

interface Column {
  field: string;
  headerName: string;
}

interface Props {
  rows: any;
  columns: Column[];
  filename: string;
}

const Export = ({rows,columns,filename}:Props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };



  const exportToCSV = (data:any, columns:Column[], fileName:string) => {
    const csvData = [];
    csvData.push(columns.map((column) => column.headerName));
    data.forEach((row:any) => {
      csvData.push(columns.map((column) => row[column.field]));
    });
    const csvContent = csvData.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${fileName}.csv`);
    setAnchorEl(null);
  };
  
  
  const exportToPDF = (data:any, columns:Column[], fileName:string) => {
    const doc = new jsPDF();
    autoTable(doc,{
      head: [columns.map((column) =>  column.headerName)],
      body: data.map((row:any) => columns.map((column) => row[column.field])),
    });
    doc.save(`${fileName}.pdf`);
    setAnchorEl(null);
  };

  return (
   <Box ml={'10px'}>
    <IconButton onClick={handleClick}>
      <DownloadIcon />
    </IconButton>
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={()=>exportToCSV(rows,columns,filename)}>
        Download as CSV
      </MenuItem>
      <MenuItem onClick={()=>exportToPDF(rows,columns,filename)}>
        Download as PDF
      </MenuItem>
    </Menu>
  </Box>
  )
}

export default Export