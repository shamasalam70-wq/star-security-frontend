import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-layout.html',
  styleUrls: ['./employee-layout.css']
})
export class EmployeeLayout {
  activeTab: string = 'dashboard';
}
