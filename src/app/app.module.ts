import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';


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
import { Login } from '../pages/login/login';
import {IonSimpleWizard} from '../pages/ion-simple-wizard/ion-simple-wizard.component';
import {IonSimpleWizardStep} from '../pages/ion-simple-wizard/ion-simple-wizard.step.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TripList } from "../pages/trip-list/trip-list";


import { Auth } from '../providers/auth';
import { AdvModal } from "../pages/adv-modal/adv-modal";
import { Search } from "../pages/search/search"
import {SearchResult } from"../pages/search-result/search-result"
import { Post } from "../pages/post/post";
import { ValidateService } from "../service/validate.service";
import { AuthService } from "../service/auth-service/auth-service";
import { AuthGuard } from "../service/auth.guard";
import { BusinesspageService } from "../service/businesspage.service";
import { BlogServiceService } from "../service/blog-service.service";
import { GooglemapsService } from "../service/googlemaps.service";
import { FacebookService } from "../service/facebook.service";
import { UserServicesService } from "../service/user-services.service";
import { Auth0Service } from "../service/auth0.service";
import { GoogleAPIService } from "../service/google-api.service";

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
    Accomodation,
    Login,
    IonSimpleWizard,
    IonSimpleWizardStep,
    AdvModal,
    Search,
    SearchResult,
    TripList,
    Post

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
    Accomodation,
    Login,
    IonSimpleWizard,
    IonSimpleWizardStep,
    AdvModal,
    Search,
    SearchResult,
    TripList,
    Post
  ],
  providers: [

    ValidateService,
    AuthService,
    AuthGuard,
    BusinesspageService,
    GooglemapsService,
    BlogServiceService,
    Auth0Service,
    FacebookService,
    GoogleAPIService,
    UserServicesService,
    
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Auth
  ]
})
export class AppModule {}
