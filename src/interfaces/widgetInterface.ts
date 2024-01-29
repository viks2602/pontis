export interface DashboardDetails {
    name: string
    id: string
    icon: string
    show: boolean
    type: string
    pri_timestamp: number
    widgets: Widget[]
    processing_time_ms: number
  }
  
  export interface Widget {
    name: string
    directive_type: string
    pri_timestamp: number
    chart_data_has_single_label: boolean
    id: string
    row: number
    col: number
    "size-x": number
    "size-y": number
    debug: boolean
    view_more: boolean
    view_more_link?: string
    filter: boolean
    legends: boolean
    export: boolean
    processing_time_ms: number
    chart?: Chart
  }
  
  export interface Chart {
    data?: IData[]
    axis_label?: string
    labels?: string[]
    text_1?: string
    text_2?: string
    totalTypes?: string
    datasets?: Dataset2[]
    x_axis_title?: string
    y_axis_title?: string
    items?: Item[]
    number?: number
    percent?: number
    sign?: string
    time_label?: string
  }
  
  export interface IData {
    name: string
    value?: string
    statistic_icon?: string
    netvalue?: number
    dataset?: Dataset[]
  }
  
  export interface Dataset {
    name: string
    color: string
    value: number
  }
  
  export interface Dataset2 {
    label: string
    data: number[]
    backgroundColor: string
    borderColor: string
    cutout?: string
    tension?: number
  }
  
  export interface Item {
    name: string
    down_time: string
    reason: string
    status: string
  }

  export interface TabData {
    name: string
    id: string
    directive_type: string
    row: number
    col: number
    "size-x": number
    "size-y": number
    tabs: string[]
    tabs_content: string
  }
  