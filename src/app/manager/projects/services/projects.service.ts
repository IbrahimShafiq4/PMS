import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProjectList, IProjectParamsRequest ,IAdd ,IAddResponse } from '../models/projects';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {


  constructor(private _HttpClient: HttpClient) {}
  getAllProjects(params: IProjectParamsRequest): Observable<IProjectList> {
    return this._HttpClient.get<IProjectList>('Project/manager', {
      params: params,
    });
  }

   //add new project
   onAddProject(data:IAdd):Observable<IAddResponse>{
    return this._HttpClient.post<IAddResponse>('Project',data);
  }
}
