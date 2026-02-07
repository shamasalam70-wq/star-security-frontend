import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../shared/navbar/navbar';


@Component({
  selector: 'app-service-request',
  standalone: true,
  imports: [FormsModule, CommonModule, Navbar],
  templateUrl: './service-request.html',
  styleUrl: './service-request.css',
})
export class ServiceRequest {

  formData = {
    name: '',
    phone: '',
    email: '',
    service: ''
  };

  submitted = false;

  submitForm() {
    this.submitted = true;

    if (
      this.formData.name &&
      this.formData.phone &&
      this.formData.email &&
      this.formData.service
    ) {
      console.log('Form submitted:', this.formData);
      alert('Service request submitted successfully!');
    }
  }

  onlyNumbers(event: any) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
    this.formData.phone = event.target.value;
  }

  onlyLetters(event: any) {
    event.target.value = event.target.value.replace(/[^a-zA-Z\s]/g, '');
    this.formData.name = event.target.value;
  }
}
