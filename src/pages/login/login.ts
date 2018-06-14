import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

// service

import {LoginProvider} from '../../providers/login/login';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage{

  loginData = {
    username: '',
    password: ''
  };

  manager : any;



  ERROR_MESSAGE_TITLE = "Invalid input";
  ERROR_MESSAGE = "Fields must not be empty";


  constructor(private alertCtrl: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              private loginProvider: LoginProvider) {
  }


  formErrorAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }


  checkForm() {

    if (this.loginData.username === '' || this.loginData.password === ''){
      this.formErrorAlert(this.ERROR_MESSAGE_TITLE,this.ERROR_MESSAGE);
    }else {

      this.loginProvider.loadLoginData(this.loginData.username).subscribe(
        admin => {
          this.admins = admin;
          this.show = true;
        });
    }

  }

}
