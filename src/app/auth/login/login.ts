import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginData = {
    name: '',
    password: ''
  };

  login() {
    console.log(this.loginData);
    alert('Login clicked (connect to backend later)');
  }
}
