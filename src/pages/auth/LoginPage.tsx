import React, { useEffect } from 'react'
import * as z from "zod";
import { Box, Button, Divider, FormControl, FormHelperText, Stack, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "react-toastify";

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import { AppDispatch } from '../../redux/store';
import { setUserDetails } from '../../redux/slice/userSlice';
import { dashboardData, setDashboardList, setFilteredDashboardList } from '../../redux/slice/dashboardSlice';

import { useAuth } from "../../context/AuthHandler";
import { createUserSessionApi, getDashboardsListApi } from '../../services/webApis/webApis';
import { DashboardListResponse } from '../../interfaces/dashboardInterfaces';
import { getSessionStorageData } from '../../common/helperFunctions';
import CustomLoader from '../../components/UI/MUILoader/CustomLoader';

import "react-toastify/dist/ReactToastify.css";


const LoginInputsSchema = z.object({
  username: z.string().min(1, { message:'username required'}),
  password: z.string().min(1, { message:'password required'}),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useAuth();

  const { filteredDashboards } = useSelector(dashboardData);

  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const { register, handleSubmit, formState: { errors }} = useForm<z.infer<typeof LoginInputsSchema>>({
    resolver: zodResolver(LoginInputsSchema)
  });

  const onSubmit: SubmitHandler<z.infer<typeof LoginInputsSchema>> = async(data) => {
    setLoading(true)
    try {

      if (!data.username || !data.password) {
        toast.error("Username and password are required.");
        return;
      }

      const response = await createUserSessionApi({
        userName: data.username,
        userPassword: data.password,
      });

      if (response.status === 200) {
        toast.success("Authentication Successful");
        console.log(response.data);
        
        const userDetails = {
          fullName:response.data.user.fullName,
          userName:response.data.user.userName,
          accessToken:response.data.accessToken
        }

        sessionStorage.setItem("userdetails", JSON.stringify(userDetails));
        sessionStorage.setItem("token", response.data.accessToken);
        
        dispatch(setUserDetails(response.data.user));

        const res = await getDashboardsListApi();
        dispatch(setDashboardList(res.data))

        const filteredDashboards: DashboardListResponse[] = res.data?.filter((dashboard:DashboardListResponse) => {
          const dashboardTypes = dashboard.type?.split(',');
          return dashboardTypes.includes('top-level') && dashboard.show
        });

        dispatch(setFilteredDashboardList(res.data));
        
        sessionStorage.setItem('dashboardData', JSON.stringify(res.data));
        
        auth?.login(response?.data?.accessToken);
        navigate(`/dashboard/${filteredDashboards[0].id}`);

      } else {
        toast.error("Failed to create a user session.");
      }
    } catch (error) {
      toast.error("Authentication Failed");
    }finally{
      setLoading(false)
    }
  };


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const navigateToSSO = () => {
    window.open('https://idpcloud.nycenet.edu/oidc/endpoint/default/authorize?response_type=token&client_id=dashboardclient&scope=openid&redirect_uri=https%3A%2F%2Fdashboard.nycenet.edu%2Fauthentication%2Fcallback%2F&state=uO7n7JD1IkEvdcuSCh7kgv5wHbRDUKT3', '_self');
  }

  React.useEffect(()=>{
    
    if(getSessionStorageData()?.accessToken){
      dispatch(setDashboardList(JSON.parse(sessionStorage.getItem('dashboardData')!)))
      dispatch(setFilteredDashboardList(JSON.parse(sessionStorage.getItem('dashboardData')!)))
    }
  },[]);

  useEffect(()=>{
    if(auth?.user){
      navigate(`/dashboard/${filteredDashboards[0]?.id}`)
     }
  },[auth?.user, filteredDashboards, navigate])


  return (
    <Box display='flex' justifyContent='center' flexDirection='column' alignItems='center' minHeight={'100vh'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <FormControl>
            <label htmlFor="username">Username</label>
            <TextField id="username" size='small' {...register('username')}/>
            {errors.username && <FormHelperText sx={{color:'red'}}>{errors.username.message}</FormHelperText>}
          </FormControl>
          <FormControl>
            <label htmlFor="password">Password</label>
            <TextField 
              id="password"
              size='small' 
              {...register('password')}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && <FormHelperText sx={{color:'red'}}>{errors.password.message}</FormHelperText>}
          </FormControl>
          <Button 
            variant="contained" 
            type='submit'
            disabled={loading}
            endIcon={loading ? <CustomLoader size={14} /> : null}
          >
            Login
          </Button>
        </Stack>
        <Divider sx={{my:2, color:'red'}}/>
        <Box>
          <Button variant='contained' sx={{width:'100%', fontWeight:'600'}} onClick={navigateToSSO}>SSO</Button>
        </Box>
      </form>
    </Box>
  )
}

export default LoginPage