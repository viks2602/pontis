import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSeversApi } from "../../services/webApis/webApis";

type GetServerDataArgs = {
    item: string
}

export interface ServerDataInterface {
    isLoading: boolean,
    error: boolean,
    serverData: any[] | null,
}

export const initialState: ServerDataInterface = {
    isLoading: false,
    error: false,
    serverData: null,
}

export const getServerDataFromApi = createAsyncThunk('getServerDataFromApi', async ({item}: GetServerDataArgs) => {

    const response = await getSeversApi(item);
    return response;
});

const serverSlice = createSlice({
    name: 'Servers',
    initialState,
    reducers: { },
    extraReducers: (builder) => {

        // GET DASHBOARD BY ID 
        builder.addCase(getServerDataFromApi.pending, (state) =>{
            state.isLoading = true,
            state.error = false
        })

        builder.addCase(getServerDataFromApi.fulfilled, (state, action) =>{
            state.isLoading = false
            state.serverData = action.payload.data,
            state.error = false
        })

        builder.addCase(getServerDataFromApi.rejected, (state) =>{
            state.isLoading = false,
            state.serverData = null,
            state.error = true
        })
    },
});

export const {} = serverSlice.actions;

export const getServerData = (state: any) => state.servers;

export default serverSlice.reducer;
