import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAlertsApi } from "../../services/webApis/webApis";

export interface AlertDataInterface {
    isLoading: boolean,
    error: boolean,
    alertsData: any,
    alertFilteredData: any[]
}

export const initialState: AlertDataInterface = {
    isLoading: false,
    error: false,
    alertsData: null,
    alertFilteredData:[]
}

export const getAlertsData = createAsyncThunk('getAlertsData', async () => {
    const response = await getAlertsApi();
    return response;
});

const alertsSlice = createSlice({
    name: 'alerts',
    initialState,
    reducers: {
        setAlertsFilteredData:(state, action)=>{
            state.alertFilteredData = action.payload
        }
    },
    extraReducers: (builder) => {

        // GET DASHBOARD BY ID 
        builder.addCase(getAlertsData.pending, (state) =>{
            state.isLoading = true,
            state.error = false
        })

        builder.addCase(getAlertsData.fulfilled, (state, action) =>{
            state.isLoading = false
            state.alertsData = action.payload.data,
            state.error = false
        })

        builder.addCase(getAlertsData.rejected, (state) =>{
            state.isLoading = false,
            state.alertsData = null,
            state.error = true
        })
    },
});

export const {
    setAlertsFilteredData
} = alertsSlice.actions;

export const alertsData = (state: any) => state.alerts;

export default alertsSlice.reducer;
