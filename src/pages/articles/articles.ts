import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from "../post/post";

/**
 * Generated class for the Articles page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-articles',
  templateUrl: 'articles.html',
})
export class Articles {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Articles');
  }
 ionViewWillUnload() {
    console.log("Looks like I'm about to leave :(");
      this.navCtrl.pop(Post);
  }

    pushPage(){
   
    this.navCtrl.push(Post, {
    
    });
  }

}
