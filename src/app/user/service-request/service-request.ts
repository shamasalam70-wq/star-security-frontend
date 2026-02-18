import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../shared/navbar/navbar';
import { ServiceRequestService } from '../../services/service-request.service';
import { VacancyService } from '../../services/vacancy.service'; // Using vacancy service for simplicity if it handles services too, or I should use a dedicated service service
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-service-request',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Navbar],
  templateUrl: './service-request.html',
  styleUrl: './service-request.css',
})
export class ServiceRequest implements OnInit {
  requestForm!: FormGroup;
  submitted = false;
  errorMessage = '';
  services: any[] = [];

  constructor(
    private fb: FormBuilder,
    private serviceRequestService: ServiceRequestService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/Services`).subscribe(data => {
      this.services = data;
    });

    this.requestForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      email: ['', [Validators.required, Validators.email]],
      service: ['', Validators.required]
    });
  }

  get f() { return this.requestForm.controls; }

  submitForm() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.requestForm.invalid) {
      return;
    }

    const requestData = {
      Name: this.requestForm.value.name,
      Phone: this.requestForm.value.phone,
      Email: this.requestForm.value.email,
      RequestedServiceName: this.requestForm.value.service
    };

    this.serviceRequestService.createServiceRequest(requestData).subscribe({
      next: (res) => {
        alert('Service request submitted successfully!');
        this.requestForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to submit service request.';
        console.error(err);
      }
    });
  }
}
