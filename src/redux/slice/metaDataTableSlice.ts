import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMetadataApi, getSeversApi } from "../../services/webApis/webApis";

type GetServerDataArgs = {
  item: string;
};

export interface ServerDataInterface {
  isLoadingMetaDataTable: boolean;
  errorMetaDataTable: boolean;
  metaDataTable: any[] | null;
}

export const initialState: ServerDataInterface = {
  isLoadingMetaDataTable: false,
  errorMetaDataTable: false,
  metaDataTable: null,
};

export const getTableMetaDataFromApi = createAsyncThunk(
  "getTableMetaDataFromApi",
  async ({ item }: GetServerDataArgs) => {
    const response = await getMetadataApi({params:item});
    return response;
  }
);

const metaDataTableSlice = createSlice({
  name: "metaDataTable",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET DASHBOARD BY ID
    builder.addCase(getTableMetaDataFromApi.pending, (state) => {
      (state.isLoadingMetaDataTable = true), (state.errorMetaDataTable = false);
    });

    builder.addCase(getTableMetaDataFromApi.fulfilled, (state, action) => {
      state.isLoadingMetaDataTable = false;
      (state.metaDataTable = action.payload.data),
        (state.errorMetaDataTable = false);
    });

    builder.addCase(getTableMetaDataFromApi.rejected, (state) => {
      (state.isLoadingMetaDataTable = false),
        (state.metaDataTable = null),
        (state.errorMetaDataTable = true);
    });
  },
});

export const {} = metaDataTableSlice.actions;

export const getTableMetaData = (state: any) => state.metaDataTable;

export default metaDataTableSlice.reducer;
