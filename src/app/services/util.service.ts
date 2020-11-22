import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  static prependZero(value): string {
    if (value < 10) {
      return 0 + '' + value;
    }
    return value;
  }

  static secondsToMinuteSecond(time): string {
    if (time) {
      return UtilService.prependZero(Math.floor(time / 60)) + ':' + UtilService.prependZero(Math.floor(time % 60));
    }
    return '00:00';
  }

  constructor() {
  }


}
