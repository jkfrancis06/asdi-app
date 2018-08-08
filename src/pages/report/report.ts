import { Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ReportServiceProvider} from "../../providers/report-service/report-service";
import { Storage } from '@ionic/storage';
import {ReportDetailsPage} from "../report-details/report-details";

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {


  manager: any;
  reports = [];
  farm: any;
  loading : any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public reportService: ReportServiceProvider,
              public storage: Storage,
              public loadingCtrl: LoadingController) {

    this.presentLoadingDefault();
    storage.get('farm').then((val) => {
      this.farm = JSON.parse(val)
      this.reportService.getReports(this.farm.key).subscribe(
        reports => {
          console.log(reports);
          let temp = reports
          this.reports = [];
          for( let i = 0; i< temp.length; i++){
            // temp[i].date = new Date(reports[i].createdAt).toDateString();
            let d = new Date()
            if (d.toDateString() === new Date(reports[i].createdAt).toDateString()){
              temp[i].createdAt = "Today  "+ new Date(reports[i].createdAt).toLocaleTimeString();
            }else {
              temp[i].createdAt = new Date(reports[i].createdAt).toDateString() +"  "+ new Date(reports[i].createdAt).toLocaleTimeString();
            }
            for (let j = 0; j< temp[i].files.length; j++){
              let extension = temp[i].files[j].name.split('.').pop();
              let ValidImageTypes = ["gif", "jpeg", "png", "jpg"];
              if (ValidImageTypes.indexOf(extension) > -1){
                temp[i].files[j].extension = "image";
              }else {
                temp[i].files[j].extension = "other";
              }
            }
            this.reports.unshift(temp[i])
          }
          console.log(temp)
          this.loading.dismiss();
        });
    })


  }




  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();
  }


  showDetails(i) {
    let selected_report = this.reports[i];
    this.navCtrl.push(ReportDetailsPage,{
      report: JSON.stringify(selected_report)
    })
  }
}
