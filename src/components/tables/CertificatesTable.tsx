import {
  Box,
  Typography,
  Stack,
  Select,
  MenuItem,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import CreateIcon from "@mui/icons-material/Create";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  certificatesData,
  getCertificates,
} from "../../redux/slice/certificatesSlice";
import { customSearchTable } from "../../common/helperFunctions";
import SearchIcon from "@mui/icons-material/Search";
import { Loader } from "..";

const CertificatesTable = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    error,
    certificatesData: certificatesArray,
  } = useSelector(certificatesData);

  const [open, setOpen] = React.useState(false);
  const [editCertificatesData, setEditCertificatesData] =
    React.useState<any>(undefined);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [data, setData] = React.useState(certificatesArray?.certs);

  const CustomDateCell = ({ value }) => {
    const currentDate = new Date();
    const expirationDate = new Date(parseInt(value));

    const isPastDate = expirationDate < currentDate;
    const yearDifference =
      currentDate.getFullYear() - expirationDate.getFullYear();

    return (
      <div>
        <div>
          {expirationDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        {isPastDate && (
          <div>
            {`(${yearDifference} ${
              yearDifference === 1 ? "year" : "years"
            } ago)`}
          </div>
        )}
      </div>
    );
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "label",
      headerName: "Label",
      flex: 1,
      renderCell: (params) => {
        return (
          <Tooltip title={params.row.label} placement="left-start">
            <Box>{params.row.label}</Box>
          </Tooltip>
        );
      },
    },
    {
      field: "server_id",
      headerName: "Server",
      flex: 1,
      renderCell: (params) => {
        return (
          <Tooltip title={params.row.server_id} placement="left-start">
            <Box>{params.row.server_id}</Box>
          </Tooltip>
        );
      },
    },

    {
      field: "kdb",
      headerName: "Keystore",
      flex: 1,
      renderCell: (params) => {
        return (
          <Tooltip title={params.row.kdb} placement="left-start">
            <Box>{params.row.kdb}</Box>
          </Tooltip>
        );
      },
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      renderCell: (params) => {
        return (
          <Tooltip
            title={certificatesArray?.certs[params.row.id].type}
            placement="left-start"
          >
            <Box>{certificatesArray?.certs[params.row.id].type}</Box>
          </Tooltip>
        );
      },
    },
    {
      field: "notAfter",
      headerName: "Expiry",
      flex: 1,
      renderCell: (params) => <CustomDateCell value={params.row.notAfter} />,
    },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredData = customSearchTable(certificatesArray?.certs, query);
    setData(filteredData);
  };

  React.useEffect(() => {
    dispatch(getCertificates() as any);
  }, []);

  function isCertificateExpired(inputDate) {
    const currentDate = new Date().getTime();
    return currentDate > inputDate;
  }

  function isYearDifference(inputDate: Date): boolean {
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const oneYearInMillis = 365 * 24 * 60 * 60 * 1000;
    const timeDifference = inputDate - currentDate;

    return timeDifference < oneYearInMillis;
  }

  console.log(certificatesArray?.certs);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Box position="relative">
          <TextField
            size="small"
            placeholder="Search..."
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      {certificatesArray?.certs ? (
        <Box sx={{ height: "720px" }}>
          <DataGrid
            rows={data ? data : certificatesArray?.certs || []}
            columns={columns}
            getRowClassName={(params) => {
              if (isCertificateExpired(params.row.notAfter))
                return "bg-critical";
              if (isYearDifference(params.row.notAfter)) return "bg-warning";
              else return "";
            }}
            loading={certificatesArray?.certs ? false : true}
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
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default CertificatesTable;
