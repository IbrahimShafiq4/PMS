export interface IGetAllTaskRequest {
  title?: string;
  status?: string;
  pageSize: number;
  pageNumber: number;
  [key: string]: any;
}
export interface IGetAllTaskResponse {
  pageNumber: number;
  pageSize: number;
  data: IGetAllTaskResponseData[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}
export interface IGetAllTaskResponseData {
  id: number;
  title: string;
  description: string;
  status: string;
  creationDate: string;
  modificationDate: string;
  project: IGetAllTaskResponseDataProject;
}
export interface IGetAllTaskResponseDataProject {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  employee: IGetAllTaskResponseDataProjectEmployee;
}
export interface IGetAllTaskResponseDataProjectEmployee {
  id: number;
  userName: string;
  imagePath?: string;
  email: string;
  password: string;
  country: string;
  phoneNumber: string;
  verificationCode: string;
  isVerified: boolean;
  isActivated: boolean;
  creationDate: string;
  modificationDate: string;
}
export interface IChangeStatusRequest {
  id: number;
  changeStatus: IChangeStatus;
}
export interface IChangeStatus {
  status: string;
}
export interface IChangeStatusResponse {
  id: number;
  title: string;
  description: string;
  status: string;
  creationDate: string;
  modificationDate: string;
  employee: IEmployee;
  project: IProject;
}
export interface IEmployee {
  id: number;
  userName: string;
  imagePath?: string;
  email: string;
  password: string;
  country: string;
  phoneNumber: string;
  verificationCode: string;
  isVerified: boolean;
  isActivated: boolean;
  creationDate: string;
  modificationDate: string;
}
export interface IProject {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
}

export interface ICountedTasks {
  toDo: number;
  inProgress: number;
  done: number;
}
