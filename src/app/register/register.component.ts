import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.authenticationService.register(this.model.username, this.model.password, this.model.confirmpassword)
      .subscribe(
        (data) => {
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
        },
        () => {
          console.log('done');
        }) 
  }
}