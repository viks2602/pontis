import Box from "@mui/material/Box"

import PamsDashboardCard from "../../UI/card/PamsDashboardCard"

const RenderPamsCardArray = ({data}: any) => {
  const cardArrayData = data.chart.items;

  return (
    <Box height={'100%'} display={'flex'} flexDirection='column' gap={2}>
      {cardArrayData.map((card, index: number)=>{
        return (
          <PamsDashboardCard cardData={card} index={index}/>
        )
    })}
    </Box>
  )
}

export default RenderPamsCardArray