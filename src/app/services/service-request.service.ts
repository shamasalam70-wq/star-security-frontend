/* 
 * The ServiceRequestService handles all requests related to services and assignments.
 * It connects the frontend to the 'api/ServiceRequest' endpoint in the backend.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {
  private apiUrl = `${environment.apiUrl}/ServiceRequest`;

  constructor(private http: HttpClient) { }

  /* 
   * getServiceRequests(): Fetches all service requests submitted by potential clients.
   */
  getServiceRequests() {
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      map(res => {
        // We clean the data here to ensure we always have an Array to loop over in HTML.
        if (res && res.$values) return res.$values;
        return Array.isArray(res) ? res : [];
      })
    );
  }

  /* 
   * getAssignedTasks(): Fetches the requests assigned to a specific employee.
   */
  getAssignedTasks(employeeId: number) {
    return this.http.get<any>(`${this.apiUrl}/assigned/${employeeId}`).pipe(
      map(res => {
        if (res && res.$values) return res.$values;
        return Array.isArray(res) ? res : [];
      })
    );
  }

  /* 
   * createServiceRequest(): Submits a new request for security service from a client.
   */
  createServiceRequest(request: any) {
    return this.http.post(`${this.apiUrl}`, request);
  }

  /* 
   * deleteServiceRequest(): Removes a service request record.
   */
  deleteServiceRequest(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /* 
   * assignEmployee(): Tells the backend which employee is handling which request.
   */
  assignEmployee(requestId: number, employeeId: number) {
    // Sends the employeeId in the request body to the backend.
    return this.http.put(`${this.apiUrl}/assign/${requestId}`, employeeId);
  }
}
