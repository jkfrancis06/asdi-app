import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';


import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import {StringProvider} from "../../providers/string/string";
/**
 * Generated class for the ReportDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-details',
  templateUrl: 'report-details.html',
})
export class ReportDetailsPage {

  report: any

  fileTransfer: FileTransferObject = this.transfer.create();


  constructor(public navCtrl: NavController,
              private toastCtrl: ToastController,
              public navParams: NavParams,
              private transfer: FileTransfer,
              private file: File,
              private stringProvider: StringProvider) {

    this.report =JSON.parse(this.navParams.get('report'));
    console.log(this.report)

  }


  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


  downloadFile(i) {
    let chosen_file = this.report.files[i];
    console.log(chosen_file)
    const url = chosen_file.url;
    this.fileTransfer.download(url, this.file.dataDirectory + chosen_file.name).then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.presentToast(this.stringProvider.SUCCESS_DOWNLOAD_MESSAGE)
    }, (error) => {
      this.presentToast(this.stringProvider.ERROR_DOWNLOAD_MESSAGE)

    });
  }
}
