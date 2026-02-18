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
  @Input() tab: string = 'applications';

  applications: any[] = [];
  employees: any[] = [];
  vacancies: any[] = [];
  serviceRequests: any[] = [];
  clients: any[] = [];
  services: any[] = [];

  // Models for new items - using PascalCase to match backend models exactly
  newVacancy = { Title: '', Description: '' };
  newService = { Name: '', Description: '' };
  newClient = { Name: '', ServicesAvailed: '', StaffAssigned: '', ContactEmail: '', ContactPhone: '' };

  showAddForm = false;

  constructor(
    private applicationService: ApplicationService,
    private employeeService: EmployeeService,
    private vacancyService: VacancyService,
    private clientService: ClientService,
    private serviceRequestService: ServiceRequestService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tab']) {
      this.showAddForm = false;
      this.loadData();
    }
  }

  loadData() {
    switch (this.tab) {
      case 'applications':
        this.applicationService.getPending().subscribe(data => this.applications = data);
        break;
      case 'employees':
        this.employeeService.getEmployees().subscribe(data => this.employees = data);
        break;
      case 'vacancies':
        this.vacancyService.getVacancies().subscribe(data => {
          console.log('Admin Vacancies:', data);
          this.vacancies = data;
        });
        break;
      case 'service-requests':
        this.serviceRequestService.getServiceRequests().subscribe(data => this.serviceRequests = data);
        break;
      case 'clients':
        this.clientService.getClients().subscribe(data => this.clients = data);
        break;
      case 'services':
        this.http.get<any[]>(`${environment.apiUrl}/Services`).subscribe(data => this.services = data);
        break;
    }
  }

  // CRUD for Vacancy
  addVacancy() {
    this.vacancyService.createVacancy(this.newVacancy).subscribe(() => {
      alert('Vacancy Added!');
      this.newVacancy = { Title: '', Description: '' };
      this.showAddForm = false;
      this.loadData();
    });
  }

  deleteVacancy(id: number) {
    if (confirm('Delete this vacancy?')) {
      this.vacancyService.deleteVacancy(id).subscribe(() => this.loadData());
    }
  }

  // CRUD for Service
  addService() {
    this.http.post(`${environment.apiUrl}/Services`, this.newService).subscribe(() => {
      alert('Service Added!');
      this.newService = { Name: '', Description: '' };
      this.showAddForm = false;
      this.loadData();
    });
  }

  deleteService(id: number) {
    if (confirm('Delete this service?')) {
      this.http.delete(`${environment.apiUrl}/Services/${id}`).subscribe(() => this.loadData());
    }
  }

  // CRUD for Client
  addClient() {
    this.clientService.createClient(this.newClient).subscribe(() => {
      alert('Client Added!');
      this.newClient = { Name: '', ServicesAvailed: '', StaffAssigned: '', ContactEmail: '', ContactPhone: '' };
      this.showAddForm = false;
      this.loadData();
    });
  }

  deleteClient(id: number) {
    if (confirm('Delete this client?')) {
      this.clientService.deleteClient(id).subscribe(() => this.loadData());
    }
  }

  // Applications
  approveApp(id: number) {
    this.applicationService.approve(id).subscribe(() => {
      alert('Application Approved!');
      this.loadData();
    });
  }

  rejectApp(id: number) {
    this.applicationService.reject(id).subscribe(() => {
      alert('Application Rejected!');
      this.loadData();
    });
  }

  deleteEmployee(id: number) {
    if (confirm('Delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => this.loadData());
    }
  }

  deleteServiceRequest(id: number) {
    if (confirm('Delete this request?')) {
      this.serviceRequestService.deleteServiceRequest(id).subscribe(() => this.loadData());
    }
  }
}
