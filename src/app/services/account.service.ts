import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../_models';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {EnumService} from './enum.service';
import {environment} from '../../environments/environment';

declare global {
  interface Array<T> {
    clone(): Array<T>;
  }
}

Array.prototype.clone = function() {
  return JSON.parse(JSON.stringify(this));
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(EnumService.localStorageKeys.USER_DATA)));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(eMail = '', password = '', googleId = '', facebookId = '') {
    return this.http.post(`${environment.apiUrl}/${EnumService.apiEndPoints.LOGIN}`, {
      googleId,
      facebookId,
      eMail,
      password
    }).pipe(map((data: any) => {
      if (data.isSuccess) {
        const userInfo = data.userInfo;
        const token = data.token;
        const user = {
          ...userInfo,
          token: token.token,
          expiresIn: token.expiresIn,
        };
        localStorage.setItem(EnumService.localStorageKeys.USER_DATA, JSON.stringify(user));
        this.userSubject.next(user);
        return {
          user,
          isSuccess: true
        };
      }

      let error = 'Cannot login';
      if (data.messages) {
        error = data.messages.join(' ');
      }
      return {
        message: error,
        isSuccess: false
      };
    }));
  }

  googleLogin(googleId = '') {
    return this.login('', '', googleId);
  }

  facebookLogin(facebookId = '') {
    return this.login('', '', '', facebookId);
  }

  resgiter(data) {
    return this.http.post(`${environment.apiUrl}/${EnumService.apiEndPoints.REGISTER}`, data);
  }

  forgotpassword(languageId, email) {
    return this.http.post(`${environment.apiUrl}/${EnumService.apiEndPoints.FORGOTPWD}`, {languageId, email});
  }

  contactusSubmit(data) {
    return this.http.post(`${environment.apiUrl}/${EnumService.apiEndPoints.CONTACTUS}`, data);
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem(EnumService.localStorageKeys.USER_DATA);
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

}
