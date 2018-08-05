import { Injectable } from '@angular/core';

import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import {Manager} from "../../models/manager.model";

@Injectable()
export class FarmServiceProvider {



  farms: Observable<any[]>;
  farmsRef: AngularFireList<any>
  farm: Observable<any>
  farmRef: AngularFireObject<any>;

  constructor(public af: AngularFireDatabase) {
    this.farmsRef = this.af.list('/farms');
    // this.admins = this.adminsRef.valueChanges();
    this.farms = this.farmsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getFarms() {
    return this.farms;
  }


}
