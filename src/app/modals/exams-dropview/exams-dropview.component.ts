import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {ShareddataService} from '../../services/shareddata.service';
import {CookieService} from 'ngx-cookie-service';
import {EnumService} from '../../services/enum.service';
import {ObservablesService} from '../../services/observables.service';

@Component({
  selector: 'app-exams-dropview',
  templateUrl: './exams-dropview.component.html',
  styleUrls: ['./exams-dropview.component.scss']
})
export class ExamsDropviewComponent implements OnInit {
  @Output() dismiss = new EventEmitter<void>();
  loading = false;

  examPlans = [
    {title: 'Free Exams', exams: []},
    {title: 'Paid Exams', exams: []}
  ];


  constructor(
    private router: Router,
    private cookieService: CookieService,
    private apiService: ApiService,
    private shareddataService: ShareddataService,
    private observablesService: ObservablesService,
  ) {
  }

  ngOnInit(): void {
    this.setupExams();
  }

  setupExams = () => {
    const examsList = localStorage.getItem(EnumService.localStorageKeys.ALL_EXAMS);
    if (examsList) {
      const exams = JSON.parse(examsList);

      const freeExams = [];
      const paidExams = [];

      const freeExamsCategories = {};
      const paidExamsCategories = {};

      exams.map((item) => {
        const examType = item.examTypeText;
        if (item.price) {
          if (!paidExamsCategories[examType]) {
            paidExamsCategories[examType] = [];
          }
          paidExamsCategories[examType].push(item);
        } else {
          if (!freeExamsCategories[examType]) {
            freeExamsCategories[examType] = [];
          }
          freeExamsCategories[examType].push(item);
        }
      });

      Object.keys(freeExamsCategories).map((type) => {
        freeExams.push({
          type: type + ' Exams',
          list: freeExamsCategories[type]
        });
      });

      Object.keys(paidExamsCategories).map((type) => {
        paidExams.push({
          type: type + ' Exams',
          list: paidExamsCategories[type]
        });
      });


      this.examPlans[0].exams = freeExams;
      this.examPlans[1].exams = paidExams;
      this.shareddataService.freeExams = freeExams;
      this.shareddataService.paidExams = paidExams;
    } else {
      this.getExams();
    }
  };

  getExams(): void {
    this.loading = true;
    this.apiService.examSearch({}).subscribe((res) => {
      this.loading = false;
      const exams = res.exams;
      if (exams) {
        localStorage.setItem(EnumService.localStorageKeys.ALL_EXAMS, JSON.stringify(exams));
        this.setupExams();
      }
    }, (error) => {
      this.loading = false;
    });
  }

  onExamSelect(exam): void {
    this.dismiss.emit();
    this.observablesService.publishSomeData(EnumService.observalbles.DROP_DOWN_ITEM_SELECT, exam);
    localStorage.setItem(EnumService.localStorageKeys.SELECTED_EXAM_DETAILS, JSON.stringify(exam));
    this.router.navigate(['select-exam-course'], {
      queryParams: {
        selectionType: 'exam'
      }
    });
  }
}
