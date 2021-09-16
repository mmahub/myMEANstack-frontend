import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/task'
  statusTypesURL = 'http://localhost:3000/statustypes'

  getStatusTypes(){
    return this.http.get(this.statusTypesURL)
  }

  createTask(data){
    return this.http.post(this.url, data)
  }

  getTask(){
    return this.http.get(this.url)
  }

  getCurrentTask(id){
    return this.http.get(`${this.url}/${id}`)
  }

  deleteTask(id){
    return this.http.delete(`${this.url}/${id}`)
  }

  updateTask(id, data){
    return this.http.put(`${this.url}/${id}`, data)
  }

}
