import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('AuthGuard: executing...');

        if (localStorage.getItem('currentUser')) {
            console.log('AuthGuard: User found and allow access...');
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        console.log('AuthGuard: User not logged and redirecting to login page...');
        return false;
    }
}