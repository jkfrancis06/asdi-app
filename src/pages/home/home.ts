import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import {Manager} from "../../models/manager.model";
import {LoginPage} from "../login/login";
import { App } from "ionic-angular";
import {FarmServiceProvider} from "../../providers/farm-service/farm-service";
import {TabsPage} from "../tabs/tabs";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  manager: Manager;
  managers: any;
  farms: any;
  manager_farms = [];
  loading : any;


  constructor(public navCtrl: NavController,
              private storage: Storage,
              private appCtrl: App,
              private farmService: FarmServiceProvider,
              public loadingCtrl: LoadingController) {

    this.presentLoadingDefault();
    storage.get('manager').then((val) => {
      this.manager = JSON.parse(val)
      this.farmService.getFarms().subscribe(
        farms => {
          this.farms = farms;
          console.log(this.farms);
          for (let i = 0; i < this.farms.length; i++) {
            for (let j = 0; j < this.farms[i].gestionnaires.length; j++) {
              if (this.manager.key === this.farms[i].gestionnaires[j].key) {
                this.manager_farms.push(this.farms[i]);
                console.log(this.manager_farms);
              }
            }
          }
          console.log(this.manager_farms);
          this.loading.dismiss();
        });
    });



  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();
  }

  loadFarm(index) {
    let farm = this.manager_farms[index]
    this.storage.set('farm', JSON.stringify(farm));
    this.appCtrl.getRootNav().setRoot(TabsPage);
  }

}
