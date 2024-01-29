import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const DetailsWrapper = () => {
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(()=>{
        if(location.pathname.endsWith('/dashboard/details/') || location.pathname.endsWith('/dashboard/details')) navigate('/dashboard')
    },[]);

    return <Outlet/>
}

export default DetailsWrapper
