import { Box, Typography, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { globalCss } from "../../../../../styles/muiCss";

import { Loader } from "../../../..";
import CustomCard from "../../../../../components/UI/card/Card";

const ServerCertificate = ({ serverData }: any) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "label",
      headerName: "Label",
      flex: 1,
      renderCell: (row) => {
        return (
          <Tooltip title={row.row.label} placement="left-start">
            {row.row.label}
          </Tooltip>
        );
      },
    },
    {
      field: "product",
      headerName: "Product",
      flex: 1,
      renderCell: (row) => {
        return (
          <Tooltip title={row.row.product} placement="left-start">
            {row.row.product ? row.row.product : "N/A"}
          </Tooltip>
        );
      },
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      renderCell: (row) => {
        return (
          <Tooltip title={row.row.type} placement="left-start">
            {row.row.type ? row.row.type : "N/A"}
          </Tooltip>
        );
      },
    },
    {
      field: "kdb",
      headerName: "KeyStore",
      flex: 1,
      renderCell: (row) => {
        return (
          <Tooltip title={row.row.kdb} placement="left-start">
            {row.row.kdb ?row.row.kdb:"N/A"}
          </Tooltip>
        );
      },
    },
    {
      field: "notAfter",
      headerName: "Expiry",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => {
        const notAfterMilliseconds = params.row.notAfter;

        const notAfterDate = new Date(Number(notAfterMilliseconds));

        if (!isNaN(notAfterDate.getTime())) {
          return notAfterDate.toLocaleDateString();
        } else {
          return "Invalid Date";
        }
      },
    },
  ];

  console.log(serverData);
  return (
    <Box>
      {serverData ? (
        <CustomCard sx={[{ ...globalCss.widgetCardContainer }, { p: "10px" }]}>
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <Box>
              <Typography
                fontSize={{ xl: "20px", sm: "18px" }}
                fontWeight={500}
              >
                Certificates
              </Typography>
            </Box>
            <Box sx={{ height: "650px" }}>
              <DataGrid
                getRowId={(row: any) => row.label + Math.random()}
                rows={serverData.data.certs.items || []}
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
          </Box>
        </CustomCard>
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default ServerCertificate;
