import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchResult page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResult {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
             let search_type = navParams.get('search_type');
     let search_query = navParams.get('search_query');
  }

  ionViewDidLoad() {
    console.log('{{search_type}}');
    console.log('{{search_query}}')
  }

}
