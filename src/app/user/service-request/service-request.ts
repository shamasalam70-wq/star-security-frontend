import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-request',
  standalone: true,
  imports: [FormsModule],
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

  submitForm() {
    console.log(this.formData);
    alert('Service request submitted successfully!');
  }
}
