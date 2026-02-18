import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = `${environment.apiUrl}/Employee`;

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      map(res => res.$values || (Array.isArray(res) ? res : []))
    );
  }

  getEmployee(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createEmployee(employee: any) {
    return this.http.post(`${this.apiUrl}`, employee);
  }

  updateEmployee(id: number, employee: any) {
    return this.http.put(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
