import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareddataService {

  allExamsList;
  freeExams;
  paidExams;

  constructor() {
  }
}
