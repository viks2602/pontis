import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import UserForm from "../UI/forms/UserForm";
import WarningIcon from "@mui/icons-material/Warning";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StorageIcon from "@mui/icons-material/Storage";
import { useEffect, useState } from "react";
import { Loader } from "..";
import { useNavigate } from "react-router-dom";

type Props = {
  serverData: any;
  height: number;
  totalGroups: string[];
  serverTypes: string[];
};

const getColorForHardware = (data: number) => {
  if (data > 80) {
    return {
      color: "#f32d03",
      backgroundColor: "#fcddd6",
    };
  } else if (data >= 40 && data <= 80) {
    return {
      color: "#f9be2b",
      backgroundColor: "#fef5dd",
    };
  } else if (data > 0 && data < 40) {
    return {
      color: "#53c65d",
      backgroundColor: "#e2f5e4",
    };
  } else {
    return {
      color: "#979797",
      backgroundColor: "#eeeeee",
    };
  }
};

const getColorForServer = (data: any) => {
  if (data >= 0 && data <= 3) {
    return "#f32d03";
  } else if (data > 3 && data <= 7) {
    return "#f9be2b";
  } else if (data > 7 && data <= 10) {
    return "#53c65d";
  } else {
    return "#979797";
  }
};

const setTableDataInState = (
  serverData: any,
  setTableData: React.Dispatch<any>
) => {
  if (serverData && serverData.length > 0) {
    const transformedData = serverData.map((server: any) => {
      const serverId = server?.id;
      const connectionUrl = server?.connection_urls;
      const productsInstalled = server?.server_type?.products_installed;
      const health = server?.data?.status?.health?.score;
      const disk = server?.data?.disk?.data_collection?.collection_health;
      const cpu = server?.data?.cpu?.data_collection?.collection_health;
      const ram = server?.data?.memory?.data_collection?.collection_health;

      const environment = server?.environment;
      const groups = server?.groups;
      const type = server?.server_type?.type;
      return {
        serverId: serverId,
        hostname: server.hostname,
        description: server.description,
        consoles: connectionUrl
          ? connectionUrl.map((data: any) => data.name).join(",")
          : "",
        products: productsInstalled
          ? productsInstalled.map((data: any) => data.label).join(",")
          : "",
        health: health ? health : -1,
        storage: disk ? disk : 0,
        cpu: cpu ? cpu : 0,
        ram: ram ? ram : 0,
        environment: environment ? environment : "all",
        group: groups ? groups : "all",
        type: type ? type : "all",
      };
    });

    setTableData(transformedData);
  }
};
const setTotalEnvironmentInState = (
  serverData: any,
  setTotalEnvironment: React.Dispatch<
    React.SetStateAction<string[] | undefined>
  >
) => {
  const environments = serverData.reduce((accumulator: any, data: any) => {
    if (!accumulator.includes(data.environment)) {
      accumulator.push(data.environment);
    }
    return accumulator;
  }, []);
  setTotalEnvironment(environments);
};

