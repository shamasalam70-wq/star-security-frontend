import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginData = {
    email: '',
    password: ''
  };

  submitted = false;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.submitted = true;

    this.http.post<any>('http://localhost:5049/api/Auth/login', this.loginData)
      .subscribe({
        next: (user) => {
          if (user.role === 'Admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/employee']);
          }
        },
        error: () => {
          alert('Invalid credentials');
        }
      });
  }

  noSpaces(event: any) {
    event.target.value = event.target.value.replace(/\s/g, '');
    this.loginData.password = event.target.value;
  }
}