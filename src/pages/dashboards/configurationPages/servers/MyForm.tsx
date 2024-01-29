import { Box, Button, FormControl, Switch, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { set } from "zod";

type Props = {};

interface InitialValuesType {
  servername: string;
  serverId: string;
  consoleUrl: { name: string; url: string }[];
  serverRole: string;
  collectData: boolean;
  dataCollectionUrls: {
    connectionType: string;
    url: string;
    name: string;
    password: string;
  }[];
}

const MyForm = (props: Props) => {
  const { values, errors, setFieldValue, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        servername: "",
        serverId: "",
        consoleUrl: [{ name: "", url: "" }],
        serverRole: "",
        collectData: false,
        dataCollectionUrls: [
          {
            connectionType: "",
            url: "",
            name: "",
            password: "",
          },
        ],
      } as InitialValuesType,
      onSubmit: (values) => {
        console.log(values);
      },
    });

  const handleAddConsoleUrl = () => {
    const newConsoleUrl = { name: "", url: "" };
    setFieldValue("consoleUrl", [...values.consoleUrl, newConsoleUrl]);
  };

  const handleDeleteConsoleUrl = (index: number) => {
    const updatedConsoleUrls = [...values.consoleUrl];
    updatedConsoleUrls.splice(index, 1);
    setFieldValue("consoleUrl", updatedConsoleUrls);
  };

  const handleAddConnectionUrl = () => {
    const newConnectionUrl = {
      connectionType: "",
      url: "",
      name: "",
      password: "",
    };
    setFieldValue("dataCollectionUrls", [
      ...values.dataCollectionUrls,
      newConnectionUrl,
    ]);
  };

  const handleDeleteConnectionUrl = (index: number) => {
    const updatedConnectionUrls = [...values.dataCollectionUrls];
    updatedConnectionUrls.splice(index, 1);
    setFieldValue("dataCollectionUrls", updatedConnectionUrls);
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box display={"flex"} flexDirection={"column"}>
          <FormControl>
            <label>Server Name</label>
            <TextField
              name="servername"
              onChange={handleChange}
              value={values.servername}
              required
              type="text"
              size="small"
            />
          </FormControl>
          <FormControl>
            <label>Server Id</label>
            <TextField
              name="serverId"
              onChange={handleChange}
              value={values.serverId}
              required
              type="text"
              size="small"
            />
          </FormControl>
          {values.consoleUrl.map((console, index) => (
            <Box border={"1px solid red"} sx={{ margin: "10px", width: "40%" }}>
              <FormControl key={index} className="consoleUrl">
                <label>Name</label>
                <TextField
                  name={`consoleUrl[${index}].name`}
                  onChange={handleChange}
                  value={console.name}
                  required
                  type="text"
                  size="small"
                />
                <label>Url</label>
                <TextField
                  name={`consoleUrl[${index}].url`}
                  onChange={handleChange}
                  value={console.url}
                  required
                  type="text"
                  size="small"
                />
                <Button
                  variant="outlined"
                  onClick={() => handleDeleteConsoleUrl(index)}
                >
                  Delete
                </Button>
              </FormControl>
            </Box>
          ))}
          <Button
            variant="outlined"
            sx={{ width: "50px" }}
            onClick={handleAddConsoleUrl}
          >
            ADD
          </Button>
          <FormControl>
            <label>Server Roles</label>
            <TextField
              name="serverRole"
              onChange={handleChange}
              value={values.serverRole}
              required
              type="text"
              size="small"
            />
          </FormControl>
          <FormControl>
            <label>Collect data</label>
            <Switch
              value={values.collectData}
              onChange={(e) => setFieldValue("collectData", e.target.checked)}
              {...label}
            />
          </FormControl>

          {values.dataCollectionUrls &&
            values.dataCollectionUrls.map((data: any, index: number) => (
              <FormControl>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "60%",
                    border: "1px solid pink",
                    margin: "10px",
                  }}
                >
                  <label>Connection Type</label>
                  <TextField
                    name={`dataCollectionUrls[${index}].connectionType`}
                    onChange={handleChange}
                    value={data.connectionType}
                    required
                    type="text"
                    size="small"
                  />
                  <label>Url</label>
                  <TextField
                    name={`dataCollectionUrls[${index}].url`}
                    onChange={handleChange}
                    value={data.url}
                    required
                    type="text"
                    size="small"
                  />
                  <label>Name</label>
                  <TextField
                    name={`dataCollectionUrls[${index}].name`}
                    onChange={handleChange}
                    value={data.name}
                    required
                    type="text"
                    size="small"
                  />
                  <label>Password</label>
                  <TextField
                    name={`dataCollectionUrls[${index}].password`}
                    onChange={handleChange}
                    value={data.password}
                    required
                    type="text"
                    size="small"
                  />
                  <Button variant="contained" sx={{ marginLeft: "10px" }}>
                    Test
                  </Button>
                  <Button
                    onClick={() => handleDeleteConnectionUrl(index)}
                    variant="contained"
                    sx={{ marginLeft: "10px", backgroundColor: "red" }}
                  >
                    Delete
                  </Button>
                </Box>
              </FormControl>
            ))}
          <Button
            variant="contained"
            onClick={handleAddConnectionUrl}
            sx={{ marginLeft: "10px", width: "100px" }}
          >
            Add
          </Button>
        </Box>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default MyForm;
