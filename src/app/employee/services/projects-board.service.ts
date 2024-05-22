import { IProjectList } from 'src/app/manager/projects/models/projects';
import { IGetAllProjectsRequest } from './../models/projects-board';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsBoardService {

  constructor(private _HttpClient: HttpClient) { }

  //get all projects for employee
  getAllEmplyeeProjects(params: IGetAllProjectsRequest): Observable<IProjectList> {
    return this._HttpClient.get<IProjectList>(`Project/employee`, { params: params });
  }

}
