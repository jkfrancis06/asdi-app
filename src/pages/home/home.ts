import {Component, EventEmitter} from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {LoginPage} from "../login/login";

import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {ManagerServiceProvider} from "../../providers/manager-service/manager-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user_id : any;
  public manager: any;
  loading : any;




  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
               private storage: Storage,
              private authService: AuthServiceProvider,
              private managerService: ManagerServiceProvider) {

  }


  presentLoadingDefault(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();
  }

}
