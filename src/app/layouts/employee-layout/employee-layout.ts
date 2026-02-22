/* 
 * The EmployeeLayout component defines the visual structure for the Employee dashboard.
 * It provides a header with a 'Logout' button.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employee-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-layout.html',
  styleUrls: ['./employee-layout.css']
})
export class EmployeeLayout {
  constructor(private authService: AuthService, private router: Router) {}

  /* 
   * logout(): Clears the employee's session and sends them back to the login page.
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
