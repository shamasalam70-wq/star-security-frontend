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

  constructor(private vacancyService: VacancyService) {}

  ngOnInit() {
    this.vacancyService.getVacancies().subscribe(data => {
      this.vacancies = data;
    });
  }
}
