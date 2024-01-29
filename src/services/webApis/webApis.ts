import { ICreateClientSession } from "../../interfaces/clientInterface";
import { ICreateUserSession } from "../../interfaces/userSessionInterface";
import { ICreateUserInterface } from "../../interfaces/usersInterface";

import axiosInstances from "../axios";

// Get: List Alerts
export const getAlertsApi = async () => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.get(`/alerts`);
  return response;
};

// Get: List Alert Template
export const getListAlertsTemplatesApi = async () => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }

  const response = await axiosInstances.instance.get(`/alerts/template`);
  return response;
};

//Update: Modify/Save List Alerts
export const modifyListAlertsApi = async (alertId: string, data: any) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.put(
    `/alerts/${alertId}`,
    data
  );
  return response;
};

//Delete: Delete List Alerts
export const deleteListAlertsApi = async (alertId: string) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.delete(`/alerts/${alertId}`);
  return response;
};

// Get: Get Servers
export const getSeversApi = async (params?: String) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }

  if (!params) {
    try {
      console.log(!params);
      const response = await axiosInstances.instance.get(`/servers`);
      console.log(response);
      console.log("meow");
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  const response = await axiosInstances.instance.get(`/servers?item=${params}`);

  return response;
};

// Get: Get Server By ServerId
export const getServerByServerIdApi = async (serverId: String) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.get(`/servers/${serverId}/id,connection_urls,server_type,errors,status,disk,cpu,memory,hostname,environment,description,certs,network_zone,groups,console_urls,collector_hostname,connection_urls,disable_collection`);
  return response;
};

// Update: Update/Modify Server By ServerId (Enable/Disable Collections for server)
export const updateServerByServerIdApi = async (
  serverId: String,
  data: any
) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
 
  const response = await axiosInstances.instance.put(
    `/servers/${serverId}`,
    data
  );
  return response;
};

// Create: Create Server / Cloning Existing Server
export const createServerApi = async (data: any) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.post(`/servers`, data);
  return response;
};

//Delete: Delete Server
export const deleteServerApi = async (serverId: String) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.delete(`/servers/${serverId}`);
  return response;
};

// Test Connections
export const testConnectionsApi = async (data: any) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.post(
    `/connections/test`,
    data
  );
  return response;
};

// Get: Get Certificates
export const getCertificatesApi = async () => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.get(`/certs`);
  return response;
};

// CLIENT SESSION APIS
export const createClientSessionApi = async (data: ICreateClientSession) => {
  const response = await axiosInstances.instance.post(
    `/client/session`,
    JSON.stringify(data)
  );
  return response;
};

export const deleteClientSessionApi = async (clientRegKey: string) => {
  const response = await axiosInstances.instance.delete(
    `/client/session/${clientRegKey}`
  );
  return response;
};

// CONNECTION TEST APIS
export const createConnectionsTestApi = async (data: any) => {
  const response = await axiosInstances.instance.post(
    `/connections/test`,
    data
  );
  return response;
};

export const getConnectionsTestApi = async () => {
  const response = await axiosInstances.instance.get(`/connections/test`);
  return response;
};

export const editConnectionsTestApi = async (data: any, id: string) => {
  const response = await axiosInstances.instance.get(
    `/connections/test/${id}`,
    data
  );
  return response;
};

// DASHBOARD APIS
export const createDashboardApi = async (data: any) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.post(`/dashboards`, data);
  return response;
};

export const getDashboardsListApi = async () => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }

  const response = await axiosInstances.instance.get(`/dashboards`);
  return response;
};

export const getDashboardsApi = async (
  dashboardId: string,
  start: string,
  end: string,
  ticksize: number,
  customFilter: string
) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }

  const filter = `start=${start ? start : ""}&end=${
    end ? end : ""
  }&ticksize=${ticksize}`;

  const response = await axiosInstances.instance.get(
    `/dashboards/${dashboardId}?${filter}${customFilter}`
  );
  return response;
};

export const editDashboardApi = async (data: any, dashboardId: string) => {
  const response = await axiosInstances.instance.put(
    `/dashboards/${dashboardId}`,
    data
  );
  return response;
};

export const deleteDashboardApi = (dashboardId: string) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = axiosInstances.instance.delete(`/dashboards/${dashboardId}`);
  return response;
};

