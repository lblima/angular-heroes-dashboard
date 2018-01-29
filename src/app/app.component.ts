import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(
      private authenticationService: AuthenticationService, 
      private router: Router,
      private messageService: MessageService) { }

  title = 'Tour of Heroes';

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    this.messageService.clear();
  }
}