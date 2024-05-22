import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsersParamsRequest, IUsersResponse, IToglleResponse } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _HttpClient: HttpClient) { }

  //get all users by manager
  getAllUsers(params: IUsersParamsRequest): Observable<IUsersResponse> {
    return this._HttpClient.get<IUsersResponse>('Users/Manager', { params: params, });
  }

  // toggle activated employee
  toggleActivatedEmployee(id: number, data: any): Observable<IToglleResponse> {
    return this._HttpClient.put<IToglleResponse>(`Users/${id}`, data);
  }






}
