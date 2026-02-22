/* 
 * The Footer component is shared across all public pages.
 * It usually contains links, copyright info, and contact details.
 */

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true, // Marking as standalone if not already (checked imports in app.ts)
  imports: [RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  // Static content component.
}
