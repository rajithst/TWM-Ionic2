import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
declare var google: any
/**
 * Generated class for the AdvModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()

@Component({
  selector: 'page-adv-modal',
  templateUrl: 'adv-modal.html',
})

export class AdvModal {
  
autocompleteItems;
  autocomplete;
  
  service = new google.maps.places.AutocompleteService();
  constructor(public viewCtrl: ViewController, private zone: NgZone,public navCtrl: NavController, public navParams: NavParams) {
this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
 
  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
    console.log(item);
  }
  
  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: {country: 'LK'} }, function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () {
        predictions.forEach(function (prediction) {
          me.autocompleteItems.push(prediction.description);
        });
      });
    });
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvModal');
  }
   goBack() {
    this.navCtrl.pop();
  }
  
}