export const getDashboardByIdApi = async (dashboardId:string) => {
  const token = sessionStorage.getItem("token");
 
  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
 
  const response = await axiosInstances.instance.get(`/dashboards/${dashboardId}`);
  return response;
};

export const updateDashboardApi = async (data:any , dashboardId:any ) => {
 
  const token = sessionStorage.getItem("token");
 
  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.put(`/dashboards/${dashboardId}`, data);
  return response;
};

// GROUP APIS
export const getGroupsApi = async () => {
  const token = sessionStorage.getItem("token");
  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.get(`/groups`);

  return response;
};

// METADATA APIS
export const getMetadataTypesApi = async () => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.get(`/metadata/types`);
  return response;
};

export const getMetadataApi = async ({params}:{params:string}) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.get(`/metadata/${params}`);
  return response;
};

export const getMetadataAggregatorsMetaDataApi = async () => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.get(
    `/metadata/aggregator_metadata`
  );
  return response;
};

export const createMetadataTypesApi = async (data: any) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.post(
    `/metadata/types`,
    data
  );
  return response;
};

export const createMetadataApi = async ({params,data}:{params:string,data:any}) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.post(
    `/metadata/${params}`,
    data
  );
  return response;
};

export const updateMetaDataApi = async ({params,data}:{params:string,data:any}) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.put(
    `/metadata/${params}`,
    data
  );
  return response;
};

export const deleteMetaDataApi = async (params: string) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.delete(
    `/metadata/${params}`
  );
  return response;
};


// Get: List Script
export const getListScriptApi = async () => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.get(`/metadata/script`);
  return response;
};

// Create: Create Script
export const createListScriptApi = async (data: any) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.post(`/metadata/script`, data);
  return response;
};

// Update: Update/Edit Script
export const updateListScriptApi = async (data: any, scriptName: string) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.put(
    `/metadata/script/${scriptName}`,
    data
  );
  return response;
};

// Delete: Delete Script
export const deleteListScriptApi = async (scriptName: string) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.delete(
    `/metadata/script/${scriptName}`
  );
  return response;
};

export const getMetadataAggregatorsApi = async () => {
  const token = sessionStorage.getItem("token");

  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.get(
    `/metadata/aggregators_config`
  );
  return response;
};

// SYSTEM DATA APIS
export const getSystemDataTypesApi = async () => {
  const token = sessionStorage.getItem("token");
  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }

  const response = await axiosInstances.instance.get(`/systemdata/types`);
  return response;
};

export const getSystemDataApi = async (params: string) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }

  const response = await axiosInstances.instance.get(`/systemdata/${params}`);
  return response;
};

// Get: List Groups
export const getListGroupsApi = async () => {
  const token = sessionStorage.getItem("token");
  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.get(`/groups`);
  return response;
};

// USER APIS
export const createUsersApi = async (data: ICreateUserInterface) => {
  const response = await axiosInstances.instance.post(`/users`, data);
  return response;
};

export const getUsersApi = async (params?: string) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }

  if (params) {
    const response = await axiosInstances.instance.get(`/users/${params}`);
    return response;
  } else {
    const response = await axiosInstances.instance.get(`/users`);
    return response;
  }
};

// Modify user/ Change user password
export const updateUserApi = async (data: any, userName: string) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.put(
    `/users/${userName}`,
    data
  );
  return response;
};

// Delete User
export const deleteUserApi = async (userName: string) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.delete(`/users/${userName}`);
  return response;
};

//Change Password Self
export const changePasswordSelfApi = async (data: any) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    axiosInstances.instance.defaults.headers.accesstoken = token;
  }
  const response = await axiosInstances.instance.put(
    `/self/changePassword`,
    data
  );
  return response;
};

// USER SESSION APIS
export const createUserSessionApi = async (data: ICreateUserSession) => {
  const response = await axiosInstances.instance.post(
    `/user/session`,
    JSON.stringify(data)
  );
  return response;
};

export const getUserSessionApi = async (params?: string) => {
  if (params) {
    const response = await axiosInstances.instance.get(
      `/user/session/${params}`
    );
    return response;
  } else {
    const response = await axiosInstances.instance.get(`/user/session`);
    return response;
  }
};

export const deleteUserSessionApi = async (userName: string) => {
  const response = await axiosInstances.instance.delete(
    `/user/session/${userName}`
  );
  return response;
};
