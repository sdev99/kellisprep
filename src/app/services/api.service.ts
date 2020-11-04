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
    const url = 'http://52.179.100.163/api';
    return this.http.post(`${url}/${EnumService.apiEndPoints.EXAM_SEARCH}?${this.queryString(data)}`, {}, {
      headers: {
        'Content-Type': 'applciation/json'
      },
    });
  }
}
