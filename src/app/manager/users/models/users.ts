export interface IUsersParamsRequest {
    title?: string;
    pageSize: number;
    pageNumber: number;
    [key: string]: any;
}


export interface IUsersResponse{
    data:IUsersResponseData[];
    pageNumber:number;
    pageSize:number;
    totalNumberOfRecords:number;
    totalNumberOfPages:number;
}
export interface ISingleUser{
    id:number;
    userName:string;
    imagePath?:string;
    email:string;
    country:string;
    phoneNumber:string;
    isActivated:boolean;
    creationDate:string;
    modificationDate:string;

}



export interface IUsersResponseData{
    id:number;
    userName:string;
    imagePath?:string;
    email:string;
    country:string;
    phoneNumber:string;
    isActivated:boolean;
    task:IUsersResponseDataTask[]
}

export interface IUsersResponseDataTask{
    id:number;
    title:string;
    description:string;
    status:string;
    creationDate:string;
    modificationDate:string;
    project:IUsersResponseDataTaskProject
}

export interface IUsersResponseDataTaskProject{
    id:number;
    title:string;
    description:string;
    creationDate:string;
    modificationDate:string;
} 

export interface IToglleResponse{
    id: number;
  userName: string;
  email: string ;
  country: string;
  phoneNumber: string;
  imagePath?: string ;
  isActivated: boolean ;
  group:IGroup ;
  creationDate: string;
  modificationDate: string
}


export interface IGroup{
    id:number;
    name: string;
    creationDate: string ;
    modificationDate: string;

}

