import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, LoadingController, App} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';


// service
import {LoginProvider} from '../../providers/login/login';

//Pages

import {HomePage} from '../home/home';
import {StringProvider} from "../../providers/string/string";
import {ManagerServiceProvider} from "../../providers/manager-service/manager-service";
import {TabsPage} from "../tabs/tabs";

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


  tabBarElement: any;


  constructor(private alertCtrl: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              private loginProvider: LoginProvider,
              private managerProvider: ManagerServiceProvider,
              public loadingCtrl: LoadingController,
              public stingProvider: StringProvider,
              private storage: Storage,
              private toastCtrl: ToastController,
              private appCtrl: App) {


    let elements = document.querySelectorAll(".tabbar");

    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });

    }




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


  presentToast() {
    let toast = this.toastCtrl.create({
      message: this.stingProvider.SUCCESS_LOGIN_MESSAGE,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  checkForm() {


    console.log(this.loginData)

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
              this.presentToast();
              this.storage.set('user_id', this.manager[0].key);
              this.managerProvider.loadLocalManager(this.manager[0].key).subscribe(
                manager => {
                  this.storage.set('manager', JSON.stringify(manager));
                  console.log(manager)
                }
              )
              console.log(this.manager[0].key)
              let elements = document.querySelectorAll(".tabbar");

              if (elements != null) {
                Object.keys(elements).map((key) => {
                  elements[key].style.display = 'block';
                });

              }
              this.appCtrl.getRootNav().setRoot(HomePage);

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
