import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Map } from '../../pages/map/map';
/**
 * Generated class for the Travels page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-travels',
  templateUrl: 'travels.html',
})
export class Travels {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Travels');
  }
 pushPage(){
  console.log('ionViewDidLoad Travels');
    this.navCtrl.push(Map, {
     
    });
  }
}
