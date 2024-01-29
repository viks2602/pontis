import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMetadataApi, getSeversApi } from "../../services/webApis/webApis";

type GetServerDataArgs = {
  item: string;
};

export interface ServerDataInterface {
  isLoadingMetaData: boolean;
  errorMetaData: boolean;
  metaData: any | null;
}

export const initialState: ServerDataInterface = {
  isLoadingMetaData: false,
  errorMetaData: false,
  metaData: {
    name: ""
  },
};

export const getMetaDataFromApi = createAsyncThunk(
  "getMetaDataFromApi",
  async ({ item }: GetServerDataArgs) => {
    const response = await getMetadataApi({ params: item });
    return response;
  }
);

const metaDataSlice = createSlice({
  name: "metaData",
  initialState,
  reducers: {
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
  },
  extraReducers: (builder) => {
    // GET DASHBOARD BY ID
    builder.addCase(getMetaDataFromApi.pending, (state) => {
      (state.isLoadingMetaData = true), (state.errorMetaData = false);
    });

    builder.addCase(getMetaDataFromApi.fulfilled, (state, action) => {
      state.isLoadingMetaData = false;
      (state.metaData = action.payload.data), (state.errorMetaData = false);
    });

    builder.addCase(getMetaDataFromApi.rejected, (state) => {
      (state.isLoadingMetaData = false),
        (state.metaData = null),
        (state.errorMetaData = true);
    });
  },
});

export const {setMetaData} = metaDataSlice.actions;

export const getMetaData = (state: any) => state.metaData;

export default metaDataSlice.reducer;
