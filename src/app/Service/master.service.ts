import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponseModel, Task } from '../model/task';


@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl: string = 'https://freeapi.gerasim.in/api/JWT/GetAllTaskList';


  constructor(private http: HttpClient) { }
  getAllTaskList(): Observable<ApiResponseModel> {
    return this.http.get<ApiResponseModel>(this.apiUrl + 'GetAllTaskList');
 
  }

  addNewtask(obj: Task): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.apiUrl + 'CreateNewTask',obj);
  }
}
 