/* 
 * The Login component handles the user login page.
 * It uses Angular's 'Reactive Forms' for building and validating the login form.
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  // 'loginForm' is our container for the email and password fields.
  loginForm!: FormGroup;

  // Track if the user tried to submit the form.
  submitted = false;

  // Stores an error message if login fails.
  errorMessage = '';

  constructor(
    private fb: FormBuilder, // 'FormBuilder' is a helper to create the form.
    private authService: AuthService,
    private router: Router
  ) {}

  /* 
   * ngOnInit(): This runs automatically when the page loads.
   * We set up our form and its validation rules here.
   */
  ngOnInit() {
    this.loginForm = this.fb.group({
      // Email is required and must follow a valid email format.
      email: ['', [Validators.required, Validators.email]],
      // Password is required and must be at least 6 characters long.
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // A helper function to make it easier to access form fields in the HTML.
  get f() { return this.loginForm.controls; }

  /* 
   * login(): This function runs when the user clicks the 'Login' button.
   */
  login() {
    this.submitted = true;
    this.errorMessage = '';

    // Step 1: Check if the form has any validation errors.
    if (this.loginForm.invalid) {
      return; // Stop here if the form is not valid.
    }

    // Step 2: Send the form data (email and password) to the AuthService.
    this.authService.login(this.loginForm.value).subscribe({
      // next: This runs if the login was successful.
      next: (user) => {
        console.log('Login successful, user data:', user);
        
        // Step 3: Check the role (e.g., "Admin" or "Employee") to decide where to go.
        // We handle both lowercase 'role' and uppercase 'Role' from the backend.
        const role = user.role || user.Role;
        
        if (role === 'Admin') {
          // Go to the Admin dashboard page.
          this.router.navigate(['/admin']);
        } else if (role === 'Employee') {
          // Go to the Employee dashboard page.
          this.router.navigate(['/employee']);
        } else {
          // If the role is unknown, just go back to the home page.
          this.router.navigate(['/']);
        }
      },
      // error: This runs if the login failed.
      error: (err) => {
        // Show an error message to the user.
        this.errorMessage = 'Invalid email or password';
        console.error('Login error:', err);
      }
    });
  }
}
