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

  getServiceRequests() {
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      map(res => res.$values || (Array.isArray(res) ? res : []))
    );
  }

  getAssignedTasks(employeeId: number) {
    return this.http.get<any>(`${this.apiUrl}/assigned/${employeeId}`).pipe(
      map(res => res.$values || (Array.isArray(res) ? res : []))
    );
  }

  createServiceRequest(request: any) {
    return this.http.post(`${this.apiUrl}`, request);
  }

  deleteServiceRequest(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  assignEmployee(requestId: number, employeeId: number) {
    return this.http.put(`${this.apiUrl}/assign/${requestId}`, employeeId);
  }
}
