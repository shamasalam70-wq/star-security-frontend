/* 
 * The AuthService is responsible for logging users in and out.
 * It also remembers the 'logged-in' user by storing their data in 'localStorage'.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Base URL for Authentication API
  private apiUrl = `${environment.apiUrl}/Auth`;

  constructor(private http: HttpClient) { }

  /* 
   * login(): Sends the user's email and password to the backend for checking.
   */
  login(credentials: any) {
    // We use .post() to send login details to 'api/Auth/login'.
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      // .tap() lets us perform an action without changing the response.
      tap(user => {
        // If the login was successful (the backend sent back user data), 
        // we store the user object in the browser's memory ('localStorage').
        if (user) {
          // JSON.stringify converts the object into a text string so it can be saved.
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      })
    );
  }

  /* 
   * logout(): Clears the 'currentUser' from the browser's memory.
   */
  logout() {
    // After this, the user is effectively logged out.
    localStorage.removeItem('currentUser');
  }

  /* 
   * getCurrentUser(): Retrieves the logged-in user's data from localStorage.
   */
  getCurrentUser() {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) return null; // No user is logged in

    // JSON.parse converts the text string back into a JavaScript object.
    const user = JSON.parse(userJson);
    
    // We normalize the properties to make them easy to use in our frontend components.
    // Backend properties might be PascalCase (Id) or lowercase (id).
    return {
      id: user.id || user.Id,
      name: user.name || user.Name,
      email: user.email || user.Email,
      role: user.role || user.Role
    };
  }

  /* 
   * isLoggedIn(): Simply returns true if a 'currentUser' is found in memory.
   */
  isLoggedIn() {
    return !!localStorage.getItem('currentUser');
  }

  /* 
   * getRole(): Gets the role of the logged-in user (Admin or Employee).
   */
  getRole() {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }
}
