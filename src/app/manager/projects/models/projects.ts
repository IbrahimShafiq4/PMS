export interface IProjectList {
  data: IProjectData[];
  pageNumber: number;
  pageSize: number;
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}

export interface IProjectData {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  task: IProjectTasks[];
}

export interface IProjectTasks {
  id: number;
  title: string;
  description: string;
  status: string;
  creationDate: string;
  modificationDate: string;
}

export interface IProjectParamsRequest {
  title: string;
  pageSize: number;
  pageNumber: number;
  [key: string]: any;
}


//interface for add project request
export interface IAdd {
  title:string;
  description:string;
  // [key: string]: any;
}
//interface for add project response
export interface IAddResponse {
  title:string;
  description:string;
  manager:IManager;
  id:number;
  creationDate:string;
  modificationDate:string;
}



export interface IManager{
  id:number
}