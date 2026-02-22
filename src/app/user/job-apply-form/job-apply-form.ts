/* 
 * The JobApplyForm component handles the job application form.
 * It includes logic for validating user input and uploading a CV file.
 */

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
  // 'applyForm' is our Reactive Form container.
  applyForm!: FormGroup;

  // These come from the URL (e.g., job-apply-form?role=Guard&vacancyId=5).
  selectedRole = '';
  vacancyId = 0;

  // Track if the user tried to submit.
  submitted = false;

  // This variable stores the actual CV file chosen by the user.
  cvFile: File | null = null;

  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService
  ) {}

  /* 
   * ngOnInit(): Automatically runs when the form page is opened.
   */
  ngOnInit() {
    // Step 1: Read the job role and ID from the URL.
    this.route.queryParams.subscribe(params => {
      this.selectedRole = params['role'] || 'General Role';
      this.vacancyId = +params['vacancyId'] || 1;
    });

    // Step 2: Set up the form and its validation rules.
    this.applyForm = this.fb.group({
      // Name must be filled and can only contain letters.
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      // Email must be in a valid format.
      email: ['', [Validators.required, Validators.email]],
      // CNIC must be exactly 13 digits.
      cnic: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      // Age must be between 18 and 60.
      age: ['', [Validators.required, Validators.min(18), Validators.max(60)]],
      // Phone number must contain only digits.
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      // CV file is required.
      cv: [null, Validators.required]
    });
  }

  // A helper function to make it easier to access form fields in the HTML.
  get f() { return this.applyForm.controls; }

  /* 
   * onFileChange(): Runs when the user selects a file from their computer.
   */
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      // Step 3: Get the first file selected by the user.
      this.cvFile = event.target.files[0];
      
      // Step 4: Update the form control value to tell Angular the file is selected.
      this.applyForm.patchValue({
        cv: this.cvFile
      });
    }
  }

  /* 
   * submitForm(): Runs when the 'Submit Application' button is clicked.
   */
  submitForm() {
    this.submitted = true;
    this.errorMessage = '';

    // Step 5: Stop if the form is invalid.
    if (this.applyForm.invalid) {
      return;
    }

    /* 
     * Step 6: Create 'FormData'.
     * Since we are uploading a file (CV), we cannot use a normal JSON object.
     * FormData allows us to bundle text and files together for the backend.
     */
    const formData = new FormData();
    formData.append('Name', this.applyForm.get('name')?.value);
    formData.append('Email', this.applyForm.get('email')?.value);
    formData.append('Cnic', this.applyForm.get('cnic')?.value);
    formData.append('Age', this.applyForm.get('age')?.value);
    formData.append('Phone', this.applyForm.get('phone')?.value);
    formData.append('VacancyId', this.vacancyId.toString());
    
    // Attach the actual CV file.
    if (this.cvFile) {
      formData.append('Cv', this.cvFile);
    }

    // Step 7: Send the FormData to the ApplicationService to save in the backend.
    this.applicationService.apply(formData).subscribe({
      next: (res: any) => {
        alert('Application submitted successfully!');
        this.router.navigate(['/job-apply']); // Go back to the jobs page.
      },
      error: (err) => {
        this.errorMessage = 'Failed to submit application. Please check your inputs.';
        console.error(err);
      }
    });
  }
}
