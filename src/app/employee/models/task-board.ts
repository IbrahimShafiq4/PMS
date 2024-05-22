export interface IGetAllTaskRequest {
    title?:string;
    status?:string;
    pageSize:number;
    pageNumber:number;
    [key:string]:any;
}

export interface IChangeStatusRequest {
    id:number;
    changeStatus:IChangeStatus;
}

export interface IChangeStatus{
    status:string;
}

export interface IChangeStatusResponse {
    id:number;
    title:string;
    description:string;
    status:string;
    creationDate:string;
    modificationDate:string;
    employee:IEmployee;
    project:IProject;
}

export interface IEmployee{
    id:number;
    userName:string;
    imagePath?:string;
    email:string;
    password:string;
    country:string;
    phoneNumber:string;
    verificationCode:string;
    isVerified:boolean;
    isActivated:boolean;
    creationDate:string;
    modificationDate:string;
}

export interface IProject{
    id:string;
    title:string;
    description:string;
    creationDate:string;
    modificationDate:string;
}