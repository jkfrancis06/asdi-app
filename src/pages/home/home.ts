import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {LoginPage} from "../login/login";

import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user_id : any;

  constructor(public navCtrl: NavController,
               private storage: Storage,
              private authService: AuthServiceProvider) {


    this.storage.get('user_id').then((val) => {
        if (val == null){
          this.navCtrl.setRoot(LoginPage);
        }else {
          this.user_id = val
        }
    });




  }

}
