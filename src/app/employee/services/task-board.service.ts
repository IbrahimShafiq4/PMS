import {
  IGetAllTaskRequest,
  IChangeStatusRequest,
  IChangeStatus,
  IChangeStatusResponse,
  IGetAllTaskResponse,
  ICountedTasks,
} from './../models/task-board';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskBoardService {
  constructor(private _HttpClient: HttpClient) {}

  getAllEmplyeeTasks(
    params: IGetAllTaskRequest
  ): Observable<IGetAllTaskResponse> {
    return this._HttpClient.get<IGetAllTaskResponse>('Task', {
      params: params,
    });
  }

  changeStatus(
    id: number,
    data: IChangeStatus
  ): Observable<IChangeStatusResponse> {
    return this._HttpClient.put<IChangeStatusResponse>(
      `Task/${id}/change-status`,
      data
    );
  }

  countTasksForManagerAndEmployee(): Observable<ICountedTasks> {
    return this._HttpClient.get<ICountedTasks>('Task/count')
  }
}
