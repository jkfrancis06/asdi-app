import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';


import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import {StringProvider} from "../../providers/string/string";

import { Diagnostic } from '@ionic-native/diagnostic';

import { ImageViewerController } from 'ionic-img-viewer';
import { ActionSheetController } from 'ionic-angular';




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

  _imageViewerCtrl: ImageViewerController;


  constructor(public navCtrl: NavController,
              private toastCtrl: ToastController,
              public navParams: NavParams,
              private transfer: FileTransfer,
              private file: File,
              private stringProvider: StringProvider,
              private diagnostic: Diagnostic,
              imageViewerCtrl: ImageViewerController,
              public actionSheetCtrl: ActionSheetController) {

    this._imageViewerCtrl = imageViewerCtrl;

    this.report =JSON.parse(this.navParams.get('report'));
    console.log(this.report)


  }


  formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getMilliseconds();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + '' + minutes + ' ';
    return date.getMonth()+1 + "" + date.getDate() + "" + date.getFullYear() + "" + strTime +""+ seconds;
  }

  presentImage(image) {
    const imageViewer = this._imageViewerCtrl.create(image);
    imageViewer.present();

    imageViewer.onDidDismiss(() => console.log('Viewer dismissed'));
  }


  presentSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


  presentActionSheet(image,i) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Choose an action',
      buttons: [
        {
          text: 'View',
          icon: 'eye',
          cssClass: 'view-action',
          handler: () => {
            this.presentImage(image)
          }
        },{
          text: 'Download file',
          icon: 'cloud-download',
          handler: () => {
            this.downloadFile(i).then(response => {
              actionSheet.dismiss()
            })
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
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


  downloadFile(i): Promise<any> {

    return new Promise(resolve => {

      let chosen_file = this.report.files[i];
      console.log(chosen_file)
      const url = chosen_file.url;
      let d = new Date();
      let e = this.formatDate(d);
      this.fileTransfer.download(url, this.file.externalRootDirectory + '/Asdi farm/'+ 'asdi_'+e+'.jpg').then((entry) => {
        console.log('download complete: ' + entry.toURL());
        this.presentToast(this.stringProvider.SUCCESS_DOWNLOAD_MESSAGE)
      }, (error) => {
        this.diagnostic.requestExternalStorageAuthorization().then(()=>{
          this.downloadFile(i)
        }).catch(error=>{
          this.presentToast(this.stringProvider.ERROR_DOWNLOAD_MESSAGE)
        });

      });

    })
  }

}
