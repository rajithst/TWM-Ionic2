import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Articles } from '../articles/articles';
import { HomePage } from '../home/home';
import { Travels } from '../travels/travels';
import { Places } from '../places/places';
import { Accomodation } from '../accomodation/accomodation';

/**
 * Generated class for the Tabs page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class Tabs {


  tab1Root: any = HomePage;
  tab2Root: any = Articles;
  tab3Root: any = Travels;
  tab4Root: any = Places;
  tab5Root: any = Accomodation;





  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tabs');
  }

}
