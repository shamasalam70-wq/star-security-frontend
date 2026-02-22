/* 
 * The ApplicationService handles communication between the Angular frontend 
 * and the 'api/Application' endpoint on the ASP.NET backend.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  // The base URL for the backend API
  private apiUrl = `${environment.apiUrl}/Application`;

  // We 'inject' HttpClient to allow this service to make web requests.
  constructor(private http: HttpClient) { }

  /* 
   * apply(): Sends a new job application to the backend.
   * It uses FormData because we are uploading a file (the CV).
   */
  apply(formData: FormData) {
    return this.http.post(`${this.apiUrl}`, formData);
  }

  /* 
   * getPending(): Fetches all applications that are currently 'Pending'.
   */
  getPending() {
    return this.http.get<any>(`${this.apiUrl}/pending`).pipe(
      // .pipe(map(...)) is used to transform the data before it reaches our component.
      map(res => {
        // Sometimes ASP.NET wraps arrays in a '$values' property. 
        // We check for that here to make sure we always return a simple list (Array).
        if (res && res.$values) return res.$values;
        return Array.isArray(res) ? res : [];
      })
    );
  }

  /* 
   * approve(): Tells the backend to approve an application.
   */
  approve(id: number) {
    // Sending an empty object {} because the backend only needs the ID from the URL.
    return this.http.put(`${this.apiUrl}/approve/${id}`, {});
  }

  /* 
   * reject(): Tells the backend to reject an application.
   */
  reject(id: number) {
    return this.http.put(`${this.apiUrl}/reject/${id}`, {});
  }
}
