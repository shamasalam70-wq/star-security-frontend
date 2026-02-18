import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { EmployeeService } from '../../services/employee.service';
import { ServiceRequestService } from '../../services/service-request.service';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-dashboard.html',
  styleUrl: './employee-dashboard.css',
})
export class EmployeeDashboard implements OnInit {
  employee: any = null;
  assignedTasks: any[] = [];

  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    private serviceRequestService: ServiceRequestService
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user && user.role === 'Employee') {
      // Efficiently fetch only the current employee's record by email
      this.employeeService.getEmployeeByEmail(user.email).subscribe((emp: any) => {
        if (emp) {
          this.employee = {
            id: emp.id || emp.Id,
            employeeCode: emp.employeeCode || emp.EmployeeCode,
            name: emp.name || emp.Name,
            email: emp.email || emp.Email,
            contactNumber: emp.contactNumber || emp.ContactNumber || emp.Phone,
            address: emp.address || emp.Address,
            role: emp.role || emp.Role,
            department: emp.department || emp.Department,
            grade: emp.grade || emp.Grade,
            client: emp.client || emp.Client,
            achievements: emp.achievements || emp.Achievements
          };
          this.loadAssignedTasks();
        }
      });
    }
  }

  loadAssignedTasks() {
    if (this.employee) {
      this.serviceRequestService.getAssignedTasks(this.employee.id).subscribe((requests: any[]) => {
        this.assignedTasks = requests;
      });
    }
  }
}
