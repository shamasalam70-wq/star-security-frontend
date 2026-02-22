/* 
 * The EmployeeDashboard component is the page where a security staff member can see their info.
 * It also displays any service requests (tasks) that have been assigned to them by an Admin.
 */

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
  // 'employee' will store the full record of the staff member who is logged in.
  employee: any = null;

  // 'assignedTasks' will store the list of service requests assigned to this employee.
  assignedTasks: any[] = [];

  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    private serviceRequestService: ServiceRequestService
  ) {}

  /* 
   * ngOnInit(): This runs when the page loads. 
   * We use it to fetch the data for the logged-in employee.
   */
  ngOnInit() {
    // Step 1: Get the logged-in user's email from the AuthService memory.
    const user = this.authService.getCurrentUser();
    
    // Step 2: Ensure the user is an 'Employee'.
    if (user && user.role === 'Employee') {
      
      // Step 3: Use the email to fetch the full Employee record from the backend database.
      this.employeeService.getEmployeeByEmail(user.email).subscribe((emp: any) => {
        if (emp) {
          // Step 4: Map the data from the backend to our 'employee' property.
          // We handle both lowercase 'name' and uppercase 'Name'.
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
          
          // Step 5: After getting the employee's ID, fetch their assigned tasks.
          this.loadAssignedTasks();
        }
      });
    }
  }

  /* 
   * loadAssignedTasks(): Fetches the list of tasks (Service Requests) for this employee.
   */
  loadAssignedTasks() {
    if (this.employee) {
      // Step 6: Ask the ServiceRequestService for any requests assigned to this employee's ID.
      this.serviceRequestService.getAssignedTasks(this.employee.id).subscribe((requests: any[]) => {
        // Step 7: Store the results to display in the HTML.
        this.assignedTasks = requests;
      });
    }
  }
}
