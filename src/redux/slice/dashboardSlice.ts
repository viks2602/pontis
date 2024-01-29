import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { DashboardDetails } from "../../interfaces/widgetInterface";
import { DashboardListResponse, GetDashboardByIdQuery } from "../../interfaces/dashboardInterfaces";

import { getDashboardsApi } from "../../services/webApis/webApis";
import { dashboardDefaultData } from "../../data/constants";

export interface DashboardDataInterface {
    isLoading: boolean,
    dashBoardList: DashboardListResponse[],
    filteredDashboards: DashboardListResponse[],
    dashBoardDetails: null | DashboardDetails,
    error: boolean,
    newDashboardData: DashboardListResponse[]
}

export const initialState: DashboardDataInterface = {
    isLoading: false,
    dashBoardList: [],
    filteredDashboards:[],
    dashBoardDetails: null,
    error: false,
    newDashboardData:dashboardDefaultData
}


export const getDashboardDetails = createAsyncThunk('getDashboardDetails', async ({id, start="", end="", ticksize=36000000, filter=""}: GetDashboardByIdQuery) => {
    const response = await getDashboardsApi(id, start, end, ticksize, filter);
    return response;
});

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setDashboardDataAsNull: (state) => {
            state.dashBoardDetails = null
        },
        setDashboardList: (state, action) => {
            state.dashBoardList = action.payload;
        },
        setFilteredDashboardList: (state, action) => {
            const filteredData = action.payload?.filter((dashboard:DashboardListResponse) => {
                const dashboardTypes = dashboard.type?.split(',');
                return dashboardTypes.includes('top-level') && dashboard.show
              });
            state.filteredDashboards = filteredData;
        },
        setCreateDashboardData:(state, action) => {
            state.newDashboardData = action.payload;
        }
    },
    extraReducers: (builder) => {

        // GET DASHBOARD BY ID 
        builder.addCase(getDashboardDetails.pending, (state) =>{
            state.isLoading = true,
            state.error = false
        })

        builder.addCase(getDashboardDetails.fulfilled, (state, action) =>{
            state.isLoading = false
            state.dashBoardDetails = action.payload.data,
            state.error = false
        })

        builder.addCase(getDashboardDetails.rejected, (state) =>{
            state.isLoading = false,
            state.dashBoardDetails=null,
            state.error = true
        })
    },
});

export const {
    setDashboardDataAsNull, 
    setDashboardList,
    setFilteredDashboardList,
    setCreateDashboardData
} = dashboardSlice.actions;

export const dashboardData = (state) => state.dashboard;

export default dashboardSlice.reducer;
