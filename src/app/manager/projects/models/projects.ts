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
  manager?: projectManager;
}

export interface projectManager {
  id: number;
  userName: string;
  imagePath: string;
  email: string;
  password: string;
  country: string;
  phoneNumber: string;
  verificationCode: string | null;
  isVerified: boolean;
  isActivated: boolean;
  creationDate: Date;
  modificationDate: Date;
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
export interface IUserParamsRequest {
  title: string;
  pageSize: number;
  pageNumber: number;
  [key: string]: any;
}
//interface for add project request
export interface IAdd {
  title: string;
  description: string;
}

//interface for add project response
export interface IAddResponse {
  title: string;
  description: string;
  manager: IManager;
  id: number;
  creationDate: string;
  modificationDate: string;
}

export interface IManager {
  id: number;
}

export interface IUpdateResponse {
  id: number;
  title: string;
  description: string;
  modificationDate: string;
}
