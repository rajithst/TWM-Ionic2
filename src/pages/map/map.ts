import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
/**
 * Generated class for the Map page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class Map {
 map: GoogleMap;
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform) {
     platform.ready().then(() => {
            this.loadMap();
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Map');
    this.map = new GoogleMap('map');
  
  }


 loadMap(){

        let location = new GoogleMapsLatLng(-34.9290,138.6010);

        this.map = new GoogleMap('map', {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': location,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });

        this.map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

    }
  backPage(){

    this.navCtrl.pop();
  }

}
