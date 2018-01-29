import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(userName: string, password: string) {
    let _headers = new HttpHeaders();
    _headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', userName);
    urlSearchParams.append('password', password);
    urlSearchParams.append('grant_type', 'password');
    
    let body = urlSearchParams.toString()

    return this.http.post<any>('http://localhost:55113/token', body, { headers: _headers })
    .map(user => {

        if (user && user.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      })
    .catch(err => {
        return Observable.throw(err);
    });
  }
  
  logout() {
    localStorage.removeItem('currentUser');
  }

  register(userName: string, password: string, confirmPassword: string) {
    let _headers = new HttpHeaders();
    _headers.append('Content-Type', 'application/json');

    let body = { 'email': userName, 'password': password, 'confirmpassword': confirmPassword };

    //responseType: 'text' in order to handler empty response with 200 OK (bug on Angular HttpClient module)
    return this.http.post('http://localhost:55113/api/Account/Register', body, { headers: _headers, responseType: 'text' } );
  }
}