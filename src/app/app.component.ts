import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Articles } from '../pages/articles/articles';
import { Adventure } from '../pages/adventure/adventure';
import { Profile } from '../pages/profile/profile';
import { Settings } from '../pages/settings/settings';
import { Tabs } from '../pages/tabs/tabs';
import { Auth } from '../../providers/auth';
import { Search } from "../pages/search/search";
import { TripList } from "../pages/trip-list/trip-list";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  profile: any;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Articles;

  pages: Array<{title: string, component: any,icon:any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private app: App,
    public modalCtrl: ModalController
  ) {
    this.initializeApp();
 this.profile = JSON.parse(localStorage.getItem('profile'));
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: Tabs,icon:"home"  },
      { title: 'On Going Trip', component: TripList ,icon:"map"},
      { title: 'Adventure', component: Adventure,icon:"bicycle" },
      { title: 'Profile', component: Profile,icon:"person" },
      { title: 'Settings', component: Settings,icon:"settings"}
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component,{}, {animate: true, direction: 'forward'});
    this.nav.push(page.component);

  }
      showModal() {
        // reset 
       
        // show modal|
        let modal = this.modalCtrl.create(Search);
        modal.present();
    }

}
