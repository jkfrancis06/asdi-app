import {Component, OnInit, ViewChild} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {LoginPage} from "../pages/login/login";
import {Manager} from "../models/manager.model";

import {ManagerServiceProvider} from "../providers/manager-service/manager-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  manager: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              private statusBar: StatusBar,
              private managerService: ManagerServiceProvider,
              private storage: Storage,
              public splashScreen: SplashScreen) {



    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Login', component: LoginPage }
    ];


  }

  ngOnInit() {
    console.log('app component view did load');
    this.storage.get('manager').then((val) => {
      console.log(val)
      this.manager = val
    });
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.statusBar.overlaysWebView(false);
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#488aff');

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
