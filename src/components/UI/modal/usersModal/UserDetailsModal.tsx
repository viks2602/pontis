import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";


type Props = {
  open: boolean;
  handleClose: () => void;
  user: any;
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#ffffff",
  borderRadius: "12px",
  px: 3,
  py: 4,
};

const UsersModal = ({ open, handleClose, user }: Props) => {
  return (
    <>
      {user && (
        <>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="model"
          >
            <Box sx={style}>
              <Box height={"100%"} width={"100%"}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={2}
                >
                  <Box>
                    <Stack
                      height={"130px"}
                      width={"130px"}
                      borderRadius={"100%"}
                      bgcolor={"#c3e2ff"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <PersonIcon
                        sx={{ fontSize: "110px", color: "primary.main" }}
                      />
                    </Stack>
                  </Box>
                  <Box>
                    <Box>
                      <Typography sx={{ fontSize: "34px", fontWeight: 500 }}>
                        {user?.userName}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: 300,
                          color: "#979797",
                        }}
                      >
                        {user.emailAddress}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: 300,
                          color: "#979797",
                        }}
                      >
                        {user.mobilePhone || user.telephone
                          ? `${user.mobilePhone} | ${user.telephone}`
                          : null}
                      </Typography>
                    </Box>
                    <Stack direction={"row"} gap={2} mt={2}>
                      {user.groupMemberships.map(
                        (data: string, key: number) => {
                          return (
                            <Button
                              variant="outlined"
                              key={key}
                              sx={{ borderRadius: "20px", cursor: "initial" }}
                            >
                              {data}
                            </Button>
                          );
                        }
                      )}
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};

export default UsersModal;
