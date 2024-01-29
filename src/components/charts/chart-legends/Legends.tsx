import { Box, Typography } from "@mui/material";

const Legends = ({data}: any) => {
    
    return (
        <Box display="flex"  width={'100%'} justifyContent={"center"}  columnGap={2} paddingX={"5px"} flexWrap={'wrap'}/* width={'70%'} */>
            {data?.chart.datasets.length !== 1 ?
              data?.chart.datasets.map((item: any, i: number) => {
                return (
                  <Box
                    className="legend"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "5px",
                    }}
                    key={i}
                  >
                    <Box
                      className="dot"
                      style={{
                        backgroundColor:
                        item.backgroundColor,
                        height: "13px",
                        width: "13px",
                        borderRadius: "50%",
                      }}
                    ></Box>
                    <Typography component="span" className="label">
                      {item.label}
                    </Typography>
                  </Box>
                );
              }) : 
              data?.chart.labels.map((item: any, i: number) => {
                return (
                  <Box
                    className="legend"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "5px",
                    }}
                    key={i}
                  >
                    <Box
                      className="dot"
                      style={{
                        backgroundColor:
                        data?.chart.datasets[0].backgroundColor[i],
                        height: "13px",
                        width: "13px",
                        borderRadius: "50%",
                      }}
                    ></Box>
                    <Typography component="span" className="label">
                      {item}
                    </Typography>
                  </Box>
                );
              }) 
            }
          </Box>
      );
}

export default Legends