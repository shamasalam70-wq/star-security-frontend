import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
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
    console.log("FILE:", this.formData.cv);
  }

  submitForm() {
    this.submitted = true;
    console.log("SUBMIT CLICKED");

    if (
      this.formData.name &&
      this.formData.cnic.length === 13 &&
      this.formData.age &&
      this.formData.phone &&
      this.formData.email &&
      this.formData.cv
    ) {
      const form = new FormData();
      form.append('name', this.formData.name);
      form.append('email', this.formData.email);
      form.append('vacancyId', '1');
      form.append('cv', this.formData.cv);

      // DEBUG: see exactly what is being sent
      for (let pair of form.entries()) {
        console.log(pair[0], pair[1]);
      }

      this.http.post('https://localhost:7072/api/Application', form)
        .subscribe({
          next: res => {
            console.log('SUCCESS:', res);
            alert('Application submitted with CV!');
          },
          error: err => {
            console.error('BACKEND ERROR:', err);
            alert('Backend error. Check console.');
          }
        });
    } else {
      alert("Form validation failed");
    }
  }
}