import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './user-layout.html',
  styleUrls: ['./user-layout.css']  
})
export class UserLayout {}
