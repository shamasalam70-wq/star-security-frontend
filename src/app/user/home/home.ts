/* 
 * The Home component is the main landing page of the application.
 * It's usually the first thing the users see when they visit the website.
 */

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true, // Indicates that this component manages its own imports.
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html', // This points to the HTML file that defines the design.
  styleUrl: './home.css', // This points to the CSS file for styling.
})
export class Home {
  // Currently, the Home component only displays static HTML.
}
