import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {
  private apiUrl = `${environment.apiUrl}/Vacancies`;

  constructor(private http: HttpClient) { }

  getVacancies() {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getVacancy(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createVacancy(vacancy: any) {
    return this.http.post(`${this.apiUrl}`, vacancy);
  }

  updateVacancy(id: number, vacancy: any) {
    return this.http.put(`${this.apiUrl}/${id}`, vacancy);
  }

  deleteVacancy(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
