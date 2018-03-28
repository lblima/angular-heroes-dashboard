import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  returnUrl: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) { }

  @Output() loginClicked = new EventEmitter();

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  login() {
    this.loginClicked.emit();
    
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        console.log(error);
      }
    )
  }
}