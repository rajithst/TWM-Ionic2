import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { Http } from '@angular/http';


/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth:Auth,
    public http:Http,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
  }

}
