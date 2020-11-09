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

  static cookieNames = {
    CURRENT_EXAM_SESSION: 'current_exam_session',
    CURRENT_EXAM_SESSION_DATA: 'current_exam_session_data',
  };

  static examSectionTypes = {
    READING: 'Reading',
    WRITING: 'Writing',
    MATH: 'Math',
    LISTENING: 'Listening',
    SPEAKING: 'Speaking',
  };

  static examQuestionTypes = {
    MULTIPLE_CHOICE_SINGLE_OBJECT: 1,
    VERIFIABLE_TEXT_SINGLE_LINE: 2,
    UNVERIFIABLE_TEXT_SINGLE_LINE: 3,
    AUDIO_RESPONSE: 4,
    MULTIPLE_CHOICE_MULTIPLE_SELECT: 5,
    VERIFIABLE_TEXT_MULTI_LINE: 6,
    UNVERIFIABLE_TEXT_MULTI_LINE: 7,
    DRAG_DROP: 8
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

    USER_HISTORY: 'user/history',

    EXAM_SEARCH: 'exam/search',
    EXAM_SESSION_INIT: 'examsession/init',
    EXAM_SESSION_RESUME: 'examsession/resume',
    EXAM_SESSION_END: 'examsession/end',
    EXAM_PURCHASE: 'exam/purchase',

    CONTACTUS: 'communication/contact',
  };
}
