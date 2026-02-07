import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employee-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './employee-layout.html',
  styleUrls: ['./employee-layout.css']
})
export class EmployeeLayout {}
