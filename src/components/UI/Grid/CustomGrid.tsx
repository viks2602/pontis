import { Box } from "@mui/material";

interface Props {
    row:number,
    col: number, 
    rowSpan:number, 
    colSpan:number, 
    children: any
}

const CustomGrid = ({ row, col, rowSpan, colSpan, children }: Props) => {
  const gridItemStyle = {
    gridRow: {sm:`${row} / span ${rowSpan}`, xs:'auto'},
    gridColumn: {sm:`${col} / span ${colSpan}`, xs:`${1} / span ${12}`},
  };

  return (
      <Box className="grid-item" sx={gridItemStyle}  /* border={'1px solid red'} */>
            {children}
      </Box>
  );
};

export default CustomGrid;
