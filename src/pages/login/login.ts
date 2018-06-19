import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';

// service
import {LoginProvider} from '../../providers/login/login';

//Pages

import {HomePage} from '../home/home';
import {StringProvider} from "../../providers/string/string";

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

  loading : any;




  constructor(private alertCtrl: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              private loginProvider: LoginProvider,
              public loadingCtrl: LoadingController,
              public stingProvider: StringProvider) {
  }


  formErrorAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();
  }


  checkForm() {


    this.presentLoadingDefault();

    if (this.loginData.username === '' || this.loginData.password === ''){
      this.loading.dismiss()
      this.formErrorAlert(this.stingProvider.ERROR_MESSAGE_TITLE,this.stingProvider.ERROR_MESSAGE);
    }else {
      this.loginProvider.loadLoginData(this.loginData.username).subscribe(
        manager => {
          this.manager = manager;
          if (this.manager.length <= 0){
            this.loading.dismiss()
            this.formErrorAlert(this.stingProvider.ERROR_LOGIN_MESSAGE_TITLE,this.stingProvider.ERROR_LOGIN_MESSAGE);
          }else {
            if (this.manager[0].password === this.loginData.password){
              this.loading.dismiss()
              this.navCtrl.setRoot(HomePage);
            }else {
              this.loading.dismiss()
              this.formErrorAlert(this.stingProvider.ERROR_LOGIN_MESSAGE_TITLE,this.stingProvider.ERROR_LOGIN_MESSAGE);

            }
          }
        }
      )
    }

  }

}
