import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginData = {
    name: '',
    password: ''
  };

  submitted = false;

  login() {
    this.submitted = true;
  }

  onlyLetters(event: any) {
    event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, '');
    this.loginData.name = event.target.value;
  }

  noSpaces(event: any) {
    event.target.value = event.target.value.replace(/\s/g, '');
    this.loginData.password = event.target.value;
  }
}
