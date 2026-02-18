import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-job-apply-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './job-apply-form.html',
  styleUrl: './job-apply-form.css',
})
export class JobApplyForm implements OnInit {
  applyForm!: FormGroup;
  selectedRole = '';
  vacancyId = 0;
  submitted = false;
  cvFile: File | null = null;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedRole = params['role'] || 'General Role';
      this.vacancyId = +params['vacancyId'] || 1;
    });

    this.applyForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      cnic: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(60)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      cv: [null, Validators.required]
    });
  }

  get f() { return this.applyForm.controls; }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.cvFile = event.target.files[0];
      this.applyForm.patchValue({
        cv: this.cvFile
      });
    }
  }

  submitForm() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.applyForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('Name', this.applyForm.get('name')?.value);
    formData.append('Email', this.applyForm.get('email')?.value);
    formData.append('Cnic', this.applyForm.get('cnic')?.value);
    formData.append('Age', this.applyForm.get('age')?.value);
    formData.append('Phone', this.applyForm.get('phone')?.value);
    formData.append('VacancyId', this.vacancyId.toString());
    if (this.cvFile) {
      formData.append('Cv', this.cvFile);
    }

    this.applicationService.apply(formData).subscribe({
      next: (res: any) => {
        alert('Application submitted successfully!');
        this.router.navigate(['/job-apply']);
      },
      error: (err) => {
        this.errorMessage = 'Failed to submit application. Please check your inputs.';
        console.error(err);
      }
    });
  }
}
