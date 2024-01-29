import {
  Box,
  Button,
  FormControl,
  Modal,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import * as Yup from "yup";
import { useFormik } from "formik";
import { createMetadataTypesApi } from "../../../services/webApis/webApis";
import { toast } from "react-toastify";
const NewSetting = ({
  open,
  handleClose,
  getMetaDataTypes,
}: {
  open: boolean;
  handleClose: () => void;
  getMetaDataTypes: () => void;
}) => {
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
    py: 3,
  };

  const validationSchema = Yup.object({
    type: Yup.string().required("Type is required"),
    id: Yup.string().required("ID of type is required"),
  });

  type InitialValuesType = {
    id: string;
    type: string;
  };
  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues: {
      id: "",
      type: "",
    } as InitialValuesType,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      try {
        const response = await createMetadataTypesApi({
          name: values.type,
          id: values.id,
        });
        if (response.status === 201) {
          toast.success("Type created successfully");
          getMetaDataTypes();
          handleClose();
        } else {
          toast.error(response?.data?.error || "Something went wrong");
        }
      } catch (error) {
        toast.error(error?.response?.data?.error || "Something went wrong");
      }
    },
  });

  return (
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
              <label>Name</label>
              <TextField
                name="type"
                onChange={handleChange}
                value={values.type}
                type="text"
                size="small"
                error={Boolean(errors.type && touched.type)}
                helperText={errors.type && touched.type && String(errors.type)}
              />
            </FormControl>
            <FormControl>
              <label>Id of Type</label>
              <TextField
                name="id"
                onChange={handleChange}
                value={values.id}
                type="text"
                size="small"
                error={Boolean(errors.id && touched.id)}
                helperText={errors.id && touched.id && String(errors.id)}
              />
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
                  Create
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleClose()}
                  disableRipple
                  sx={{
                    backgroundColor: "error.main",
                    borderRadius: "10px",
                    ":hover": {
                      backgroundColor: "error.main",
                    },
                    color: "white",
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </FormControl>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default NewSetting;
