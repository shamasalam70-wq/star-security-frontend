import { Component } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Navbar,RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}


