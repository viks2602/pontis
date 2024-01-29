import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { useFormik } from "formik";
import { MuiChipsInput } from 'mui-chips-input'


interface AlertFormModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    defaultValues?: any;
  }

interface InitialValuesType {
    notificationType: string,
    alertName: string,
    recipientEmailId: string[],
    durationToAlert: string,
    durationToReminder: string,
    sendNotification: boolean
  }

const EditAlertForm = ({ open, setOpen, defaultValues }: AlertFormModalProps) => {

  const { values, errors, setFieldValue, handleChange, handleSubmit } = useFormik({
    initialValues: {
      notificationType: '',
      alertName: '',
      recipientEmailId: [],
      durationToAlert: '0',
      durationToReminder: '0',
      sendNotification: false
    } as InitialValuesType,
    onSubmit: (values) => {
       console.log(values);
    },
  });

  React.useEffect(()=>{
    if(defaultValues){
      setFieldValue('alertName', defaultValues.name)
      setFieldValue('notificationType', defaultValues.notifications[0].type)
      setFieldValue('recipientEmailId', [defaultValues.notifications[0].recipients])
      setFieldValue("durationToAlert",defaultValues?.trigger['minimum_duration']?.toString() || '0');
      setFieldValue("durationToReminder", defaultValues?.notifications[0]?.reminder?.toString() || '0')    
      setFieldValue("sendNotification", defaultValues.notifications[0].enabled)    
    }
  },[defaultValues]);

  const handleClose = () => setOpen(false);

  const handleRecipientChange = (newChips) => {
    setFieldValue('recipientEmailId', [...newChips])
  };

  // const onSubmit = async (data: alertSchemaT) => {
  //   alert(data.sendNotification);
  //   setToggleAlert("");
  //   setToggleReminder("");
  //   handleClose();
  //   reset();
  // };    

  return (
    <div>
      <Modal
        open={open}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", position:'absolute', /* top:10, bottom:10, left:0, right:0, */ overflowY:'auto' }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            minWidth: 400,
            width: "40%",
            minHeight: 200,
            bgcolor: "background.paper",
            borderRadius: 2,
            padding: 2,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack height={"100%"} width={"100%"}>
              <Typography id="modal-modal-title" sx={{ fontSize: "28px" }}>
                New Alert
              </Typography>
              <Stack sx={{ mt: 2 }}>
                
                <Stack>
                    <FormLabel>Alert Name</FormLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="alertName"
                    value={values.alertName}
                    onChange={handleChange}
                    required
                    inputProps={{ "aria-label": "Without label" }}
                    >
                    <MenuItem>ALert name</MenuItem>
                    </Select>
                </Stack>

                <Stack sx={{ mt: 1 }}>
                  <FormLabel>Recipient email ID</FormLabel>
                  <MuiChipsInput className="mui-chip" value={values.recipientEmailId} onChange={handleRecipientChange} />
                </Stack>

                <Stack sx={{ mt: 1 }}>
                    <Typography color={"primary"} sx={{ fontSize: "15px" }}>
                    Advanced Options
                    </Typography>
                    <Stack sx={{ mt: 1 }}>
                    <FormLabel>How long to wait before alerting?</FormLabel>
                    <ToggleButtonGroup
                    color="primary"
                    value={values.durationToAlert}
                    onChange={(e: any)=>setFieldValue("durationToAlert", e.target?.value)}
                    exclusive
                    aria-label="Platform"
                    >
                    <ToggleButton  sx={{flex:1}} value={"0"}>0s</ToggleButton>
                    <ToggleButton  sx={{flex:1}} value={"30"}>30s</ToggleButton>
                    <ToggleButton  sx={{flex:1}} value={"60"}>1m</ToggleButton>
                    <ToggleButton  sx={{flex:1}} value={"120"}>2m</ToggleButton>
                    <ToggleButton  sx={{flex:1}} value={"300"}>5m</ToggleButton>
                    <ToggleButton  sx={{flex:1}} value={"900"}>15m</ToggleButton>
                    <ToggleButton  sx={{flex:1}} value={'1800'}>30m</ToggleButton>
                    <ToggleButton  sx={{flex:1}} value={"3600"}>1h</ToggleButton>
                    </ToggleButtonGroup>
                    </Stack>
                </Stack>

                <Stack sx={{ mt: 1 }}>
                    <FormLabel>How long to wait before reminding?</FormLabel>
                    <ToggleButtonGroup
                    color="primary"
                    value={values.durationToReminder}
                    onChange={(e: any)=>setFieldValue("durationToReminder", e.target?.value)}
                    exclusive
                    aria-label="Platform"
                    >
                        <ToggleButton sx={{flex:1}} value="0">Disable</ToggleButton>
                        <ToggleButton sx={{flex:1}} value="-1">Immediate</ToggleButton>
                        <ToggleButton sx={{flex:1}} value="120">2m</ToggleButton>
                        <ToggleButton sx={{flex:1}} value="300">5m</ToggleButton>
                        <ToggleButton sx={{flex:1}} value="900">15m</ToggleButton>
                        <ToggleButton sx={{flex:1}} value="1800">30m</ToggleButton>
                        <ToggleButton sx={{flex:1}} value="3600">1h</ToggleButton>
                        <ToggleButton sx={{flex:1}} value="14400">4h</ToggleButton>
                        <ToggleButton sx={{flex:1}} value="28800">8h</ToggleButton>
                        <ToggleButton sx={{flex:1}} value="86400"> 1d</ToggleButton>
                    </ToggleButtonGroup>
                </Stack>

                <Stack sx={{ mt: 1 }}>
                    <FormControlLabel
                    control={
                        <Checkbox
                        defaultChecked
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setFieldValue("sendNotification", event.target.checked)    
                        }
                        />
                    }
                    label="Send Notifications"
                    sx={{ color: "gray" }}
                    />
                </Stack>
                </Stack>


                <Stack direction={"row"} gap={2} sx={{ mt: 1 }}>
                  <Button
                    type="submit"
                    // disabled={isSubmitting}
                    variant="contained"
                    disableRipple
                    sx={{
                      ":hover": {
                        background: "primary",
                      },
                      color: "white",
                    }}
                  >
                    Create
                  </Button>
                  <Button variant="outlined" disableRipple>
                    Test
                  </Button>
                  <Button
                    variant="contained"
                    disableRipple
                    color="error"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Stack>
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default EditAlertForm
