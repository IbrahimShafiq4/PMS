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
