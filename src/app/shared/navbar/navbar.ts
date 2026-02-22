/* 
 * The Navbar component is the navigation bar at the top of the page.
 * It changes based on whether the user is logged in or not.
 */

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,              
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  // We use the AuthService to check if the user is logged in.
  constructor(public authService: AuthService) {}

  /* 
   * logout(): Clears session and reloads the page to update the Navbar view.
   */
  logout() {
    this.authService.logout();
    
    // Simple way to refresh the whole app state and show the 'Login' button again.
    window.location.reload(); 
  }
}
