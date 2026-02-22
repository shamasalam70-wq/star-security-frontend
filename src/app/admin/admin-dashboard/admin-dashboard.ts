/* 
 * The AdminDashboard component is the main page for system administrators.
 * It allows them to manage applications, employees, job openings (vacancies), 
 * clients, and security services.
 */

import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationService } from '../../services/application.service';
import { EmployeeService } from '../../services/employee.service';
import { VacancyService } from '../../services/vacancy.service';
import { ClientService } from '../../services/client.service';
import { ServiceRequestService } from '../../services/service-request.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']   
})
export class AdminDashboard implements OnInit, OnChanges {
  /* 
   * @Input() tab: This property is passed from the parent component.
   * It determines which tab (Applications, Employees, etc.) is currently shown.
   */
  @Input() tab: string = 'applications';

  // These arrays will store the data we fetch from the backend API.
  applications: any[] = [];
  employees: any[] = [];
  vacancies: any[] = [];
  serviceRequests: any[] = [];
  clients: any[] = [];
  services: any[] = [];

  // These objects store data for 'adding' new vacancies or services via a form.
  // Note: PascalCase matches our ASP.NET models (Title, Description, etc.).
  newVacancy = { Title: '', Description: '' };
  newService = { Name: '', Description: '' };

  // Control variables for showing/hiding forms.
  showAddForm = false;
  editingEmployee: any = null;

  constructor(
    private applicationService: ApplicationService,
    private employeeService: EmployeeService,
    private vacancyService: VacancyService,
    private serviceRequestService: ServiceRequestService,
    private http: HttpClient
  ) {}

  /* 
   * ngOnInit(): This is a 'Lifecycle Hook' that runs automatically 
   * when the component is first created. We use it to load initial data.
   */
  ngOnInit() {
    this.loadData();
  }

  /* 
   * ngOnChanges(): This runs whenever the @Input() properties change.
   * If the Admin clicks a different tab, we refresh the data and hide any open forms.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['tab']) {
      this.showAddForm = false;
      this.editingEmployee = null;
      this.loadData();
    }
  }

  /* 
   * loadData(): A helper function that decides which data to fetch based on the active tab.
   */
  loadData() {
    // switch (this.tab) acts like multiple 'if' statements to check the active tab.
    switch (this.tab) {
      case 'applications':
        // Fetch pending job applications from the backend
        this.applicationService.getPending().subscribe(data => this.applications = data);
        break;
      case 'employees':
        // Fetch all security staff records
        this.employeeService.getEmployees().subscribe(data => this.employees = data);
        break;
      case 'vacancies':
        // Fetch all job openings
        this.vacancyService.getVacancies().subscribe(data => {
          console.log('Admin Vacancies:', data);
          this.vacancies = data;
        });
        break;
      case 'service-requests':
        // Fetch service requests and also employees (so we can assign them)
        this.serviceRequestService.getServiceRequests().subscribe(data => this.serviceRequests = data);
        this.employeeService.getEmployees().subscribe(data => this.employees = data);
        break;
      case 'services':
        // Fetch all services using a direct HTTP request to the backend
        this.http.get<any[]>(`${environment.apiUrl}/Services`).subscribe(data => this.services = data);
        break;
    }
  }

  // --- CRUD Operations for Job Openings (Vacancies) ---

  /* 
   * addVacancy(): Sends the new job details to the backend to be saved.
   */
  addVacancy() {
    this.vacancyService.createVacancy(this.newVacancy).subscribe(() => {
      alert('Vacancy Added!');
      // Reset the form after success
      this.newVacancy = { Title: '', Description: '' };
      this.showAddForm = false;
      this.loadData(); // Refresh the list
    });
  }

  /* 
   * deleteVacancy(): Removes a job opening.
   */
  deleteVacancy(id: number) {
    if (confirm('Delete this vacancy?')) {
      this.vacancyService.deleteVacancy(id).subscribe(() => this.loadData());
    }
  }

  // --- CRUD Operations for Company Services ---

  /* 
   * addService(): Adds a new service (e.g., Home Protection) to the system.
   */
  addService() {
    this.http.post(`${environment.apiUrl}/Services`, this.newService).subscribe(() => {
      alert('Service Added!');
      // Reset form
      this.newService = { Name: '', Description: '' };
      this.showAddForm = false;
      this.loadData();
    });
  }

  /* 
   * deleteService(): Removes a service from the system.
   */
  deleteService(id: number) {
    if (confirm('Delete this service?')) {
      this.http.delete(`${environment.apiUrl}/Services/${id}`).subscribe(() => this.loadData());
    }
  }

  // --- Job Applications Management ---

  /* 
   * approveApp(): Approves a job application. 
   * This automatically creates an Employee account on the backend.
   */
  approveApp(id: number) {
    this.applicationService.approve(id).subscribe(() => {
      alert('Application Approved!');
      this.loadData(); // Refresh to hide the application from the 'Pending' list
    });
  }

  /* 
   * rejectApp(): Rejects a job application.
   */
  rejectApp(id: number) {
    this.applicationService.reject(id).subscribe(() => {
      alert('Application Rejected!');
      this.loadData();
    });
  }

  // --- Employee Management ---

  /* 
   * editEmployee(): Opens the edit form for a specific staff member.
   */
  editEmployee(emp: any) {
    // We clone the object so we can modify it without changing the original list.
    // We also handle different naming (e.g., 'Id' vs 'id').
    this.editingEmployee = { 
      id: emp.id || emp.Id,
      name: emp.name || emp.Name,
      email: emp.email || emp.Email,
      contactNumber: emp.contactNumber || emp.ContactNumber,
      employeeCode: emp.employeeCode || emp.EmployeeCode,
      password: emp.password || emp.Password || '123456',
      role: emp.role || emp.Role,
      department: emp.department || emp.Department,
      grade: emp.grade || emp.Grade,
      client: emp.client || emp.Client,
      achievements: emp.achievements || emp.Achievements
    };
  }

  /* 
   * updateEmployee(): Sends the updated staff details to the backend.
   */
  updateEmployee() {
    if (this.editingEmployee) {
      this.employeeService.updateEmployee(this.editingEmployee.id, this.editingEmployee).subscribe(() => {
        alert('Employee Updated!');
        this.editingEmployee = null; // Close the edit form
        this.loadData(); // Refresh list
      });
    }
  }

  /* 
   * deleteEmployee(): Removes an employee record and their user account.
   */
  deleteEmployee(id: number) {
    if (confirm('Delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => this.loadData());
    }
  }

  // --- Service Request Management ---

  /* 
   * deleteServiceRequest(): Deletes a service request from a client.
   */
  deleteServiceRequest(id: number) {
    if (confirm('Delete this request?')) {
      this.serviceRequestService.deleteServiceRequest(id).subscribe(() => this.loadData());
    }
  }

  /* 
   * assignEmployee(): Assigns a staff member to handle a client's service request.
   */
  assignEmployee(requestId: number, event: any) {
    // event.target.value contains the employee ID chosen in the dropdown.
    const employeeId = +event.target.value;
    if (employeeId) {
      this.serviceRequestService.assignEmployee(requestId, employeeId).subscribe(() => {
        alert('Employee Assigned!');
        this.loadData(); // Refresh list to show the new status
      });
    }
  }
}
