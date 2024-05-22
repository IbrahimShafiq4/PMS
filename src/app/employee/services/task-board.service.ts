import { IGetAllTaskRequest, IChangeStatusRequest ,IChangeStatus ,IChangeStatusResponse} from './../models/task-board';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskBoardService {

  constructor(private _HttpClient: HttpClient) { }

  // get all employee tasks
  getAllEmplyeeTasks(params:IGetAllTaskRequest):Observable<any> {
    return this._HttpClient.get('Task', { params:params , })
  }

  // change status for task
  changeStatus(id:number , data:IChangeStatus):Observable<IChangeStatusResponse>{
    return this._HttpClient.put<IChangeStatusResponse>(`Task/${id}/change-status` ,data )
  }
}
