import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ReportServiceProvider} from "../../providers/report-service/report-service";
import { Storage } from '@ionic/storage';

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
  farm: any

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public reportService: ReportServiceProvider,
              public storage: Storage) {


    storage.get('farm').then((val) => {
      this.farm = JSON.parse(val)
      this.reportService.getReports(this.farm.key).subscribe(
        reports => {
          console.log(reports);
          this.reports = reports;
          this.loader = false;
        });
    })


  }


}
