/* 
 * The JobApply component lists all current job openings (vacancies).
 * Users can browse these jobs and click a button to apply.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VacancyService } from '../../services/vacancy.service';

@Component({
  selector: 'app-job-apply',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './job-apply.html',
  styleUrl: './job-apply.css',
})
export class JobApply implements OnInit {
  // 'vacancies' will store the list of jobs fetched from the backend.
  vacancies: any[] = [];

  // Used to show a "Loading..." message while we wait for data from the backend.
  loading = true;

  constructor(private vacancyService: VacancyService) {}

  /* 
   * ngOnInit(): Automatically runs when the page loads.
   */
  ngOnInit() {
    this.loadVacancies();
  }

  /* 
   * loadVacancies(): Fetches the list of job openings from the VacancyService.
   */
  loadVacancies() {
    this.loading = true;
    
    // We 'subscribe' to the observable returned by the service.
    this.vacancyService.getVacancies().subscribe({
      next: (data) => {
        // Success: Store the data and stop the loading message.
        console.log('Public Vacancies:', data);
        this.vacancies = data;
        this.loading = false;
      },
      error: (err) => {
        // Error: Log the problem and stop the loading message.
        console.error('Public Vacancies error:', err);
        this.loading = false;
      }
    });
  }
}
