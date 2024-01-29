import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
const dummyData = [
  { id: 1, time: "2024-01-22T10:30:00", operation: "Read", connection: "Localhost", stats: 500, resultsDetails: "Details for Row 1", result: "Success" },
  { id: 2, time: "2024-01-22T11:45:00", operation: "Write", connection: "Remote Server", stats: 700, resultsDetails: "Details for Row 2", result: "Failure" },
  { id: 3, time: "2024-01-22T12:15:00", operation: "Delete", connection: "Cloud", stats: 300, resultsDetails: "Details for Row 3", result: "Success" },
  { id: 4, time: "2024-01-22T13:20:00", operation: "Read", connection: "Localhost", stats: 800, resultsDetails: "Details for Row 4", result: "Failure" },
  { id: 5, time: "2024-01-22T14:00:00", operation: "Write", connection: "Remote Server", stats: 400, resultsDetails: "Details for Row 5", result: "Success" },
  { id: 6, time: "2024-01-22T15:10:00", operation: "Delete", connection: "Cloud", stats: 600, resultsDetails: "Details for Row 6", result: "Failure" },
  { id: 7, time: "2024-01-22T16:45:00", operation: "Read", connection: "Localhost", stats: 200, resultsDetails: "Details for Row 7", result: "Success" },
  { id: 8, time: "2024-01-22T17:30:00", operation: "Write", connection: "Remote Server", stats: 900, resultsDetails: "Details for Row 8", result: "Failure" },
  { id: 9, time: "2024-01-22T18:00:00", operation: "Delete", connection: "Cloud", stats: 1000, resultsDetails: "Details for Row 9", result: "Success" },
  { id: 10, time: "2024-01-22T19:20:00", operation: "Read", connection: "Localhost", stats: 450, resultsDetails: "Details for Row 10", result: "Failure" },
];

const ConnectionTestLogsTable = () => {
  const columns: GridColDef[] = [
    {
      field: "time",
      headerName: "Time",
      flex: 1,
    },
    {
      field: "operation",
      headerName: "Operation",
      flex: 1,
    },
    {
      field: "connection",
      headerName: "Connection",
      flex: 1,
    },
    {
      field: "stats",
      headerName: "Stats",
      flex: 1,
    },
    {
      field: "resultsDetails",
      headerName: "Result Details",
      flex: 1,
    },
    {
      field: "result",
      headerName: "Result",
      flex: 1,
    }
  ];
  return (
    <Box mt={1}>
      <DataGrid
        rows={dummyData || []}
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
        loading={dummyData ? false : true}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        autoHeight={false}
      />
    </Box>
  );
};

export default ConnectionTestLogsTable;
