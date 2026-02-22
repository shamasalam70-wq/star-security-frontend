/* 
 * This is the root component of our Angular application.
 * All other components (like Login, Home, AdminDashboard) are displayed inside this one.
 */

import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // RouterOutlet allows us to switch between pages using routes.
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  // A simple title property using Angular Signals.
  protected readonly title = signal('Eproject-UI');

  constructor() {}

  /* 
   * ngOnInit(): This runs when the app first starts up.
   */
  ngOnInit() {
    // Initial setup logic can go here.
  }
}
