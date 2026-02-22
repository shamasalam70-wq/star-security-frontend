/* 
 * The UserLayout component is the main shell for the public part of the website.
 * It includes the shared Navbar and Footer, and uses a <router-outlet> to show 
 * different pages (like Home, Job Apply, etc.) inside it.
 */

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
export class UserLayout {
  // This class is empty because it only serves as a visual wrapper for other pages.
}
