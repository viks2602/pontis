import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSeversApi, getSystemDataApi } from "../../services/webApis/webApis";

type GetServerDataArgs = {
    item: string
}

export interface ServerDataInterface {
    isLoadingOSType: boolean,
    errorOSType: boolean,
    systemInfraOSTypeData: any[] | null,
}

export const initialState: ServerDataInterface = {
    isLoadingOSType: false,
    errorOSType: false,
    systemInfraOSTypeData: null,
}

export const getSystemInfratructureOSTypeDataFromApi = createAsyncThunk('getSystemInfratructureOSTypeDataFromApi', async () => {
  
    const response = await getSystemDataApi("infrastructure_os_types");
    return response;
});

const systemInfraOSTypeDataSlice = createSlice({
    name: 'systemInfraOSTypeData',
    initialState,
    reducers: { },
    extraReducers: (builder) => {

        // GET DASHBOARD BY ID 
        builder.addCase(getSystemInfratructureOSTypeDataFromApi.pending, (state) =>{
            state.isLoadingOSType = true,
            state.errorOSType = false
        })

        builder.addCase(getSystemInfratructureOSTypeDataFromApi.fulfilled, (state, action) =>{
            
            state.isLoadingOSType = false
            state.systemInfraOSTypeData = action.payload.data,
            state.errorOSType = false
           
        })

        builder.addCase(getSystemInfratructureOSTypeDataFromApi.rejected, (state) =>{
            state.isLoadingOSType = false,
            state.systemInfraOSTypeData = null,
            state.errorOSType = true
        })
    },
});

export const {} = systemInfraOSTypeDataSlice.actions;

export const getSystemInfraOSTypeData = (state: any) => state.systemInfraOSTypeData;

export default systemInfraOSTypeDataSlice.reducer;
