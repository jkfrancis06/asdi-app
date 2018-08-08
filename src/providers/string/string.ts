import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the StringProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StringProvider {


  public ERROR_MESSAGE_TITLE = "Invalid input";
  public ERROR_MESSAGE = "Fields must not be empty";
  public ERROR_LOGIN_MESSAGE = "Username or password incorrect";
  public ERROR_LOGIN_MESSAGE_TITLE = "Error";
  public SUCCESS_LOGIN_MESSAGE = "You are authenticated successfully";
  public SUCCESS_DOWNLOAD_MESSAGE = "Download success";
  public ERROR_DOWNLOAD_MESSAGE = "Download error";

}
