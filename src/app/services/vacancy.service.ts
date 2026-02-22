/* 
 * The VacancyService handles all web requests related to job openings.
 * It connects to the 'api/Vacancies' endpoint in the backend.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {
  private apiUrl = `${environment.apiUrl}/Vacancies`;

  constructor(private http: HttpClient) { }

  /* 
   * getVacancies(): Fetches all available jobs from the backend.
   */
  getVacancies() {
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      map(res => {
        // Sometimes ASP.NET wraps results in a $values property. 
        // We handle that here to make sure we always get a clean list (Array).
        if (res && res.$values) return res.$values;
        return Array.isArray(res) ? res : [];
      })
    );
  }

  /* 
   * getVacancy(): Fetches a single job opening by its ID.
   */
  getVacancy(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /* 
   * createVacancy(): Adds a new job opening (Admin only).
   */
  createVacancy(vacancy: any) {
    return this.http.post(`${this.apiUrl}`, vacancy);
  }

  /* 
   * updateVacancy(): Updates an existing job opening's details.
   */
  updateVacancy(id: number, vacancy: any) {
    return this.http.put(`${this.apiUrl}/${id}`, vacancy);
  }

  /* 
   * deleteVacancy(): Removes a job opening from the backend.
   */
  deleteVacancy(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
