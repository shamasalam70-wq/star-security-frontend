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
  vacancies: any[] = [];
  loading = true;

  constructor(private vacancyService: VacancyService) {}

  ngOnInit() {
    this.loadVacancies();
  }

  loadVacancies() {
    this.loading = true;
    this.vacancyService.getVacancies().subscribe({
      next: (data) => {
        console.log('Public Vacancies:', data);
        this.vacancies = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Public Vacancies error:', err);
        this.loading = false;
      }
    });
  }
}
