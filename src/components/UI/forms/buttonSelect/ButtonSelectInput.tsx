import { ToggleButtonGroup, ToggleButton } from '@mui/material'
import React from 'react'

const ButtonSelectInput = ({ value, handleChange }: any) => {
  return (
    <ToggleButtonGroup
        color="primary"
        value={value}
        onChange={handleChange}
        exclusive
        aria-label="Platform"
    >
        <ToggleButton sx={{flex:1}} value="0">Disable</ToggleButton>
        <ToggleButton sx={{flex:1}} value="-1">Immediate</ToggleButton>
        <ToggleButton sx={{flex:1}} value="120">2m</ToggleButton>
        <ToggleButton sx={{flex:1}} value="300">5m</ToggleButton>
        <ToggleButton sx={{flex:1}} value="900">15m</ToggleButton>
        <ToggleButton sx={{flex:1}} value="1800">30m</ToggleButton>
        <ToggleButton sx={{flex:1}} value="3600">1h</ToggleButton>
        <ToggleButton sx={{flex:1}} value="14400">4h</ToggleButton>
        <ToggleButton sx={{flex:1}} value="28800">8h</ToggleButton>
        <ToggleButton sx={{flex:1}} value="86400"> 1d</ToggleButton>
    </ToggleButtonGroup>
  )
}

export default ButtonSelectInput
