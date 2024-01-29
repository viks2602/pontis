import { configureStore } from "@reduxjs/toolkit";

import dashboardReducer from "../redux/slice/dashboardSlice";
import userReducer from "../redux/slice/userSlice";
import alertReducer from "../redux/slice/alertSlice";
import certificatesReducer from "../redux/slice/certificatesSlice";
import serverReducer from "../redux/slice/serverSlice";
import alertTemplateReducer from "../redux/slice/alertTemplateSlice";
import groupsDataReducer from "../redux/slice/groupsSlice";
import systemInfraGroupDataReducer from "./slice/systemInfraGroupDataSlice";
import systemEnvironmentGroupDataReducer from "./slice/systemInfraEnvironmentData";
import systemInfraOSTypeDataReducer from "./slice/systemInfraOSTypesData";
import systemInfraConnectionDataReducer from "./slice/sysemInfraConnectionUrlSlice";
import systemInfraSupportSoftwareReducer from "./slice/systemInfraSupportedSoftwareSlice";
import metaDataTableReducer from "./slice/metaDataTableSlice";
import metaDataReducer from "./slice/metaDataSlice";

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    user: userReducer,
    alerts: alertReducer,
    certificates: certificatesReducer,
    servers: serverReducer,
    alertTemplates: alertTemplateReducer,
    groups: groupsDataReducer,
    systemInfraGroupData: systemInfraGroupDataReducer,
    systemInfraEnvironmentData: systemEnvironmentGroupDataReducer,
    systemInfraOSTypeData:systemInfraOSTypeDataReducer,
    systemInfraConnectionData:systemInfraConnectionDataReducer,
    systemSupportSoftware:systemInfraSupportSoftwareReducer,
    metaDataTable:metaDataTableReducer,
    metaData:metaDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;

export default store;
