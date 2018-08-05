import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(private storage: Storage) {

  }

  isAuthenticated(){
    this.storage.get('user_id').then((val) => {
      return val
    });
  }


}
