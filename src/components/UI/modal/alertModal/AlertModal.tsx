import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useFormik } from "formik";

type ModelProps = {
  open: boolean;
  handleClose: () => void;
  data: any;
};

type InitialValues = {
    alertId: string,
    alertType:string,
    certificateId: string,
    actionToTake:string,
    recipientEmail:string

}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "#ffffff",
  borderRadius: "12px",
  px: 3,
  py: 4,
};

const buttonStyle = {
  paddingX: "32px",
  borderRadius: "12px",
};

const AlertModel = ({ open, handleClose, data }: ModelProps) => {
  const { values, errors, handleChange } = useFormik({
    initialValues: {
      alertId: data?.row?.id ?? "",
      alertType: "",
      certificateId: data?.row?.certificateId ?? "",
      actionToTake: "",
      recipientEmail: "",
    } as InitialValues,
    onSubmit: () => {},
  });

  console.log(values);
  

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="model"
    >
      <Box sx={style}>
        <Stack rowGap={{ xl: 4, xs: 2 }}>
          <Typography fontSize="24px" fontWeight={500}>
            Take Action
          </Typography>
          <FormControl>
            <label>Alert Id</label>
            <TextField type="text" size="small" value={data?.row?.id ?? ""} />
          </FormControl>
          <FormControl>
            <label>Alert Type</label>
            <select className="model-select">
              <option value="">Select alert type</option>
              <option value="certification_expiration" selected={!!data?.row?.certificateId}>
                certificate expiration
              </option>
              <option value="absent_user">
                Absent user (user not logged in for a long time)
              </option>
              <option value="excessive_permissions">
                Excessive permission
              </option>
              <option value="guest_user">Guest users</option>
            </select>
          </FormControl>
          {data?.row?.certificateId && (
            <FormControl>
              <label>Certificate ID</label>
              <TextField
                type="text"
                size="small"
                value={data?.row?.certificateId ?? ""}
              />
            </FormControl>
          )}
          <FormControl>
            <label>Action to take</label>
            <select className="model-select" name='actionToTake' onChange={handleChange}>
              <option value="">Select action</option>
              <option value="transfer">Transfer to other department</option>
              <option value="terminate_account">Terminate account</option>
            </select>
          </FormControl>
          {values.actionToTake === 'transfer' ? (
            <FormControl>
                <label>Select department</label>
                <select className="model-select">
                    <option value="">Select department</option>
                    {/* IT, Front Desk, Super Admin, Sales, Maintenance */}
                    <option value="it">IT</option>
                    <option value="front_desk">Front Desk</option>
                    <option value="super_admin">Super Admin</option>
                    <option value="sales">Sales</option>
                    <option value="maintenance">Maintenance</option>
                </select>
            </FormControl>
          ) : null}
          <FormControl>
            <label>Recipient email Id</label>
            <TextField type="text" size="small" />
          </FormControl>
          <Box display="flex" columnGap={4}>
            <Button
              sx={[
                buttonStyle,
                { color: "#ffff", backgroundColor: "rgba(54, 159, 255, 1)" },
              ]}
              variant="contained"
            >
              SEND
            </Button>
            <Button
              onClick={handleClose}
              sx={[buttonStyle, { outlineColor: "rgba(54, 159, 255, 1)" }]}
              variant="outlined"
            >
              CANCEL
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AlertModel;
