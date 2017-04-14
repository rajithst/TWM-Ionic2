import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Map} from '../pages/map/map';
import { Adventure } from '../pages/adventure/adventure';
import { Profile } from '../pages/profile/profile';
import { Settings } from '../pages/settings/settings';
import { Articles } from '../pages/articles/articles';
import { Travels } from '../pages/travels/travels';
import { Tabs } from '../pages/tabs/tabs';

import { Places } from '../pages/places/places';
import { Accomodation } from '../pages/accomodation/accomodation';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Map,
    Adventure,
    Profile,
    Settings,
    Articles,
    Travels,
    Tabs,
    Places,
    Accomodation

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{tabsPlacement:top}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Map,
    Adventure,
    Profile,
    Settings,
    Articles,
    Travels,
    Tabs,
    Places,
    Accomodation

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

  ]
})
export class AppModule {}
