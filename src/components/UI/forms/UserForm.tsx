import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getGroupsData } from "../../../redux/slice/groupsSlice";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import {
  createUsersApi,
  getUsersApi,
  updateUserApi,
} from "../../../services/webApis/webApis";
import { ICreateUserInterface } from "../../../interfaces/usersInterface";

type Props = {
  open: boolean;
  handleClose: () => void;
  defaultValues?: any;
  type: "ADD" | "EDIT";
  getUserAndGroupsDetails: () => void;
};
const style = {
  position: "absolute",
  width: "70%",
  maxWidth: "900px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#ffffff",
  borderRadius: "12px",
  px: 3,
  py: 4,
  maxHeight: "80vh",
  overflowY: "auto",
};
interface InitialValuesType {
  userName: string;
  fullName: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  mobilePhone: string;
  telephone: string;
  password: string;
  confirmPassword: string;
  groupMemberships: string[];
}

const UserForm = ({
  open,
  handleClose,
  defaultValues,
  type,
  getUserAndGroupsDetails,
}: Props) => {
  const [selectedMemberships, setSelectedMemberships] = React.useState<
    string[]
  >([]);

  const { groupsData } = useSelector(getGroupsData);

  const userValidationSchema = Yup.object({
    userName: Yup.string().required("User Name is required"),
    fullName: Yup.string().required("Full Name is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    emailAddress: Yup.string()
      .email()
      .required("Email is required")
      .test("Validate Email", "Email is not valid", (value) => {
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
      }),

    ...(type === "ADD"
      ? {
          password: Yup.string().required("Password is required"),
          confirmPassword: Yup.string()
            .required("Please re-type your password")
            .oneOf([Yup.ref("password")], "Passwords do not match"),
          mobilePhone: Yup.string().required("Mobile Phone is required"),
          telephone: Yup.string().required("Telephone is required"),
        }
      : {
          password: Yup.string(),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref("password")],
            "Passwords do not match"
          ),
          mobilePhone: Yup.string(),
          telephone: Yup.string(),
        }),

    groupMemberships: Yup.array(),
  });

  const { values, errors, setFieldValue, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        userName: "",
        fullName: "",
        firstName: "",
        lastName: "",
        emailAddress: "",
        mobilePhone: "",
        telephone: "",
        password: "",
        confirmPassword: "",
        groupMemberships: [],
      } as InitialValuesType,
      validationSchema: userValidationSchema,
      onSubmit: async (values: InitialValuesType) => {
        try {
          if (type === "ADD") {
            const response = await createUsersApi({
              groupMemberships: values.groupMemberships,
              userName: values.userName,
              fullName: values.fullName,
              firstName: values.firstName,
              lastName: values.lastName,

              mobilePhone: values.mobilePhone,
              telephone: values.telephone,

              emailAddress: values.emailAddress,
              userPassword: values.password,
            });
            handleClose();
            toast.success("User created successfully");
            getUserAndGroupsDetails();
          } else {
            const response = await updateUserApi(
              {
                groupMemberships: values.groupMemberships,
                userName: values.userName,
                fullName: values.fullName,
                firstName: values.firstName,
                lastName: values.lastName,

                mobilePhone: values.mobilePhone,
                telephone: values.telephone,

                emailAddress: values.emailAddress,
                userPassword: values.password,
              },
              values.userName
            );
            handleClose();
            toast.success("Changes saved succesfully");
            getUserAndGroupsDetails();
          }
        } catch (error) {
          toast.error(JSON.stringify(error));
        }
      },
    });

  const handleChipClick = (label: string) => {
    if (selectedMemberships.includes(label)) {
      setSelectedMemberships((prevSelected: string[]) =>
        prevSelected.filter((item: string) => item !== label)
      );
    } else {
      setSelectedMemberships((prevSelected: string[]) => [
        ...prevSelected,
        label,
      ]);
    }
  };

  React.useEffect(() => {
    if (defaultValues && type === "EDIT") {
      setFieldValue("userName", defaultValues.userName);
      setFieldValue("fullName", defaultValues.fullName);
      setFieldValue("firstName", defaultValues.firstName);
      setFieldValue("lastName", defaultValues.lastName);
      setFieldValue("emailAddress", defaultValues.emailAddress || "");
      setFieldValue("mobilePhone", defaultValues.mobilePhone || "");
      setFieldValue("telephone", defaultValues.telephone || "");
      setFieldValue("password", defaultValues.userPassword || "");
      setFieldValue("confirmPassword", defaultValues.confirmPassword || "");
      setFieldValue("groupMemberships", defaultValues.groupMemberships || []);
      setSelectedMemberships(defaultValues.groupMemberships);
    }
  }, [defaultValues, type]);

  React.useEffect(() => {
    setFieldValue("groupMemberships", selectedMemberships);
  }, [selectedMemberships]);
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
              <label>User Name</label>
              <TextField
                name="userName"
                onChange={handleChange}
                value={values.userName}
                required
                type="text"
                size="small"
              />
              {touched.userName && errors.userName && (
                <Typography color={"error"}>
                  {errors?.userName as string}
                </Typography>
              )}
            </FormControl>
            <FormControl>
              <label>Full Name</label>
              <TextField
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                required
                type="text"
                size="small"
              />
              {touched.fullName && errors.fullName && (
                <Typography color={"error"}>{errors?.fullName}</Typography>
              )}
            </FormControl>
            <Stack direction={"row"} gap={2}>
              <FormControl sx={{ flex: 1 }}>
                <label>First Name</label>
                <TextField
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  required
                  type="text"
                  size="small"
                />
                {touched.firstName && errors.firstName && (
                  <Typography color={"error"}>
                    {errors?.firstName as string}
                  </Typography>
                )}
              </FormControl>
              <FormControl sx={{ flex: 1 }}>
                <label>Last Name</label>
                <TextField
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  required
                  type="text"
                  size="small"
                />
                {touched.lastName && errors.lastName && (
                  <Typography color={"error"}>
                    {errors?.lastName as string}
                  </Typography>
                )}
              </FormControl>
            </Stack>
            <FormControl>
              <label>Email Address</label>
              <TextField
                name="emailAddress"
                value={values.emailAddress}
                onChange={handleChange}
                required
                type="text"
                size="small"
              />
              {touched.emailAddress && errors.emailAddress && (
                <Typography color={"error"}>
                  {errors?.emailAddress as string}
                </Typography>
              )}
            </FormControl>
            <Box display={"flex"} gap={2}>
              <FormControl sx={{ flex: "1" }}>
                <label>Mobile Number (SMS)</label>
                <PhoneInput
                  inputStyle={{ width: "100%", height: "40px" }}
                  country={"us"}
                  value={values.mobilePhone}
                  onChange={(phone) => setFieldValue("mobilePhone", phone)}
                />
                {touched.mobilePhone && errors.mobilePhone && (
                  <Typography color={"error"}>
                    {errors?.mobilePhone as string}
                  </Typography>
                )}
              </FormControl>
              <FormControl sx={{ flex: "1" }}>
                <label>Telephone Number</label>
                <PhoneInput
                  inputStyle={{ width: "100%", height: "40px" }}
                  country={"us"}
                  value={values.telephone}
                  onChange={(phone) => setFieldValue("telephone", phone)}
                />
                {touched.telephone && errors.telephone && (
                  <Typography color={"error"}>
                    {errors?.telephone as string}
                  </Typography>
                )}
              </FormControl>
            </Box>

            <FormControl>
              <label>Group Memberships</label>
              {groupsData && (
                <Box display={"flex"} gap={2} sx={{ flexWrap: "wrap" }}>
                  {groupsData.groups.map((label: string) => {
                    return (
                      <Chip
                        key={label}
                        label={label}
                        clickable
                        onClick={() => handleChipClick(label)}
                        sx={{
                          color: selectedMemberships.includes(label)
                            ? "white"
                            : "#51abff",
                          backgroundColor: selectedMemberships.includes(label)
                            ? "primary"
                            : "white",
                          border: "1px solid #51abff",
                          "&:hover": "none",
                        }}
                        color={
                          selectedMemberships.includes(label)
                            ? "primary"
                            : "default"
                        }
                      />
                    );
                  })}
                </Box>
              )}

              {touched.groupMemberships && errors.groupMemberships && (
                <Typography color={"error"}>
                  {errors?.groupMemberships as string}
                </Typography>
              )}
            </FormControl>
            <Box display={"flex"} flexDirection={"column"}>
              <FormControl>
                <label>Password</label>
                <TextField
                  name="password"
                  onChange={handleChange}
                  type="password"
                  size="small"
                />
                {touched.password && errors.password && (
                  <Typography color={"error"}>
                    {errors?.password as string}
                  </Typography>
                )}
              </FormControl>
              <FormControl>
                <label>Confirm Password</label>
                <TextField
                  name="confirmPassword"
                  onChange={handleChange}
                  type="password"
                  size="small"
                  error={!!(touched.confirmPassword && errors.confirmPassword)}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Typography color={"error"}>
                    {errors?.confirmPassword as string}
                  </Typography>
                )}
              </FormControl>
            </Box>

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
                {type === "ADD" ? "Create" : "Save Changes"}
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
  );
};

export default UserForm;
