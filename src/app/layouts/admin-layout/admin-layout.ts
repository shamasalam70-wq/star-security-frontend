/* 
 * The AdminLayout component defines the main layout for the Admin section.
 * It includes the navigation sidebar and handles switching between different tabs.
 */

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AdminDashboard } from '../../admin/admin-dashboard/admin-dashboard';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [AdminDashboard, RouterModule],
  templateUrl: './admin-layout.html', // This HTML defines the Admin Dashboard structure.
  styleUrls: ['./admin-layout.css']
})
export class AdminLayout {
  // 'activeTab' tracks which tab the Admin is currently looking at.
  // This is passed as an @Input() to the AdminDashboard component in the HTML.
  activeTab: string = 'applications';

  constructor(private authService: AuthService, private router: Router) {}

  /* 
   * logout(): This function runs when the 'Logout' link is clicked.
   */
  logout() {
    // Step 1: Clear the user's login session data from browser memory.
    this.authService.logout();
    
    // Step 2: Send the user back to the login page.
    this.router.navigate(['/login']);
  }
}
