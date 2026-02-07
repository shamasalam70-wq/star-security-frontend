import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-job-apply',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './job-apply.html',
  styleUrl: './job-apply.css',
})
export class JobApply {

  vacancies = [
    { title: 'Security Guard', salary: '25,000 PKR', timing: 'Day Shift' },
    { title: 'Night Watchman', salary: '30,000 PKR', timing: 'Night Shift' },
    { title: 'Office Security', salary: '35,000 PKR', timing: '9am - 6pm' },
    { title: 'Event Guard', salary: 'Per Event', timing: 'Flexible' }
  ];
}
