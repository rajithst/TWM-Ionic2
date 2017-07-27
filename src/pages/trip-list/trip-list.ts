import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Map } from '../../pages/map/map';
import {TripService} from '../service/trip.service';
/**
 * Generated class for the TripList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-trip-list',
  templateUrl: 'trip-list.html',
})
export class TripList {

  constructor(public navCtrl: NavController, public navParams: NavParams,public tripservice : TripService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripList');
  }
  trips : Trip;
  gettrip(){
    this.tripservice.getTrips()
    .subscribe(trips =>{
      this.trips = trips
    })
  }
pushPage(){
      this.navCtrl.push(Map, {
      // search_type: "123",
      // search_query: "Carl"
    });
}

}
