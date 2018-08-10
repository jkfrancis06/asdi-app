// import { NgModule, ErrorHandler } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
// import { MyApp } from './app.component';
//

//
// import { SplashScreen } from '@ionic-native/splash-screen';
//
// @NgModule({
//   declarations: [

//   ],
//   imports: [
//     BrowserModule,
//     IonicModule.forRoot(MyApp)
//   ],
//   bootstrap: [IonicApp],
//   entryComponents: [
//     MyApp,
//     AboutPage,
//     ContactPage,
//     HomePage,
//     TabsPage
//   ],
//   providers: [
//     StatusBar,
//     SplashScreen,
//     {provide: ErrorHandler, useClass: IonicErrorHandler}
//   ]
// })
// export class AppModule {}


import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { IonicImageViewerModule } from 'ionic-img-viewer';



// Firebase


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireDatabase} from 'angularfire2/database';
import { LoginProvider } from '../providers/login/login';
import { StringProvider } from '../providers/string/string';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ManagerServiceProvider } from '../providers/manager-service/manager-service';
import { FarmServiceProvider } from '../providers/farm-service/farm-service';
import {LoginPage} from "../pages/login/login";
import {ReportPage} from "../pages/report/report";
import { ReportServiceProvider } from '../providers/report-service/report-service';
import {TextAvatarDirective} from "../directives/text-avatar/text-avatar";
import {ReportDetailsPage} from "../pages/report-details/report-details";
import {FileTransfer} from "@ionic-native/file-transfer";
import {File} from "@ionic-native/file";
import {Diagnostic} from "@ionic-native/diagnostic";

export const firebaseConfig = {
  apiKey: 'AIzaSyCziMXftyDQlqvUkEAR2bUDd1qBIEb2KyI',
  authDomain: 'asdi-20ebf.firebaseapp.com',
  databaseURL: 'https://asdi-20ebf.firebaseio.com',
  projectId: 'asdi-20ebf',
  storageBucket: 'asdi-20ebf.appspot.com',
  messagingSenderId: '1025332104486'
}



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    ReportPage,
    ReportDetailsPage,
    TextAvatarDirective
  ],
  imports: [
    BrowserModule,
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    ReportDetailsPage,
    ReportPage
  ],
  providers: [
    FileTransfer,
    File,
    Diagnostic,
    AngularFireDatabase,
    LoginProvider,
    StringProvider,
    SplashScreen,
    StatusBar,
    Storage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    StringProvider,
    AuthServiceProvider,
    AuthServiceProvider,
    ManagerServiceProvider,
    FarmServiceProvider,
    ReportServiceProvider
  ]
})
export class AppModule {}
