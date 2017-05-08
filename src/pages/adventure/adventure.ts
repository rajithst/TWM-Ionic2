import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, ModalController, Platform } from 'ionic-angular';
import { AdvModal } from "../adv-modal/adv-modal";
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';


/**
 * Generated class for the Adventure page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-adventure',
  templateUrl: 'adventure.html',
})
export class Adventure {
    address;
  map: GoogleMap;
  step: any;
  stepCondition: any;
  stepDefaultCondition: any;
  currentStep: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public evts: Events,public platform: Platform,public modalCtrl: ModalController) {
    this.address = {
      place: ''
    };
     platform.ready().then(() => {
            this.loadMap();
        });


    this.step = 1;//The value of the first step, always 1
    this.stepCondition = false;//Set to true if you don't need condition in every step
    this.stepDefaultCondition = this.stepCondition;//Save the default condition for every step
    //You can subscribe to the Event 'step:changed' to handle the current step
    this.evts.subscribe('step:changed', step => {
      //Handle the current step if you need
      this.currentStep = step[0];
      //Set the step condition to the default value
      this.stepCondition = this.stepDefaultCondition;
    });
    this.evts.subscribe('step:next', () => {
      //Do something if next
      console.log('Next pressed: ', this.currentStep);
    });
    this.evts.subscribe('step:back', () => {
      //Do something if back
      console.log('Back pressed: ', this.currentStep);
    });
  }

 
  ionViewDidLoad() {
    console.log('ionViewDidLoad Adventure');
    
    let myModal = this.modalCtrl.create(AdvModal);
    let me = this;
    myModal.onDidDismiss(data => {
      this.address.place = data;
    });
    myModal.present();
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

  onFinish() {
    this.alertCtrl.create({
      message: 'Wizard Finished!!',
      title: 'Congrats!!',
      buttons: [{
        text: 'Ok'
      }]
    }).present();
  }

  toggle() {
    this.stepCondition = !this.stepCondition;
  }
  getIconStep2() {
    return this.stepCondition ? 'unlock' : 'lock';
  }

  getIconStep3() {
    return this.stepCondition ? 'happy' : 'sad';
  }
  getLikeIcon() {
    return this.stepCondition ? 'thumbs-down' : 'thumbs-up';
  }
 /* goToExample2() {
    this.navCtrl.push(DynamicPage);
  }*/

  textChange(e) {
    if (e.target.value && e.target.value.trim() !== '') {
      this.stepCondition = true;
    } else {
      this.stepCondition = false;
    }
  }




}
