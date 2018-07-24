import {EventEmitter, Injectable} from '@angular/core';

import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import {Manager} from "../../models/manager.model";

import { Storage } from '@ionic/storage';

/*
  Generated class for the ManagerServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ManagerServiceProvider {

  managers: Observable<any[]>;
  managersRef: AngularFireList<any>
  manager: Observable<any>
  managerRef: AngularFireObject<any>;



  constructor(public af: AngularFireDatabase, private storage: Storage) {
    this.managersRef = this.af.list('/managers');
    // this.admins = this.adminsRef.valueChanges();
    this.managers = this.managersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }


  loadLocalManager(key) {
    // this.adminsRef = this.af.list('/admins');
    // this.admins = this.adminsRef.valueChanges();
    this.managerRef = this.af.object('/managers/' + key);
    this.manager = this.managerRef.valueChanges()
    return this.manager;
  }



  getManager(){
    return this.storage.get('manager').then((val) => {
      console.log(val)
    });
  }

}
