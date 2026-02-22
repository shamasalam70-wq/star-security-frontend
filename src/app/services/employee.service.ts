/* 
 * The EmployeeService manages all HTTP requests related to employees.
 * It connects the frontend to the 'api/Employee' endpoint in the backend.
 */

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

  /* 
   * getEmployees(): Fetches the full list of employees from the database.
   */
  getEmployees() {
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      map(res => {
        // Handle both simple array and EF $values wrapper
        if (res && res.$values) return res.$values;
        return Array.isArray(res) ? res : [];
      })
    );
  }

  /* 
   * getEmployee(): Fetches a single employee record by their ID.
   */
  getEmployee(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /* 
   * getEmployeeByEmail(): Finds an employee using their email address.
   */
  getEmployeeByEmail(email: string) {
    return this.http.get<any>(`${this.apiUrl}/by-email/${email}`);
  }

  /* 
   * createEmployee(): Tells the backend to save a new employee record.
   */
  createEmployee(employee: any) {
    return this.http.post(`${this.apiUrl}`, employee);
  }

  /* 
   * updateEmployee(): Sends modified employee details back to the backend.
   */
  updateEmployee(id: number, employee: any) {
    return this.http.put(`${this.apiUrl}/${id}`, employee);
  }

  /* 
   * deleteEmployee(): Tells the backend to remove an employee from the system.
   */
  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
