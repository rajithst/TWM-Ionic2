import { Component, ViewChild } from '@angular/core';
import { App,Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Map } from '../pages/map/map';
import { Adventure } from '../pages/adventure/adventure';
import { Profile } from '../pages/profile/profile';
import { Settings } from '../pages/settings/settings';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any,icon:any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private app: App

  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage,icon:"home"  },
      { title: 'Map', component: Map ,icon:"map"},
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
    this.nav.setRoot(page.component);


  }
}
