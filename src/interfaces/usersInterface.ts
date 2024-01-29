export interface ICreateUserInterface {
    groupMemberships: string[]
    userName: string
    fullName: string
    firstName: string
    lastName: string
    mobilePhone:string,
    telephone:string,
    emailAddress: string
    userPassword: string
}

export interface IUserGroupsCount {
    fullAdmin: number;
    dashboardAdmin: number;
    reportsUser: number;
    others: number;
    none: number;
  }