const ServersTable = ({
  serverData,
  height,
  totalGroups,
  serverTypes,
}: Props) => {
  const [selectedEnvironment, setSelectedEnvironment] = useState("all");
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [tableData, setTableData] = useState<any>();
  const [filteredData, setFilteredData] = useState<any>();
  const [totalenvironment, setTotalEnvironment] = useState<
    string[] | undefined
  >();
  const navigate = useNavigate();

  const handleEnvironmentChange = (event: any) => {
    setSelectedEnvironment(event.target.value);
  };

  const handleGroupChange = (event: any) => {
    setSelectedGroup(event.target.value);
  };

  const handleTypeChange = (event: any) => {
    setSelectedType(event.target.value);
  };

  useEffect(() => {
    setTotalEnvironmentInState(serverData, setTotalEnvironment);
    setTableDataInState(serverData, setTableData);
  }, [serverData]);

  useEffect(() => {
    if (tableData) {
      const filteredDataResult = tableData.filter((row: any) => {
        const environmentFilter =
          selectedEnvironment === "all" ||
          row.environment === selectedEnvironment;
        const groupFilter =
          selectedGroup === "all" || row.group.includes(selectedGroup);
        const typeFilter = selectedType === "all" || row.type === selectedType;

        return environmentFilter && groupFilter && typeFilter;
      });
      setFilteredData(filteredDataResult);
    }
  }, [selectedEnvironment, selectedGroup, selectedType]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "hostname",
      headerName: "Name",
      flex: 1,
      minWidth: 140,
      renderCell: (params) => (
        <Tooltip title={params.row.hostname} placement="left-start">
          <Box display={"flex"} flexDirection={"column"} gap={"5px"}>
            <Typography sx={{ fontWeight: 300, fontSize: "12px" }}>
              {params.row.hostname}
            </Typography>
            <Typography sx={{ fontWeight: 300, fontSize: "10px" }}>
              {params.row.description}
            </Typography>
          </Box>
        </Tooltip>
      ),
    },
    {
      field: "consoles",
      headerName: "Consoles",
      flex: 1,
      minWidth: 140,
      renderCell: (params) => (
        <Tooltip title={params.row.consoles} placement="left-start">
          <Box>
            <Typography
              sx={{
                fontWeight: 300,
                fontSize: "12px",
                whiteSpace: "normal",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {params.row.consoles}
            </Typography>
          </Box>
        </Tooltip>
      ),
    },
    {
      field: "products",
      headerName: "Products",
      flex: 1,
      minWidth: 140,
      renderCell: (params) => (
        <Tooltip title={params.row.products} placement="left-start">
          <Box>
            <Typography sx={{ fontWeight: 300, fontSize: "10px" }}>
              {params.row.products}
            </Typography>
          </Box>
        </Tooltip>
      ),
    },
    {
      field: "health",
      headerName: "Health",
      flex: 0.7,
      minWidth: 100,
      renderCell: (params) => (
        <Box width={"100%"} display={"flex"} justifyContent={"center"} pr={3}>
          <StorageIcon
            style={{ color: getColorForServer(params.row.health || 11) }}
          />
        </Box>
      ),
    },
    {
      field: "cpu",
      headerName: "CPU",
      flex: 0.7,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <Tooltip
            title={`${params.row.cpu.toFixed(2)}%`}
            placement="left-start"
          >
            <Chip
              icon={
                <FiberManualRecordIcon
                  style={{
                    color: getColorForHardware(params.row.cpu.toFixed(2)).color,
                    fontSize: "12px",
                  }}
                />
              }
              sx={{
                color: getColorForHardware(params.row.cpu.toFixed(2)),
                border: `none`,
                backgroundColor: getColorForHardware(params.row.cpu.toFixed(2)),
                fontSize: "12px",
              }}
              label={`${params.row.cpu.toFixed(2)}%`}
              variant="outlined"
            />
          </Tooltip>
        </>
      ),
    },
    {
      field: "ram",
      headerName: "Ram",
      flex: 0.7,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <Tooltip
            title={`${params.row.ram.toFixed(2)}%`}
            placement="left-start"
          >
            <Chip
              icon={
                <FiberManualRecordIcon
                  style={{
                    color: getColorForHardware(params.row.ram.toFixed(2)).color,
                    fontSize: "12px",
                  }}
                />
              }
              sx={{
                color: getColorForHardware(params.row.ram.toFixed(2)),
                border: `none`,
                backgroundColor: getColorForHardware(params.row.ram.toFixed(2)),
                fontSize: "12px",
              }}
              label={`${params.row.ram.toFixed(2)}%`}
              variant="outlined"
            />
          </Tooltip>
        </>
      ),
    },
    {
      field: "storage",
      headerName: "Storage",
      flex: 0.7,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <Tooltip
            title={`${params.row.storage.toFixed(2)}%`}
            placement="left-start"
          >
            <Chip
              icon={
                <FiberManualRecordIcon
                  style={{
                    color: getColorForHardware(params.row.storage.toFixed(2))
                      .color,
                    fontSize: "12px",
                  }}
                />
              }
              sx={{
                color: getColorForHardware(params.row.storage.toFixed(2)),
                border: `none`,
                backgroundColor: getColorForHardware(
                  params.row.storage.toFixed(2)
                ),
                fontSize: "12px",
              }}
              label={`${params.row.storage.toFixed(2)}%`}
              variant="outlined"
            />
          </Tooltip>
        </>
      ),
    },
    {
      headerName: "action",
      field: "action",
      flex: 0.7,
      minWidth: 100,
      disableColumnMenu: true,
      sortable: false,
      cellClassName: "cursor-pointer",
      renderCell: (row) => (
        <Box
          display="flex"
          justifyContent="center"
          gap={1}
          alignItems="center"
          width={"100%"}
        >
          <RemoveRedEyeIcon
            fontSize="small"
            onClick={() => {
              navigate(`server/details?serverId=${row.row.serverId}`)
              // handleOpenUserModal();
              // setUser(row.row);
            }}
          />
          <EditIcon
            fontSize="small"
            onClick={() => {
              navigate(`server?serverId=${row.row.serverId}&edit=true`);
            }}
          />
          <DeleteIcon
            fontSize="small"
            onClick={() => {
              // handleOpenDeleteUserDialog();
              // setDeleteUser(row.row);
            }}
          />
        </Box>
      ),
    },
    // {
    //   headerName: "action",
    //   field: "action",
    //   disableColumnMenu: true,
    //   sortable: false,
    //   cellClassName: "cursor-pointer",
    //   renderCell: (row) => (
    //     <Box display="flex" justifyContent="center" gap={1} alignItems="center">
    //       <RemoveRedEyeIcon
    //         fontSize="small"
    //         onClick={() => {
    //           handleOpenUserModal();
    //           setUser(row.row);
    //         }}
    //       />
    //       <EditIcon
    //         fontSize="small"
    //         onClick={() => {
    //           handleOpenEditUserModal();
    //           setUser(row.row);
    //         }}
    //       />
    //       <DeleteIcon
    //         fontSize="small"
    //         onClick={() => {
    //           handleOpenDeleteUserDialog();
    //           setDeleteUser(row.row);
    //         }}
    //       />
    //     </Box>
    //   ),
    // },
  ];

  return (
    <>
      <Box py={2} display="flex" justifyContent="space-between">
        <Typography fontSize={{ xl: "20px", sm: "18px" }} fontWeight={400}>
          Severs In Environment
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          {totalenvironment && (
            <Select
              size="small"
              onChange={handleEnvironmentChange}
              sx={{ minWidth: "150px" }}
              defaultValue={"all"}
            >
              <MenuItem value={"all"}>Environment: All</MenuItem>
              {totalenvironment.map((data: string) => (
                <MenuItem value={data}>Environment: {data}</MenuItem>
              ))}
            </Select>
          )}

          {totalGroups && (
            <Select
              size="small"
              sx={{ minWidth: "150px" }}
              onChange={handleGroupChange}
              defaultValue="all"
            >
              <MenuItem value="all">Group: All</MenuItem>

              {totalGroups.map((group: string) => (
                <MenuItem value={group}>Group: {group}</MenuItem>
              ))}
            </Select>
          )}

          {serverTypes && serverTypes.length != 0 && (
            <Select
              size="small"
              sx={{ minWidth: "150px" }}
              onChange={handleTypeChange}
              defaultValue="all"
            >
              <MenuItem value="all">Type: All</MenuItem>
              {serverTypes.map((data: any) => (
                <MenuItem value={data.type}>Type: {data.type}</MenuItem>
              ))}
            </Select>
          )}
        </Box>
      </Box>
      <Box>
        <Box height={`${height}px`}>
          {tableData ? (
            <DataGrid
              getRowId={(row: any) => row.hostname + Math.random()}
              rows={filteredData || tableData || []}
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
          ) : (
            <Loader />
          )}
        </Box>
      </Box>
    </>
  );
};

export default ServersTable;
