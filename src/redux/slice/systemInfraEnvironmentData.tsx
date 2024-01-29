import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSeversApi, getSystemDataApi } from "../../services/webApis/webApis";

type GetServerDataArgs = {
    item: string
}

export interface ServerDataInterface {
    isLoadingEnv: boolean,
    errorEnv: boolean,
    systemInfraEnvironmentData: any[] | null,
}

export const initialState: ServerDataInterface = {
    isLoadingEnv: false,
    errorEnv: false,
    systemInfraEnvironmentData: null,
}

export const getSystemInfratructureEnvironmentDataFromApi = createAsyncThunk('getSystemInfratructureEnvironmentDataFromApi', async () => {
  
    const response = await getSystemDataApi("infrastructure_environments");
    return response;
});

const systemInfraEnvironmentDataSlice = createSlice({
    name: 'systemInfraEnvironmentData',
    initialState,
    reducers: { },
    extraReducers: (builder) => {

        // GET DASHBOARD BY ID 
        builder.addCase(getSystemInfratructureEnvironmentDataFromApi.pending, (state) =>{
            state.isLoadingEnv = true,
            state.errorEnv = false
        })

        builder.addCase(getSystemInfratructureEnvironmentDataFromApi.fulfilled, (state, action) =>{
            
            state.isLoadingEnv = false
            state.systemInfraEnvironmentData = action.payload.data,
            state.errorEnv = false
           
        })

        builder.addCase(getSystemInfratructureEnvironmentDataFromApi.rejected, (state) =>{
            state.isLoadingEnv = false,
            state.systemInfraEnvironmentData = null,
            state.errorEnv = true
        })
    },
});

export const {} = systemInfraEnvironmentDataSlice.actions;

export const getSystemInfraEnvironmentData = (state: any) => state.systemInfraEnvironmentData;

export default systemInfraEnvironmentDataSlice.reducer;
