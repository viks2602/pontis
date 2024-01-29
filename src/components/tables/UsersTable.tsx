import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UsersModal from "../UI/modal/usersModal/UserDetailsModal";
import React from "react";
import UserForm from "../UI/forms/UserForm";
import WarningIcon from "@mui/icons-material/Warning";
import DialogComponent from "../UI/dialog/DialogComponent";
import { toast } from "react-toastify";
import { deleteUserApi } from "../../services/webApis/webApis";

const UsersTable = ({ users, height , getusers }: { users: any; height: number , getusers:any }) => {
  const [openUserModal, setOpenUserModal] = React.useState(false);
  const [openEditUserModal, setOpenEditUserModal] = React.useState(false);
  const [openDeleteUserDialog, setDeleteUserDialog] = React.useState(false);
  const [user, setUser] = React.useState<any>();
  const [deleteUser, setDeleteUser] = React.useState<any>();

  const handleOpenDeleteUserDialog = () => {
    setDeleteUserDialog((prev) => !prev);
  };

  const handleCloseDeleteUserDialog = () => {
    setDeleteUserDialog((prev) => !prev);
  };

  const handleOpenEditUserModal = () => {
    setOpenEditUserModal((prev) => !prev);
  };

  const handleCloseEditUserModal = () => {
    setOpenEditUserModal((prev) => !prev);
  };

  const handleCloseUserModal = () => {
    setOpenUserModal((prev) => !prev);
  };

  const handleOpenUserModal = () => {
    setOpenUserModal((prev) => !prev);
  };

  async function handleDeleteUser(){
    try {
        const response = await deleteUserApi(deleteUser.userName);
        console.log(response);
        setDeleteUserDialog(false);
        getusers();
    } catch (error) {
        console.log(error);
        toast.error(JSON.stringify(error))
    } 
}

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "userName",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "firstName",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "emailAddress",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "groupMemberships",
      headerName: "Groups",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => {
        const groups = params.value.join(", ");
        return groups || "N/A";
      },
    },
    {
      headerName: "action",
      field: "action",
      disableColumnMenu: true,
      sortable: false,
      cellClassName: "cursor-pointer",
      renderCell: (row) => (
        <Box display="flex" justifyContent="center" gap={1} alignItems="center">
          <RemoveRedEyeIcon
            fontSize="small"
            onClick={() => {
              handleOpenUserModal();
              setUser(row.row);
            }}
          />
          <EditIcon
            fontSize="small"
            onClick={() => {
              handleOpenEditUserModal();
              setUser(row.row);
            }}
          />
          <DeleteIcon
            fontSize="small"
            onClick={() => {
              handleOpenDeleteUserDialog();
              setDeleteUser(row.row);
            }}
          />
        </Box>
      ),
    },
  ];
  console.log(users);
  return (
    <Box height={`${height}px`}>
      {openUserModal && user && (
        <UsersModal
          open={openUserModal}
          handleClose={handleCloseUserModal}
          user={user}
        />
      )}

      {openEditUserModal && user && (
        <UserForm
          type="EDIT"
          open={openEditUserModal}
          handleClose={handleCloseEditUserModal}
          defaultValues={user}
          getUserAndGroupsDetails={getusers}
        />
      )}

      {openDeleteUserDialog && (
        <DialogComponent 
          open={openDeleteUserDialog} 
          content={deleteUser.emailAddress} 
          handleClose={handleCloseDeleteUserDialog} 
          handleDelete={handleDeleteUser} 
          />
      )}

      <DataGrid
        getRowId={(row: any) => row.emailAddress + row.userName}
        rows={users || []}
        columns={columns}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default UsersTable;