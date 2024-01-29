// import * as yup from "yup";

// export const newServerValidationSchema = yup.object().shape({
//   clonedFrom: yup.string(),
//   fqdn: yup.string().required("FQDN is required"),
//   id: yup.string().required("ID is required"),
//   environment: yup.string().required("Environment is required"),
//   newtworkZone: yup.string().required("Network Zone is required"),
//   groupMemberships: yup
//     .array()
//     .of(yup.string().required("GroupMemberships is required")), // Assuming groupMemberships is an array of strings
//   description: yup.string().required("Description is required"),
//   administrativeConsoleURLs: yup.array().of(
//     yup.object().shape({
//       name: yup.string().required("Console name is required"),
//       url: yup
//         .string()
//         .matches(/^(https?):\/\/[^\s/$.?#].[^\s]*$/, "Enter a correct URL!")
//         .required("Console URL is required"),
//     })
//   ),
//   type: yup.string().required("Type is required"),
//   products: yup
//     .array()
//     .of(yup.string())
//     .min(1, "At least one product is required"),
//   serverRole: yup.string().required("Server Role is required"),
//   collectData: yup.boolean(),
//   dataCollectionURLs: yup.array().of(
//     yup.object().shape({
//       connectionType: yup.string().required("Connection type is required"),
//       login: yup.string().required("Login is required"),
//       url: yup
//         .string()

//         .required("URL is required"),
//       secMasterLogin: yup.string().required("Sec Master Login is required"),
//       password: yup.string().required("Password is required"),
//       name: yup.string().required("Name is required"),
//       secMasterPassword: yup
//         .string()
//         .required("Sec Master Password is required"),
//     })
//   ),
//   remoteCollectorHostname: yup
//     .string()
//     .required("Remote Collector Hostname is required"),
// });
import * as yup from "yup";

export const newServerValidationSchema = yup.object().shape({
  clonedFrom: yup.string(),
  fqdn: yup.string(),
  id: yup.string(),
  environment: yup.string(),
  newtworkZone: yup.string(),
  groupMemberships: yup.array().of(yup.string()),
  description: yup.string(),
  administrativeConsoleURLs: yup.array().of(
    yup.object({
      name: yup.string(),
      url: yup.string(),
    })
  ),
  type: yup.string(),
  serverTypeId: yup.string(),
  serverTypeType: yup.string(),
  products: yup.array().of(
    yup.object({
      id: yup.string(),
      label: yup.string(),
    })
  ),
  serverRole: yup.string(),
  collectData: yup.boolean(),
  dataCollectionURLs: yup.array().of(
    yup.object({
      type: yup.string(),
      login: yup.string(),
      url: yup.string(),
      sec_master_login: yup.string(),
      password: yup.string(),
      name: yup.string(),
      sec_master_password: yup.string(),
      search_base: yup.string(),
      client_id: yup.string(),
      client_password: yup.string(),
      database_driver: yup.string(),
      logParser: yup.string(),
      logfiles: yup.string(),
      priv_password: yup.string(),
      comuunity: yup.string(),
    })
  ),
  remoteCollectorHostname: yup.string(),
});
