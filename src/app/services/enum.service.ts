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

    CATEGORY_SEARCH: 'category/search',

    EXAM_HISTORY: 'user/history',
    EXAM_SEARCH: 'exam/search',
    EXAM_PURCHASE: 'exam/purchase',
    EXAM_SESSION_INIT: 'examsession/init',
    EXAM_SESSION_RESUME: 'examsession/resume',
    EXAM_SESSION_END: 'examsession/end',

    CONTACTUS: 'communication/contact',
  };
}
