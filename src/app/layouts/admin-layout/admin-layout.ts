import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AdminDashboard } from '../../admin/admin-dashboard/admin-dashboard';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [AdminDashboard, RouterModule], // 👈 Added RouterModule
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css']
})
export class AdminLayout {
  activeTab: string = 'applications';

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
