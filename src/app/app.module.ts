import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {LoginPage} from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


// Firebase


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginProvider } from '../providers/login/login';
import { StringProvider } from '../providers/string/string';

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
    HomePage,
    ListPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage
  ],
  providers: [
    AngularFireDatabase,
    LoginProvider,
    StringProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    StringProvider
  ]
})
export class AppModule {}
