/**
 * Created by rajith on 2/28/17.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Auth0Service } from './auth0.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: Auth0Service, private router: Router) {}

  canActivate() {
    if(this.auth.authenticated()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
