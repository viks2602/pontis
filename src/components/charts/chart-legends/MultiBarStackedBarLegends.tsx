import { Box, Typography } from "@mui/material";

type LegendType = {
    name: string,
    color: string
}
const MultiBarStackedBarLegends = ({ data }: any) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width={"100%"}
      alignItems={"center"}
      paddingX={"5px"}
      flexWrap={"wrap"}
    >
      {data.map((item, i: number) => (
        <Box key={i} display="flex" gap='8px' mt={'5px'}>
            <Typography color={'#8C97A7'} mb={1}>
                {item?.legend_category}:&nbsp;&nbsp;
            </Typography>
          {item.legends.map((legend: LegendType, index: number) => (
            <Box
              className="legend"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "5px",
              }}
              key={index}
            >
              <Box
                className="dot"
                style={{
                  backgroundColor: legend.color,
                  height: "8px",
                  width: "8px",
                  borderRadius: "50%",
                }}
              ></Box>
              <Typography  color={'#8C97A7'} component="span" className="label">
                {legend.name}
              </Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default MultiBarStackedBarLegends;
