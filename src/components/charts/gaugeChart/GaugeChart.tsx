import React, { useEffect, useState } from "react";

import GaugeChart from "react-gauge-chart";

const colors =[
    "#76d27f",
    "#76d27f",
    "#76d27f",
    "#76d27f",
    "#76d27f",
    "#76d27f",
    "#76d27f",
    "#76d27f",
    "#76d27f",
    "#76d27f",
    "#76d27f",
    "#76d27f",
    "#76d27f",
    "#face60",
    "#face60",
    "#face60",
    "#face60",
    "#face60",
    "#face60",
    "#f46240",
    "#f46240",
    "#f46240",
    "#f46240",
    "#f46240",
    "#f46240",
  ]

const arcs = [
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
  ]


const GaugeChartWithCustomNeedle = () => {

  const [percent] = useState(0.6);
  const [needleColor, setNeedleColor] = useState("#76d27f");

  useEffect(() => {
    if (percent > 0.5 && percent < 0.75)  setNeedleColor("#face60");
    else if (percent > 0.75) setNeedleColor("#f46240");
  }, []);


  return (
    <div className="gauge-chart-container">
      <GaugeChart
        id="gauge-chart6"
        animate={true}
        hideText={true}
        nrOfLevels={25}
        percent={percent}
        cornerRadius={0}
        needleColor={needleColor}
        needleBaseColor={needleColor}
        textColor="black"
        colors={colors}
        arcsLength={arcs}
        arcPadding={0.06}
      />
      <div className="center-number">2300</div>
    </div>
  );

};



export default GaugeChartWithCustomNeedle;
