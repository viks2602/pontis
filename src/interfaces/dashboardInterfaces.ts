export interface DashboardListResponse {
    name: string
    id: string
    icon: string
    show: boolean
    type: string
}

export interface GetDashboardByIdQuery {
    id:string, 
    start?:string, 
    end?:string, 
    ticksize:number,
    filter:string
}
