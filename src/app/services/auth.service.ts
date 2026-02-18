import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/Auth`;

  constructor(private http: HttpClient) { }

  login(credentials: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(user => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser() {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) return null;
    const user = JSON.parse(userJson);
    // Normalize properties for easier access
    return {
      id: user.id || user.Id,
      name: user.name || user.Name,
      email: user.email || user.Email,
      role: user.role || user.Role
    };
  }

  isLoggedIn() {
    return !!localStorage.getItem('currentUser');
  }

  getRole() {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }
}
