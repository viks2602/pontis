import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getListAlertsTemplatesApi } from "../../services/webApis/webApis";

export interface ServerDataInterface {
    isLoading: boolean,
    error: boolean,
    alertTemplateData: any[] | null,
}

export const initialState: ServerDataInterface = {
    isLoading: false,
    error: false,
    alertTemplateData: null,
}

export const getAlertTemplateDataFromApi = createAsyncThunk('getAlertTemplateDataFromApi', async () => {
    const response = await getListAlertsTemplatesApi();
    return response;
});

const alertTemplateSlice = createSlice({
    name: 'alertTemplate',
    initialState,
    reducers: { },
    extraReducers: (builder) => {

        // GET DASHBOARD BY ID 
        builder.addCase(getAlertTemplateDataFromApi.pending, (state) =>{
            state.isLoading = true,
            state.error = false
        })

        builder.addCase(getAlertTemplateDataFromApi.fulfilled, (state, action) =>{
            state.isLoading = false
            state.alertTemplateData = action.payload.data,
            state.error = false
        })

        builder.addCase(getAlertTemplateDataFromApi.rejected, (state) =>{
            state.isLoading = false,
            state.alertTemplateData = null,
            state.error = true
        })
    },
});

export const {} = alertTemplateSlice.actions;

export const getAlertTemplateData = (state: any) => state.alertTemplates;

export default alertTemplateSlice.reducer;
