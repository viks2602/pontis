import { Box, MenuItem, Select, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTableMetaData,
  getTableMetaDataFromApi,
} from "../../redux/slice/metaDataTableSlice";
import { Loader } from "..";
import { useNavigate } from "react-router-dom";
import DialogComponent from "../UI/dialog/DialogComponent";
import { deleteMetaDataApi } from "../../services/webApis/webApis";
import { toast } from "react-toastify";

type Props = {
  metaDataTypes: string[];
};

const MetadataTable = ({ metaDataTypes }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("ui_settings");

  const [deleteId, setDeleteId] = useState<any>();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteMetaDataApi(`${selectedType}/${deleteId}`);
      if (response.status === 200) {
        toast.success("MetaData Delete Successfully");
        handleClose()
      } else {
        toast.error(response?.data?.error || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    }
  };

  const { isLoadingMetaDataTable, metaDataTable } =
    useSelector(getTableMetaData);

  const handleTypeChange = (event: any) => {
    setSelectedType(event.target.value);
  };

  useEffect(() => {
    dispatch(getTableMetaDataFromApi({ item: selectedType }) as any);
  }, [selectedType]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 140 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 140,
      renderCell: (params) => {
        return (
          <Tooltip title={params.row.name} placement="left-start">
            <Box>{params.row.name}</Box>
          </Tooltip>
        );
      },
    },
    {
      field: "description",
      headerName: "MetaData",
      flex: 1,
      minWidth: 140,
      renderCell: (params) => {
        return (
          <Tooltip title={JSON.stringify(params.row)} placement="left-start">
            <Box>{JSON.stringify(params.row)}</Box>
          </Tooltip>
        );
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 0.7,
      width: 140,
      renderCell: (row) => {
        return (
          <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            width="100%"
          >
            <RemoveRedEyeIcon
              fontSize="small"
              className="cursor-pointer"
              onClick={() => {
                navigate(`metadata?view=true&edit=false`, {
                  state: {
                    metaData: row.row,
                    metaDataType: selectedType,
                  },
                });
              }}
            />
            <CreateIcon
              fontSize="small"
              className="cursor-pointer"
              onClick={() =>
                navigate(`metadata?view=false&edit=true`, {
                  state: {
                    metaData: row.row,
                    metaDataType: selectedType,
                  },
                })
              }
            />
            <DeleteIcon
              fontSize="small"
              className="cursor-pointer"
              onClick={() => {
                setDeleteId(row.row.id || row.row.name);
                handleClickOpen();
              }}
            />
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DialogComponent
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
        content={deleteId}
      />
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent="space-between"
        mb={3}
        mt={2}
      >
        <Typography fontSize={{ xl: "20px", sm: "18px" }} fontWeight={400}>
          MetaData
        </Typography>
        <Select
          size="small"
          onChange={handleTypeChange}
          sx={{ minWidth: "150px" }}
          defaultValue={"ui_settings"}
        >
          <MenuItem value={"ui_settings"}>Type: UI Settings</MenuItem>
          {metaDataTypes.map(
            (data: string) =>
              data !== "ui_settings" &&
              data !== "" && (
                <MenuItem key={data} value={data}>
                  Type: {data}
                </MenuItem>
              )
          )}
        </Select>
      </Box>
      <Box sx={{ height: "600px" }}>
        <Box>{isLoadingMetaDataTable && <Loader />}</Box>
        {selectedType && metaDataTable && !isLoadingMetaDataTable && (
          <DataGrid
            rows={metaDataTable[selectedType] || []}
            // loading={isLoadingMetaDataTable}
            loading={metaDataTable[selectedType] ? false : true}
            columns={columns}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: true,
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
        )}
        {metaDataTable &&
          selectedType &&
          metaDataTable[selectedType] &&
          metaDataTable[selectedType].length === 0 && (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              height={"40vh"}
            >
              No Data Found
            </Box>
          )}
      </Box>
    </Box>
  );
};

export default MetadataTable;
