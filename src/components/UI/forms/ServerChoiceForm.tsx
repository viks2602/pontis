import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import * as Yup from "yup";

type Props = {
  open: boolean;
  handleClose: () => void;
  serverData: any;
};
const style = {
  position: "absolute",
  width: "60%",
  maxWidth: "900px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#ffffff",
  borderRadius: "12px",
  px: 3,
  py: 4,
};

interface InitialValuesType {
  cloneServer: string;
  newServer: string;
}

const ServerChoiceForm = ({ open, handleClose, serverData }: Props) => {
  const currentPath = window.location.pathname;
  const segments = currentPath.split("/");
  const lastSegment = segments[segments.length - 1];

  const navigate = useNavigate();
  const [serverId, setServerId] = useState<string>("");

  const validationSchema = Yup.object({
    cloneServer: Yup.string().required(),
    newServer: Yup.string()
      .notOneOf(
        [Yup.ref("cloneServer")],
        "Server with this FQDN already exists"
      )
      .required("New FQDN is required"),
  });

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues: {
      cloneServer: "",
      newServer: "",
    } as InitialValuesType,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (validationSchema.isValidSync(values)) {
        if (lastSegment === "details") {
          const url = `../servers/server?cloneServer=${values.cloneServer}&serverId=${serverId}&newServer=${values.newServer}`;
          navigate(url);
        } else {
          const url = `server?cloneServer=${values.cloneServer}&serverId=${serverId}&newServer=${values.newServer}`;
          navigate(url);
        }
      }
    },
  });

  return (
    <>
      {serverData && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="model"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Stack gap={1}>
                <FormControl>
                  <label>Clone from existing server</label>
                  <Select
                    name="cloneServer"
                    defaultValue={values.cloneServer}
                    onChange={handleChange}
                    displayEmpty
                    variant="outlined"
                    required
                  >
                    {serverData.map((data: any) => (
                      <MenuItem
                        onClick={() => setServerId(data.id)}
                        value={data.hostname}
                      >{`${data.id} (${data.hostname})`}</MenuItem>
                    ))}
                  </Select>

                  {touched.cloneServer && errors.cloneServer && (
                    <Typography color={"error"}>
                      {errors?.cloneServer as string}
                    </Typography>
                  )}
                </FormControl>
                <FormControl>
                  <label>Enter the new FQDN</label>
                  <TextField
                    name="newServer"
                    onChange={handleChange}
                    value={values.newServer}
                    type="text"
                    size="small"
                  />
                  {touched.newServer && errors.newServer && (
                    <Typography color={"error"}>
                      {errors?.newServer as string}
                    </Typography>
                  )}
                </FormControl>
                <FormControl>
                  <Box display={"flex"} gap={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      disableRipple
                      sx={{
                        borderRadius: "10px",
                        ":hover": {
                          background: "primary",
                        },
                        color: "white",
                      }}
                    >
                      Create From Clone
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        if (lastSegment === "details") {
                          const url = `../servers`;
                          navigate(url);
                        } else {
                          navigate("server");
                        }
                      }}
                      disableRipple
                      sx={{
                        borderRadius: "10px",
                        ":hover": {
                          background: "primary",
                        },
                        color: "primary",
                      }}
                    >
                      Create From Scratch
                    </Button>
                  </Box>
                </FormControl>
              </Stack>
            </form>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ServerChoiceForm;
