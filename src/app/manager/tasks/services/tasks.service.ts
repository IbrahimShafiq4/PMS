import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICountTasks, ICreateTasks, ITask, ITaskDetail, ITaskListResponse, ITasksParameters } from '../models/tasks';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private _HttpClient: HttpClient) {}

  // Create Task By manager
  createTask(taskData: ICreateTasks): Observable<ITaskDetail> {
    return this._HttpClient.post<ITaskDetail>('Task', taskData)
  }

  // get all my assigned tasks
  getMyAssignedTasks(taskParams: ITasksParameters): Observable<ITaskListResponse> {
    return this._HttpClient.get<ITaskListResponse>('Task', { params: taskParams })
  }

  // get all my tasks for manager
  getAllMyTasksForManager(taskParams: ITasksParameters): Observable<ITaskListResponse> {
    return this._HttpClient.get<ITaskListResponse>('Task/manager', { params: taskParams })
  }

  // get single task by id
  getSingleTask(taskId: number): Observable<ITask> {
    return this._HttpClient.get<ITask>(`Task/${taskId}`)
  }

  // update task by manager
  updateTask(taskId: number, taskDetails: ICreateTasks): Observable<ITaskDetail> {
    return this._HttpClient.put<ITaskDetail>(`Task/${taskId}`, taskDetails)
  }

  // delete task by id
  deleteSingleTask(taskId: number): Observable<{ message: string }> {
    return this._HttpClient.delete<{ message: string }>(`Task/${taskId}`)
  }

  // get count tasks for manager and employee
  getCountTasks(): Observable<ICountTasks> {
    return this._HttpClient.get<ICountTasks>('Task/count')
  }

  // change status for task by employee
  changeStatusOfTask(taskId: number, status: string): Observable<{ status: string }> {
    return this._HttpClient.put<{ status: string }>(`Task/${taskId}/change-status`, {status})
  }

  // get all task in project
  getAllTaskInProject(id: number): Observable<ITaskListResponse> {
    return this._HttpClient.get<ITaskListResponse>(`Task/project/${id}`)
  }
}
