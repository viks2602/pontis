import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSeversApi, getSystemDataApi } from "../../services/webApis/webApis";

type GetServerDataArgs = {
    item: string
}

export interface ServerDataInterface {
    isLoadingConnection: boolean,
    errorConnection: boolean,
    systemInfraConnectionData: any[] | null,
}

export const initialState: ServerDataInterface = {
    isLoadingConnection: false,
    errorConnection: false,
    systemInfraConnectionData: null,
}

export const getSystemInfratructureConnectionDataFromApi = createAsyncThunk('getSystemInfratructureConnectionDataFromApi', async () => {
  
    const response = await getSystemDataApi("infrastructure_connection_urls");
    return response;
});

const systemInfraConenctionDataSlice = createSlice({
    name: 'systemInfraConnectionData',
    initialState,
    reducers: { },
    extraReducers: (builder) => {

        // GET DASHBOARD BY ID 
        builder.addCase(getSystemInfratructureConnectionDataFromApi.pending, (state) =>{
            state.isLoadingConnection = true,
            state.errorConnection = false
        })

        builder.addCase(getSystemInfratructureConnectionDataFromApi.fulfilled, (state, action) =>{
            
            state.isLoadingConnection = false
            state.systemInfraConnectionData = action.payload.data,
            state.errorConnection = false
           
        })

        builder.addCase(getSystemInfratructureConnectionDataFromApi.rejected, (state) =>{
            state.isLoadingConnection = false,
            state.systemInfraConnectionData = null,
            state.errorConnection = true
        })
    },
});

export const {} = systemInfraConenctionDataSlice.actions;

export const getSystemInfraConnectionData = (state: any) => state.systemInfraConnectionData;

export default systemInfraConenctionDataSlice.reducer;
