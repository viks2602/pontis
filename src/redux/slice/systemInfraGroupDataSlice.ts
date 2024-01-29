import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSeversApi, getSystemDataApi } from "../../services/webApis/webApis";

type GetServerDataArgs = {
    item: string
}

export interface ServerDataInterface {
    isLoadingGroup: boolean,
    errorGroup: boolean,
    systemInfraGroupData: any[] | null,
}

export const initialState: ServerDataInterface = {
    isLoadingGroup: false,
    errorGroup: false,
    systemInfraGroupData: null,
}

export const getSystemInfratructureGroupDataFromApi = createAsyncThunk('getSystemInfratructureGroupDataFromApi', async () => {
    const response = await getSystemDataApi("infrastructure_groups");
    return response;
});

const systemInfraGroupDataSlice = createSlice({
    name: 'systemInfraGroupData',
    initialState,
    reducers: { },
    extraReducers: (builder) => {

        // GET DASHBOARD BY ID 
        builder.addCase(getSystemInfratructureGroupDataFromApi.pending, (state) =>{
            state.isLoadingGroup = true,
            state.errorGroup = false
        })

        builder.addCase(getSystemInfratructureGroupDataFromApi.fulfilled, (state, action) =>{
            
            state.isLoadingGroup = false
            state.systemInfraGroupData = action.payload.data,
            state.errorGroup = false
           
        })

        builder.addCase(getSystemInfratructureGroupDataFromApi.rejected, (state) =>{
            state.isLoadingGroup = false,
            state.systemInfraGroupData = null,
            state.errorGroup = true
        })
    },
});

export const {} = systemInfraGroupDataSlice.actions;

export const getSystemInfraGroupData = (state: any) => state.systemInfraGroupData;

export default systemInfraGroupDataSlice.reducer;
