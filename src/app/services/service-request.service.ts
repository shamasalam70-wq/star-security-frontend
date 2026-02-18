import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {
  private apiUrl = `${environment.apiUrl}/ServiceRequest`;

  constructor(private http: HttpClient) { }

  getServiceRequests() {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  createServiceRequest(request: any) {
    return this.http.post(`${this.apiUrl}`, request);
  }

  deleteServiceRequest(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
