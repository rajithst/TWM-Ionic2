import { Storage } from '@ionic/storage';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

declare var Auth0: any;
declare var Auth0Lock: any;


@Injectable()
export class Auth {


  jwtHelper: JwtHelper = new JwtHelper();
  auth0 = new Auth0({clientID: "IOO2oD43LLBM2AAu619YMYNLdOG34hE6", domain: "travelproject.auth0.com"});
  lock = new Auth0Lock("IOO2oD43LLBM2AAu619YMYNLdOG34hE6", "travelproject.auth0.com", {

    auth: {
      redirect: false,
      params: {
        scope: 'openid profile offline_access',
        device: 'my-device'
      },
      sso: false
    }
  });


  storage: Storage;
  refreshSubscription: any;
  user: Object;
  zoneImpl: NgZone;
  accessToken: string;
  idToken: string;

  constructor(private authHttp: AuthHttp, zone: NgZone) {
    this.zoneImpl = zone;
    // Check if there is a profile saved in local storage
    this.storage.get('profile').then(profile => {
      this.user = JSON.parse(profile);
    }).catch(error => {
      console.log(error);
    });

    this.storage.get('id_token').then(token => {
      this.idToken = token;
    });

    this.lock.on('authenticated', authResult => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.storage.set('access_token', authResult.accessToken);
        this.storage.set('id_token', authResult.idToken);
        this.storage.set('refresh_token', authResult.refreshToken);
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;

        // Fetch profile information
        this.lock.getUserInfo(this.accessToken, (error, profile) => {
          if (error) {
            // Handle error
            alert(error);
            return;
          }

          profile.user_metadata = profile.user_metadata || {};
          this.storage.set('profile', JSON.stringify(profile));
          this.user = profile;
        });

        this.lock.hide();

        this.zoneImpl.run(() => this.user = authResult.profile);
        // // Schedule a token refresh
        //this.scheduleRefresh();
      }

    });
  }

  public authenticated() {
    return tokenNotExpired('id_token', this.idToken);
  }

  public login() {
    // Show the Auth0 Lock widget
    this.lock.show();
  }

  public logout() {
    this.storage.remove('profile');
    this.storage.remove('access_token');
    this.storage.remove('id_token');
    this.idToken = null;
    this.storage.remove('refresh_token');
    this.zoneImpl.run(() => this.user = null);
    // Unschedule the token refresh
    //this.unscheduleRefresh();
  }
}
