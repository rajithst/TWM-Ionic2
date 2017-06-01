import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
@ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:Auth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
 
  }
 goToSlide() {
    this.slides.slideTo(2, 500);
  }
}
