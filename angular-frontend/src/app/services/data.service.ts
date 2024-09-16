import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = '/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl + '/');
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl + '/', task);
  }

  editTask(index: number, updatedTask: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${index}`, updatedTask);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  toggleTaskStatus(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/toggle/${id}`, {});
  }
}
