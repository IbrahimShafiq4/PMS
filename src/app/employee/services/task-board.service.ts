
import { IGetAllTaskRequest, IChangeStatusRequest ,IChangeStatus ,IChangeStatusResponse ,IGetAllTaskResponse} from './../models/task-board';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskBoardService {

  constructor(private _HttpClient: HttpClient) { }

  getAllEmplyeeTasks(params:IGetAllTaskRequest):Observable<IGetAllTaskResponse> {
    return this._HttpClient.get<IGetAllTaskResponse>('Task', { params:params , })
  }

  // change status for task
  changeStatus(id:number , data:IChangeStatus):Observable<IChangeStatusResponse>{
    return this._HttpClient.put<IChangeStatusResponse>(`Task/${id}/change-status` ,data )
  }
}
