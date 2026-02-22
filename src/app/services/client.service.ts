/* 
 * The ClientService manages all web requests related to the company's clients.
 * It connects to the 'api/Clients' endpoint in the backend.
 */

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

  /* 
   * getClients(): Fetches the full list of clients from the backend database.
   */
  getClients() {
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      map(res => {
        // Handle both simple array and EF $values wrapper from ASP.NET.
        if (res && res.$values) return res.$values;
        return Array.isArray(res) ? res : [];
      })
    );
  }

  /* 
   * getClient(): Fetches a single client record by its ID.
   */
  getClient(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /* 
   * createClient(): Tells the backend to save a new client record.
   */
  createClient(client: any) {
    return this.http.post(`${this.apiUrl}`, client);
  }

  /* 
   * updateClient(): Sends modified client details back to the backend.
   */
  updateClient(id: number, client: any) {
    return this.http.put(`${this.apiUrl}/${id}`, client);
  }

  /* 
   * deleteClient(): Tells the backend to remove a client from the system.
   */
  deleteClient(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
