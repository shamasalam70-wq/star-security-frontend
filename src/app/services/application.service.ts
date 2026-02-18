import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = `${environment.apiUrl}/Application`;

  constructor(private http: HttpClient) { }

  apply(formData: FormData) {
    return this.http.post(`${this.apiUrl}`, formData);
  }

  getPending() {
    return this.http.get<any>(`${this.apiUrl}/pending`).pipe(
      map(res => res.$values || (Array.isArray(res) ? res : []))
    );
  }

  approve(id: number) {
    return this.http.put(`${this.apiUrl}/approve/${id}`, {});
  }

  reject(id: number) {
    return this.http.put(`${this.apiUrl}/reject/${id}`, {});
  }
}
