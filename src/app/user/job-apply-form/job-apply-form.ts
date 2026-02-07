import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-job-apply-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './job-apply-form.html',
  styleUrl: './job-apply-form.css',
})
export class JobApplyForm {

  selectedRole = '';

  formData = {
    name: '',
    cnic: '',
    age: '',
    phone: '',
    email: '',
    cv: null as File | null
  };

  submitted = false;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.selectedRole = params['role'];
    });
  }

  onlyLetters(event: any) {
    event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, '');
    this.formData.name = event.target.value;
  }

  onlyNumbers(event: any, field: 'phone' | 'age' | 'cnic') {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
    this.formData[field] = event.target.value;
  }

  onFileChange(event: any) {
    this.formData.cv = event.target.files[0];
  }

  submitForm() {
    this.submitted = true;

    if (
      this.formData.name &&
      this.formData.cnic.length === 13 &&
      this.formData.age &&
      this.formData.phone &&
      this.formData.email &&
      this.formData.cv
    ) {
      console.log('Job Application:', this.formData);
      alert('Application submitted successfully!');
    }
  }
}
