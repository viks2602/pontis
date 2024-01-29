import Box from "@mui/material/Box"

import RoleApplicationCard from "../../UI/card/RoleApplicationCard"
import CustomCard from "../../UI/card/Card"

import { globalCss } from "../../../styles/muiCss"

const RenderCardHolder = ({data}: any) => {
  return (
    <CustomCard  sx={globalCss.widgetCardContainer}>
      <Box>
        <RoleApplicationCard cardData={data.chart.items}/>
      </Box>
    </CustomCard>
  )
}

export default RenderCardHolder