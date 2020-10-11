import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  static userRoles = {
    SuperAdmin: 1,
    Admin: 2,
    Teacher: 3,
    Student: 4,
  };

  static localStorageKeys = {
    AUTH_TOKEN: 'auth_token',
    USER_DATA: 'user_data',
  };

  static apiEndPoints = {
    LOGIN: 'auth/login',
    REGISTER: 'user/register',
    FORGOTPWD: 'user/forgotpassword',
    RESETPASSWORD: 'user/resetpassword',
    UPDATEPASSWORD: 'user/updatepassword',
    UPDATEUSER: 'user/updateuser',
    UPDATESETTINGS: 'user/updatesettings',
    GETSETTINGS: 'user/getsettings',

    CONTACTUS: 'communication/contact',
  };
}
