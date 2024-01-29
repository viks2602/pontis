import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSeversApi, getSystemDataApi } from "../../services/webApis/webApis";

type GetServerDataArgs = {
    item: string
}

export interface ServerDataInterface {
    isLoadingSupportSoftware: boolean,
    errorSupportSoftware: boolean,
    systemSupportSoftware: any[] | null,
}

export const initialState: ServerDataInterface = {
    isLoadingSupportSoftware: false,
    errorSupportSoftware: false,
    systemSupportSoftware: null,
}

export const getSystemInfratructureSupportSoftwareDataFromApi = createAsyncThunk('getSystemInfratructureSupportSoftwareDataFromApi', async () => {
    const response = await getSystemDataApi("infrastructure_supported_software");
    return response;
});

const systemInfraSupportSoftwareDataSlice = createSlice({
    name: 'systemSupportSoftware',
    initialState,
    reducers: { },
    extraReducers: (builder) => {

        // GET DASHBOARD BY ID 
        builder.addCase(getSystemInfratructureSupportSoftwareDataFromApi.pending, (state) =>{
            state.isLoadingSupportSoftware = true,
            state.errorSupportSoftware = false
        })

        builder.addCase(getSystemInfratructureSupportSoftwareDataFromApi.fulfilled, (state, action) =>{
            
            state.isLoadingSupportSoftware = false
            state.systemSupportSoftware = action.payload.data,
            state.errorSupportSoftware = false
           
        })

        builder.addCase(getSystemInfratructureSupportSoftwareDataFromApi.rejected, (state) =>{
            state.isLoadingSupportSoftware = false,
            state.systemSupportSoftware = null,
            state.errorSupportSoftware = true
        })
    },
});

export const {} = systemInfraSupportSoftwareDataSlice.actions;

export const getSystemInfraSupportSoftwareData = (state: any) => state.systemSupportSoftware;

export default systemInfraSupportSoftwareDataSlice.reducer;
