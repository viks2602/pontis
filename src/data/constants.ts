
export const timeFrameOptions = [
    {label: 'Last 24 Hours' , value:1, ticksize:600000},
    {label: 'Last 7 Days' , value:7, ticksize:3600000},
    {label: 'Last 30 days' , value:30, ticksize:3600000},
    {label: 'Last 60 Days' , value:60, ticksize:3600000},
    {label: 'Last 90 Days' , value:90, ticksize:3600000},
    {label: 'Last 365 Days' , value:365, ticksize:3600000},
]

export const configurationSubMenu = [
    { label: "Alerts", href:"alerts" },
    { label: "Servers", href:"servers" },
    { label: "Dashboards", href:"dashboards" },
    { label: "Users", href:"users" },
    { label: "Certificates", href:"certificates" },
    { label: "Settings", href:"settings" },
]

export const dashboardDefaultData = {
    "name": "your_dashboard_name",
    "id": "dashboard_id",
    "icon": "",
    "show": true,
    "type": "historical || top-level",
    "pri_timestamp": 0,
    "widgets": [
        {
            "name": "name_of_widget",
            "directive_type": "label",
            "pri_timestamp": 0,
            "chart_data_has_single_label": false,
            "source_type": "",
            "source_id": "",
            "id": "id_of_widget",
            "row": 1,
            "col": 1,
            "size-x": 2,
            "size-y": 5,
            "debug": false,
            "view_more": false,
            "filter": false,
            "legends": false,
            "export": false,
            "processing_time_ms": 0
        }
    ],
    "processing_time_ms": 0,
}