import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-dashboard.html',
  styleUrl: './employee-dashboard.css',
})
export class EmployeeDashboard implements OnInit {
  employee: any = null;

  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user && user.role === 'Employee') {
      // Find the employee record by email
      this.employeeService.getEmployees().subscribe(employees => {
        this.employee = employees.find(e => e.email === user.email);
      });
    }
  }
}
