
/* pour faire marché l'app sur android:
1-ionic cordova platform add android
2- ionic cordova build android
attention JDK9 donne message erreur mettre JDK8*/

/* pour l'api google maps installation de npm install --save angular2-google-maps format déprécié... a voir
bon package: npm install @agm/core --save */
/* pour la geolocation sur le mobile:
ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="To locate you"
npm install --save @ionic-native/geolocation
 */
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
/* pour que les composents google map foncitonnent il faut cet import
et la déclaration dans import ngModule
adresse pour avoir l'APIkey: https://angular-maps.com/  */
import {AgmCoreModule} from "@agm/core";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddPlacePage } from '../pages/add-place/add-place';
import { PlacePage } from '../pages/place/place';
import { SetLocationPage } from '../pages/set-location/set-location';
/* import obligatoire pour la geolocalisation */
import { Geolocation } from '@ionic-native/geolocation';
/* import Camera */
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPlacePage,
    PlacePage,
    SetLocationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
     apiKey: 'AIzaSyBVDdhSlL4KXl489QC5W7ToGdOhPX9npZc'

    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPlacePage,
    PlacePage,
    SetLocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    Camera  ]
})
export class AppModule {}
