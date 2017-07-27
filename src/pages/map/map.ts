import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent } from 'ionic-native';
import { ActionSheetController } from 'ionic-angular';
import { TripList } from "../trip-list/trip-list";
import { AlertController } from 'ionic-angular';
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
  markers :any;
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams,public platform: Platform,public actionSheetCtrl: ActionSheetController) {
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
   var pointA = new google.maps.LatLng(6.927078600000002, 79.86124300000006)
   var pointB = new google.maps.LatLng(6.8666988, 81.046553)
        var map = new google.maps.Map(document.getElementById('map'), {
           zoom: 7,
          center: {lat: 7.290571500000001, lng: 80.63372619999996}  // Australia.
        });

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer({
          draggable: true,
          map: map,
          
        });
    var markerA = new google.maps.Marker({
      position: pointA,
      title: "point A",
      label: "A",
      map: map
    });
   var markerB = new google.maps.Marker({
      position: pointB,
      title: "point B",
      label: "B",
      map: map
    });

        directionsDisplay.addListener('directions_changed', function() {
          this.computeTotalDistance(directionsDisplay.getDirections());
        });

        this.displayRoute(pointA, pointB, directionsService,
            directionsDisplay);
      }

      private displayRoute(origin, destination, service, display) {
        service.route({
          origin: origin,
          destination: destination,
          // waypoints: [{location: 'Adelaide, SA'}, {location: 'Broken Hill, NSW'}],
          travelMode: 'DRIVING',
          avoidTolls: true
        }, function(response, status) {
          if (status === 'OK') {
            display.setDirections(response);
          } else {
            alert('Could not display directions due to: ' + status);
          }
        });
      }

      public computeTotalDistance(result) {
        var total = 0;
        var myroute = result.routes[0];
        for (var i = 0; i < myroute.legs.length; i++) {
          total += myroute.legs[i].distance.value;
        }
        total = total / 1000;
        document.getElementById('total').innerHTML = total + ' km';
      }

   private deleteMarkers() {
        this.setMapOnAll(null);
        this.markers = [];
      }

           private setMapOnAll(map) {
        for (var i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(map);
        }
      }

// private initMap() {
//   var pointA = new google.maps.LatLng(51.7519, -1.2578)
//    var pointB = new google.maps.LatLng(50.8429, -0.1313),
//     myOptions = {
//       zoom: 7,
//       center: pointA
//     },
//     map = new google.maps.Map(document.getElementById('map'), myOptions),
//     // Instantiate a directions service.
//     directionsService = new google.maps.DirectionsService,
//     directionsDisplay = new google.maps.DirectionsRenderer({
//       map: map
//     }),
//     markerA = new google.maps.Marker({
//       position: pointA,
//       title: "point A",
//       label: "A",
//       map: map
//     }),
//     markerB = new google.maps.Marker({
//       position: pointB,
//       title: "point B",
//       label: "B",
//       map: map
//     });

//   // get route from A to B
//   this.calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);

// }


private showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Are you sure to clear all the waypoints?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

   showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          

          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}


