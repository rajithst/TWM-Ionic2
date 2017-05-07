import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { Login } from '../../pages/login/login';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'



})
export class HomePage {

  x:any;
  constructor(public navCtrl: NavController, public auth:Auth) {

// doRefresh(refresher) {
//   this.someService.getPosts().subscribe(res => {
//     this.posts = res;
//     refresher.complete();
//   });
// }

    this.x = this.auth.authenticated();
    if(this.x == false){
      this.navCtrl.push(Login);
    }
  }

}
