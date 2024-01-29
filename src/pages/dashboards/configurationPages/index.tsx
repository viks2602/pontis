import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const ConfigurationsWrapper = () => {
    const navigate = useNavigate();

    React.useEffect(()=>{
        if(location.pathname.endsWith('/dashboard/configuration/') || location.pathname.endsWith('/dashboard/configuration')) navigate('alerts')
    },[]);

    return <Outlet/>
}

export default ConfigurationsWrapper
