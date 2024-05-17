export interface ICreateTasks {
  title: string;
  description: string;
  employeeId?: number;
  projectId?: number;
}

export interface ITaskDetail {
  title: string;
  description: string;
  employee?: {
    id: number;
  };
  project?: {
    id: number;
  };
  id: number;
  status: string;
  creationDate?: string;
  modificationDate: string;
}

export interface ITasksParameters {
  title?: string;
  status?: string;
  id?: number;
  pageSize: number;
  pageNumber: number;
  [key: string]: any;
}

export interface IUser {
  id: number;
  userName: string;
  imagePath: string | null;
  email: string;
  password: string;
  country: string;
  phoneNumber: string;
  verificationCode: string | null;
  isVerified: boolean;
  isActivated: boolean;
  creationDate: string;
  modificationDate: string;
}

export interface IProject {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  manager: IUser;
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: string;
  creationDate: string;
  modificationDate: string;
  project: IProject;
  employee: IUser;
}

export interface ITaskListResponse {
  pageNumber: number;
  pageSize: number;
  data: ITask[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}

export interface ICountTasks{
  toDo: string,
  inProgress: string,
  done: string
}
