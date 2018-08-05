import { Injectable } from '@angular/core';


import {Report} from "../../models/report.model";

import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ReportServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReportServiceProvider {



  reports: Observable<any[]>;
  reportsRef: AngularFireList<any>
  report: Observable<any>
  reportRef: AngularFireObject<any>;

  constructor(public af: AngularFireDatabase) {
    this.reportsRef = this.af.list('/reports');
    // this.admins = this.adminsRef.valueChanges();
    this.reports = this.reportsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getReports(farm) {
    this.reportsRef =  this.af.list('/reports', ref => ref.orderByChild('farm').equalTo(farm));
    this.reports = this.reportsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    return this.reports;
  }

  addReport(report: Report) {
    this.reportsRef.push(report);
  }


}
