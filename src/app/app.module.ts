import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Map} from '../pages/map/map';
import { Adventure } from '../pages/adventure/adventure';
import { Profile } from '../pages/profile/profile';
import { Settings } from '../pages/settings/settings';
import { Articles } from '../pages/articles/articles';
import { Travels } from '../pages/travels/travels';
import { Tabs } from '../pages/tabs/tabs';
import { HttpModule } from '@angular/http';
import { Places } from '../pages/places/places';
import { Accomodation } from '../pages/accomodation/accomodation';

import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Auth } from '../providers/auth';
import { Http } from '@angular/http';


let storage: Storage;

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token'))
  }), http);
}



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
    BrowserModule,HttpModule,
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
    Auth,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }
  ]
})
export class AppModule {}
