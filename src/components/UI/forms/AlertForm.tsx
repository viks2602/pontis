import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import ListSubheader, { ListSubheaderProps } from "@mui/material/ListSubheader";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CancelIcon from '@mui/icons-material/Cancel';
import { groupAlertsByCategory, templateAppliesToServer } from "../../../common/helperFunctions";

import { useFormik } from "formik";
import { MuiChipsInput } from 'mui-chips-input'
import { useSelector } from "react-redux";
import { getServerData } from "../../../redux/slice/serverSlice";
import { getAlertTemplateData } from "../../../redux/slice/alertTemplateSlice";
import ButtonSelectInput from "./buttonSelect/ButtonselectInput";
import { TextField } from "@mui/material";

interface AlertFormModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface InitialValuesType {
  server: string,
  alertType: string,
  notificationType: string,
  alertName: string,
  recipientEmailId: string[],
  durationToAlert: string,
  durationToReminder: string,
  sendNotification: boolean
}

function MyListSubheader(props: ListSubheaderProps) {
  return <ListSubheader {...props} />;
}  


const AlertForm = ({ open, setOpen }: AlertFormModalProps) => {
  const { alertTemplateData } = useSelector(getAlertTemplateData);
  const { serverData} = useSelector(getServerData);

  const [alertServerData, setAlertServerData] = React.useState<any>();
  const [selectedAlertData, setSelectedAlertData] = React.useState<any>();

  const { values, errors, setFieldValue, handleChange, handleSubmit } = useFormik({
    initialValues: {
      server: '',
      alertType: '',
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

  /*
    Use Effect for alert template filtration and
  **/
  React.useEffect(() => {
    if (serverData && alertTemplateData?.alertTemplates && values.server) {
      const _alertTemplateData = alertTemplateData.alertTemplates;
      const singleServerData = serverData.find((x) => x.id === values.server);

      const filteredAlerts = _alertTemplateData
        .filter((template) => templateAppliesToServer(singleServerData, template))
        .map((template) => ({
          serverId: singleServerData.id,
          alertId: template.id,
          alertName: template.name,
          alertCategory: template.category,
          templateData:template
      }));

      const groupedAlerts = groupAlertsByCategory(filteredAlerts);
      setFieldValue('alertName', '');
      setAlertServerData(groupedAlerts);
      setSelectedAlertData(null)
    }
  }, [serverData, alertTemplateData, values.server]);


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

  console.log("hjjhd")
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
                    <FormLabel>Server</FormLabel>
                    {serverData && (
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="server"
                        value={values.server}
                        onChange={handleChange}
                        displayEmpty
                        variant="outlined"
                        required
                      >
                        {serverData.map((data: any, i: number) => {
                          return (
                            <MenuItem key={i} value={data.id} >
                              {data.id}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    )}
                  </Stack>

                <Stack sx={{ mt: 1 }}>
                  <FormLabel>Recipient email ID</FormLabel>
                  <MuiChipsInput className="mui-chip" value={values.recipientEmailId} onChange={handleRecipientChange} />
                </Stack>

                <Stack sx={{ mt: 1 }}>
                  {alertServerData &&
                    Object.keys(alertServerData).length != 0 ? (
                      <Box>
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
                            {Object.entries(alertServerData).map(
                              (alertTemplate: any) => {
                                return [
                                  <MyListSubheader key={alertTemplate[0]}>
                                    {alertTemplate[0]}
                                  </MyListSubheader>,
                                    alertTemplate[1] &&
                                      alertTemplate[1].map((data: any) => {
                                        return (
                                          <MenuItem
                                            onClick={() => {
                                              const isAlertPresent =
                                                alertTemplateData?.alertTemplates?.filter(
                                                  (item: any) =>
                                                  item.id === data.alertId
                                                );
                                              if (isAlertPresent) {                                              
                                                setSelectedAlertData(alertTemplate[1]);
                                              }
                                            }}
                                            key={data.alertName}
                                            value={data.alertName}
                                          >
                                            {data.alertName}
                                          </MenuItem>
                                        );
                                      }),
                                ];
                              }
                            )}
                          </Select>
                          {errors.alertName && (
                            <Typography color={"error"}>
                              {errors?.alertName?.message as string}
                            </Typography>
                          )}
                        </Stack>
                        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                          <Stack sx={{ flex: 1 }}>
                            <FormLabel>Alert Type</FormLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              name="alertType"
                              value={values.alertType}
                              onChange={handleChange}
                              required
                              inputProps={{ "aria-label": "Without label" }}
                            >
                              <MenuItem value={"User"}>User</MenuItem>
                              <MenuItem value={"System"}>System</MenuItem>
                            </Select>
                          </Stack>
                          <Stack sx={{ flex: 1 }}>
                            <FormLabel>Notification Type</FormLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              name="notificationType"
                              value={values.notificationType}
                              onChange={handleChange}
                              required
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                            >
                              <MenuItem value={""} sx={{textTransform:'capitalize'}}>Select notification type</MenuItem>
                              { selectedAlertData && 
                                selectedAlertData[0].templateData.notifications.map( notification => (
                                  <MenuItem value={notification?.type} sx={{textTransform:'capitalize'}}>{notification.type}</MenuItem>
                                ))
                              }
                            </Select>
                          </Stack>
                        </Box>
                        {
                          selectedAlertData && selectedAlertData.length > 0 && (
                            <Box mt={1}>
                              {
                                selectedAlertData[0]?.templateData?.variables.length > 0 && selectedAlertData[0].templateData.variables.map( item => {
                                  return (
                                  <Stack >
                                    <FormLabel>{item.description}</FormLabel>
                                    {item.type === 'buttonSelect' && <ButtonSelectInput/>}
                                    {item.type === 'select' && 
                                      <Select>
                                        {item.lookup.length > 0 ? item.lookup.map( data => (
                                          <MenuItem value={data}>{data}</MenuItem>
                                        )) : <MenuItem>No options available</MenuItem>}
                                      </Select>}
                                    {item.type === 'number' && <TextField/>}
                                  </Stack>
                                )})
                              }
                            </Box>
                          )
                        }
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
                      </Box>
                    ) : (
                      <Box display='flex' gap={1} alignItems='center' borderRadius={'10px'} p={2} color={'#fff'} bgcolor={'#f46162'}>
                        <CancelIcon/> <Typography>{ !values.server ? "Please select server first" : "template is not present for this alert" }</Typography>
                      </Box>
                    )}
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
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AlertForm;
