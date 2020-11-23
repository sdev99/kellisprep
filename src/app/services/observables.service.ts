import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservablesService {

  private mySubjects = {};

  private intialiseFirstTime(key): any {
    if (!this.mySubjects[key]) {
      this.mySubjects[key] = new Subject<any>();
    }
    return this.mySubjects[key];
  }

  publishSomeData(key, data = {}): void {
    this.intialiseFirstTime(key).next(data);
  }

  getObservable(key): Subject<any> {
    return this.intialiseFirstTime(key);
  }
}

