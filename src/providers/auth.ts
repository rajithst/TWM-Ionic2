
import { tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';


/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

declare var Auth0Lock: any;


@Injectable()
export class Auth {


  lock = new Auth0Lock("Gcw8OrOOHWjaUsOQbMQDbHm24LI3h2Iv", "travelproject.auth0.com");


  constructor() {


    this.lock.on('authenticated', (authResult: any) => {
      this.lock.getProfile(authResult.idToken, function (error: any, profile: any) {
        if (error){
          throw new Error(error);
        }

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));

      });
    });

  }

  public authenticated() {
    return tokenNotExpired();
  }

  public login() {
    // Show the Auth0 Lock widget
    this.lock.show();
  }

  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    // Unschedule the token refresh
    //this.unscheduleRefresh();
  }
}
