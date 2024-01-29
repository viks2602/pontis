import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getGroupsApi } from "../../services/webApis/webApis";

interface IgroupsData {
  isLoading: boolean;
  error: boolean;
  groupsData: any[] | null;
}

export const getGroupsDataFromApi = createAsyncThunk(
  "getGroupsDataFromApi",
  async () => {
    const response = await getGroupsApi();
    console.log("eosdsdjsdclsdcsdc");
    console.log(response);
    return response;
  }
);

export const initialState: IgroupsData = {
  isLoading: false,
  error: false,
  groupsData: null,
};
const groupsSlice = createSlice({
  name: "Groups",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getGroupsDataFromApi.pending, (state) => {
      (state.isLoading = true), (state.error = false);
    }),
      builder.addCase(getGroupsDataFromApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groupsData = action.payload.data;
        state.error = false;
      }),
      builder.addCase(getGroupsDataFromApi.rejected, (state) => {
        (state.isLoading = false),
          (state.groupsData = null),
          (state.error = true);
      });
  },
});

export const {} = groupsSlice.actions;
export const getGroupsData = (state: any) => state.groups;
export default groupsSlice.reducer;
