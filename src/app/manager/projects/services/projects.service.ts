import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  IProjectList,
  IProjectParamsRequest,
  IAddResponse,
  IProjectData,
  IUpdateResponse,
  IAdd,
} from '../models/projects';
import { IUserList, IUserParamsRequest } from '../../tasks/models/tasks';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  projectAddedSubject = new Subject<void>();

  constructor(private _HttpClient: HttpClient) {}

  getAllProjects(params: IProjectParamsRequest): Observable<IProjectList> {
    return this._HttpClient.get<IProjectList>('Project/manager', {
      params: params,
    });
  }

  getAllUsers(params: IUserParamsRequest): Observable<IUserList> {
    return this._HttpClient.get<IUserList>('Users', {
      params: params,
    });
  }

  onAddProject(data: IAdd): Observable<IAddResponse> {
    return this._HttpClient.post<IAddResponse>('Project', data);
  }

  getSingleProject(projectId: number): Observable<IProjectData> {
    return this._HttpClient.get<IProjectData>(`Project/${projectId}`);
  }

  updateProject(projectId: number, updatedProjectData: IAdd): Observable<IUpdateResponse> {
    return this._HttpClient.put<IUpdateResponse>(`Project/${projectId}`, updatedProjectData);
  }

  deleteProject(projectId: number): Observable<{ raw: []; affected: number }> {
    return this._HttpClient.delete<{ raw: []; affected: number }>(`Project/${projectId}`);
  }

  notifyProjectAdded() {
    this.projectAddedSubject.next();
  }
}
