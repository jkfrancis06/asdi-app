import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginProvider {


  managers: Observable<any[]>;
  managersRef: AngularFireList<any>;
  manager: Observable<any>
  managerRef: AngularFireObject<any>;


  constructor(public af: AngularFireDatabase) {
    this.managersRef = this.af.list('/managers');
    // this.admins = this.adminsRef.valueChanges();
    this.managers = this.managersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }


  getManagers() {
    return this.managers;
  }

  loadLoginData(username) {
    this.managersRef =  this.af.list('/managers', ref => ref.orderByChild('username').equalTo(username));
    this.manager = this.managersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    return this.manager;
  }


}
