import { Component } from '@angular/core';
import { AdminDashboard } from '../../admin/admin-dashboard/admin-dashboard';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [AdminDashboard],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css']
})
export class AdminLayout {
  activeTab: string = 'applications';
}
