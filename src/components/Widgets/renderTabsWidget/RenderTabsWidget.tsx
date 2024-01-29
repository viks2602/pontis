import React from 'react'
import { Link } from 'react-router-dom'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import { TabData } from '../../../interfaces/widgetInterface';

interface Props {
  selectedTabIndex: number,
  data: any,
  handleChange: (event: React.SyntheticEvent, newValue: number, data: TabData) => void
}

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const RenderTabsWidget = ({data, selectedTabIndex, handleChange}: Props) => {
    return (
        <>
          <Tabs sx={{fontSize:'16px'}} value={selectedTabIndex} onChange={(event: React.SyntheticEvent, newValue: number)=>handleChange(event, newValue, data)} aria-label="basic tabs example">
            {data?.tabs?.map((item: string, index: number) => {
              return (
                <Tab  key={index} label={item} {...a11yProps(0)} component={Link} to ="#"/>
              )
            })}
          </Tabs>
        </>
      )
}

export default RenderTabsWidget