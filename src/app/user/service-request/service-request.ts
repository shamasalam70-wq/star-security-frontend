/* 
 * The ServiceRequest component handles the form for clients to request a security service.
 * It fetches the list of available services from the backend and displays them in a dropdown.
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceRequestService } from '../../services/service-request.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-service-request',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './service-request.html',
  styleUrl: './service-request.css',
})
export class ServiceRequest implements OnInit {
  // 'requestForm' stores our form data and validation rules.
  requestForm!: FormGroup;
  
  // Track if the user tried to submit.
  submitted = false;
  
  // Stores an error message if submission fails.
  errorMessage = '';
  
  // Stores the list of services (e.g. Home Security) fetched from the backend.
  services: any[] = [];

  constructor(
    private fb: FormBuilder,
    private serviceRequestService: ServiceRequestService,
    private http: HttpClient
  ) {}

  /* 
   * ngOnInit(): Automatically runs when the page loads.
   */
  ngOnInit() {
    // Step 1: Fetch the list of services from the backend API to show in the dropdown.
    this.http.get<any[]>(`${environment.apiUrl}/Services`).subscribe(data => {
      this.services = data;
    });

    // Step 2: Set up the form fields and their validation rules.
    this.requestForm = this.fb.group({
      // Name must be filled and can only contain letters.
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      // Phone number must be exactly 11 digits.
      phone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      // Email must be in a valid format.
      email: ['', [Validators.required, Validators.email]],
      // Service must be selected.
      service: ['', Validators.required]
    });
  }

  // A helper function to make it easier to access form fields in the HTML.
  get f() { return this.requestForm.controls; }

  /* 
   * submitForm(): Runs when the 'Submit Request' button is clicked.
   */
  submitForm() {
    this.submitted = true;
    this.errorMessage = '';

    // Step 3: Stop here if the form has validation errors.
    if (this.requestForm.invalid) {
      return;
    }

    /* 
     * Step 4: Map the form values into a JSON object that the backend expects.
     * Backend uses PascalCase (Name, Phone, etc.).
     */
    const requestData = {
      Name: this.requestForm.value.name,
      Phone: this.requestForm.value.phone,
      Email: this.requestForm.value.email,
      RequestedServiceName: this.requestForm.value.service
    };

    // Step 5: Send the request object to the ServiceRequestService to save in the backend.
    this.serviceRequestService.createServiceRequest(requestData).subscribe({
      next: (res) => {
        // Step 6: Success! Notify the user and reset the form.
        alert('Service request submitted successfully!');
        this.requestForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        // Step 7: Error! Notify the user.
        this.errorMessage = 'Failed to submit service request.';
        console.error(err);
      }
    });
  }
}
