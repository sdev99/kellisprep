import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {EnumService} from './enum.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {

  }

  queryString(obj): string {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
    return str.join('&');
  }

  examSearch(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${EnumService.apiEndPoints.EXAM_SEARCH}?${this.queryString(data)}`, {});
  }

  userHistory(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${EnumService.apiEndPoints.USER_HISTORY}`, data);
  }

  purchaseExam(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${EnumService.apiEndPoints.EXAM_PURCHASE}`, data);
  }

  initExamSession(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${EnumService.apiEndPoints.EXAM_SESSION_INIT}`, data);
  }

  resumeExamSession(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${EnumService.apiEndPoints.EXAM_SESSION_RESUME}`, data);
  }

  endExamSession(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${EnumService.apiEndPoints.EXAM_SESSION_END}`, data);
  }
}
