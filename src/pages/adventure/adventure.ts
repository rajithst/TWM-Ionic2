// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams, Events, AlertController, ModalController, Platform } from 'ionic-angular';
import { AdvModal } from "../adv-modal/adv-modal";
import { GoogleMap, GoogleMapsEvent } from 'ionic-native';


// /**
//  * Generated class for the Adventure page.
//  *
//  * See http://ionicframework.com/docs/components/#navigation for more info
//  * on Ionic pages and navigation.
//  */
// @IonicPage()

// export class Adventure {
//     address;
//   map: GoogleMap;
//   step: any;
//   stepCondition: any;
//   stepDefaultCondition: any;
//   currentStep: any;

//   constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public evts: Events,public platform: Platform,public modalCtrl: ModalController) {
//     this.address = {
//       place: ''
//     };
//      platform.ready().then(() => {
//             this.loadMap();
//         });


//     this.step = 1;//The value of the first step, always 1
//     this.stepCondition = false;//Set to true if you don't need condition in every step
//     this.stepDefaultCondition = this.stepCondition;//Save the default condition for every step
//     //You can subscribe to the Event 'step:changed' to handle the current step
//     this.evts.subscribe('step:changed', step => {
//       //Handle the current step if you need
//       this.currentStep = step[0];
//       //Set the step condition to the default value
//       this.stepCondition = this.stepDefaultCondition;
//     });
//     this.evts.subscribe('step:next', () => {
//       //Do something if next
//       console.log('Next pressed: ', this.currentStep);
//     });
//     this.evts.subscribe('step:back', () => {
//       //Do something if back
//       console.log('Back pressed: ', this.currentStep);
//     });
//   }

 
//   ionViewDidLoad() {
//     console.log('ionViewDidLoad Adventure');
    
//     let myModal = this.modalCtrl.create(AdvModal);
//     let me = this;
//     myModal.onDidDismiss(data => {
//       this.address.place = data;
//     });
//     myModal.present();
//     this.map = new GoogleMap('map');
    
//   }
//  loadMap(){

//         let location = new GoogleMapsLatLng(-34.9290,138.6010);

//         this.map = new GoogleMap('map', {
//           'backgroundColor': 'white',
//           'controls': {
//             'compass': true,
//             'myLocationButton': true,
//             'indoorPicker': true,
//             'zoom': true
//           },
//           'gestures': {
//             'scroll': true,
//             'tilt': true,
//             'rotate': true,
//             'zoom': true
//           },
//           'camera': {
//             'latLng': location,
//             'tilt': 30,
//             'zoom': 15,
//             'bearing': 50
//           }
//         });

//         this.map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

//     }

//   onFinish() {
//     this.alertCtrl.create({
//       message: 'Wizard Finished!!',
//       title: 'Congrats!!',
//       buttons: [{
//         text: 'Ok'
//       }]
//     }).present();
//   }

//   toggle() {
//     this.stepCondition = !this.stepCondition;
//   }
//   getIconStep2() {
//     return this.stepCondition ? 'unlock' : 'lock';
//   }

//   getIconStep3() {
//     return this.stepCondition ? 'happy' : 'sad';
//   }
//   getLikeIcon() {
//     return this.stepCondition ? 'thumbs-down' : 'thumbs-up';
//   }
//  /* goToExample2() {
//     this.navCtrl.push(DynamicPage);
//   }*/

//   textChange(e) {
//     if (e.target.value && e.target.value.trim() !== '') {
//       this.stepCondition = true;
//     } else {
//       this.stepCondition = false;
//     }
//   }




// }
import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';


declare var google:any;

@Component({
  selector: 'page-adventure',
  templateUrl: 'adventure.html',
})
export class Adventure implements OnInit {

    address:any = {
        place: '',
        set: false,
    };
    placesService:any;
    map: any;
    markers = [];
    placedetails: any;

    constructor(public navCtrl: NavController,
        public modalCtrl: ModalController) { 
    }

    ngOnInit() {
        this.initMap();
        this.initPlacedetails();
        
    }


    showModal() {
        // reset 
        this.reset();
        // show modal|
        let modal = this.modalCtrl.create(AdvModal);
        modal.onDidDismiss(data => {
            console.log('page > modal dismissed > data > ', data);
            if(data){
                this.address.place = data.description;
                // get details
                this.getPlaceDetail(data.place_id);
            }                
        })
        modal.present();
    }


    private reset() {
        this.initPlacedetails();
        this.address.place = '';
        this.address.set = false;
    }

    private getPlaceDetail(place_id:string):void {
        var self = this;
        var request = {
            placeId: place_id
        };
        this.placesService = new google.maps.places.PlacesService(this.map);
        this.placesService.getDetails(request, callback);
        function callback(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log('page > getPlaceDetail > place > ', place);
                // set full address
                self.placedetails.address = place.formatted_address;
                self.placedetails.lat = place.geometry.location.lat();
                self.placedetails.lng = place.geometry.location.lng();
                for (var i = 0; i < place.address_components.length; i++) {
                    let addressType = place.address_components[i].types[0];
                    let values = {
                        short_name: place.address_components[i]['short_name'],
                        long_name: place.address_components[i]['long_name']
                    }
                    if(self.placedetails.components[addressType]) {
                        self.placedetails.components[addressType].set = true;
                        self.placedetails.components[addressType].short = place.address_components[i]['short_name'];
                        self.placedetails.components[addressType].long = place.address_components[i]['long_name'];
                    }                                     
                }                  
                // set place in map
                self.map.setCenter(place.geometry.location);
                self.createMapMarker(place);
                // populate
                self.address.set = true;
                console.log('page > getPlaceDetail > details > ', self.placedetails);
            }else{
                console.log('page > getPlaceDetail > status > ', status);
            }
        }
    }

    private initMap() {
        var point = {lat: -34.603684, lng: -58.381559}; 
        let divMap = (<HTMLInputElement>document.getElementById('map'));
        this.map = new google.maps.Map(divMap, {
            center: point,
            zoom: 15,
            disableDefaultUI: true,
            draggable: true,
            zoomControl: true
        });
    }

    private createMapMarker(place:any):void {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: this.map,
          position: placeLoc
        });    
        this.markers.push(marker);
    }

    private initPlacedetails() {
        this.placedetails = {
            address: '',
            lat: '',
            lng: '',
            components: {photo_reference:{},
                route: { set: false, short:'', long:'' },                           // calle 
                street_number: { set: false, short:'', long:'' },                   // numero
                sublocality_level_1: { set: false, short:'', long:'' },             // barrio
                locality: { set: false, short:'', long:'' },                        // localidad, ciudad
                administrative_area_level_2: { set: false, short:'', long:'' },     // zona/comuna/partido 
                administrative_area_level_1: { set: false, short:'', long:'' },     // estado/provincia 
                country: { set: false, short:'', long:'' },                         // pais
                postal_code: { set: false, short:'', long:'' },                     // codigo postal
                postal_code_suffix: { set: false, short:'', long:'' },              // codigo postal - sufijo
            }    
        };        
    }    
}

