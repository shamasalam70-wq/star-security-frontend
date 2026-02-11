import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Eproject-UI');

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(res => {
      console.log(res);
    });
  }
}
