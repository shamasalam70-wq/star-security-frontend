import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = `${environment.apiUrl}/Clients`;

  constructor(private http: HttpClient) { }

  getClients() {
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      map(res => res.$values || (Array.isArray(res) ? res : []))
    );
  }

  getClient(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createClient(client: any) {
    return this.http.post(`${this.apiUrl}`, client);
  }

  updateClient(id: number, client: any) {
    return this.http.put(`${this.apiUrl}/${id}`, client);
  }

  deleteClient(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
