import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { Login } from '../../pages/login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'



})
export class HomePage {
 splash = true;
 tabBarElement:any;
  x:any;
  

  constructor(public navCtrl: NavController, public auth:Auth,public alert: AlertController,public platform: Platform) {

   
    this.tabBarElement = document.querySelector('.tabbar')
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
  ionViewDidLoad(){
    this.exit;
    setTimeout(()=>{
      this.splash= false;
    },2000);
  }

    exit(){
      let alert = this.alert.create({
        title: 'Confirm',
        message: 'Do you want to exit?',
        buttons: [{
          text: "exit?",
          handler: () => { this.exitApp() }
        }, {
          text: "Cancel",
          role: 'cancel'
        }]
      })
      alert.present();
  }
  exitApp(){
    this.platform.exitApp();
  }
  
}
