import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent } from 'ionic-native';
import { ActionSheetController } from 'ionic-angular';
import { TripList } from "../trip-list/trip-list";

/**
 * Generated class for the Map page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google:any;
@IonicPage()


@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})


export class Map {
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform,public actionSheetCtrl: ActionSheetController) {
     platform.ready().then(() => {
            
        });
  }

presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Map');
   google.maps.event.trigger( this.map, 'resize' );
  
  }
  ngOnInit(){
     
 this.initMap();
  }
private calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
  directionsService.route({
    origin: pointA,
    destination: pointB,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}



private initMap() {
  var pointA = new google.maps.LatLng(51.7519, -1.2578)
   var pointB = new google.maps.LatLng(50.8429, -0.1313),
    myOptions = {
      zoom: 7,
      center: pointA
    },
    map = new google.maps.Map(document.getElementById('map'), myOptions),
    // Instantiate a directions service.
    directionsService = new google.maps.DirectionsService,
    directionsDisplay = new google.maps.DirectionsRenderer({
      map: map
    }),
    markerA = new google.maps.Marker({
      position: pointA,
      title: "point A",
      label: "A",
      map: map
    }),
    markerB = new google.maps.Marker({
      position: pointB,
      title: "point B",
      label: "B",
      map: map
    });

  // get route from A to B
  this.calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);

}



}
