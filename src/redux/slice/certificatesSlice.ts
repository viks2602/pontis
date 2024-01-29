import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCertificatesApi } from "../../services/webApis/webApis";

export interface DashboardDataInterface {
    isLoading: boolean,
    error: boolean,
    certificatesData: any[] | null
}

export const initialState: DashboardDataInterface = {
    isLoading: false,
    error: false,
    certificatesData: null
}

export const getCertificates = createAsyncThunk('getCertificates', async () => {
    const response = await getCertificatesApi();
    return response;
});

const certificatesSlice = createSlice({
    name: 'certificates',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        // GET DASHBOARD BY ID 
        builder.addCase(getCertificates.pending, (state) =>{
            state.isLoading = true,
            state.error = false
        })

        builder.addCase(getCertificates.fulfilled, (state, action) =>{
            state.isLoading = false
            state.certificatesData = action.payload.data,
            state.error = false
        })

        builder.addCase(getCertificates.rejected, (state) =>{
            state.isLoading = false,
            state.certificatesData = null,
            state.error = true
        })
    },
});

// export const {} = certificatesSlice.actions;

export const certificatesData = (state: any) => state.certificates;

export default certificatesSlice.reducer;
