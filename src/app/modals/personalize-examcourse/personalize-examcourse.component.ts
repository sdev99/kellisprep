import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {ShareddataService} from '../../services/shareddata.service';
import {EnumService} from '../../services/enum.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-personalize-examcourse',
  templateUrl: './personalize-examcourse.component.html',
  styleUrls: ['./personalize-examcourse.component.scss']
})
export class PersonalizeExamcourseComponent implements AfterViewInit, OnInit {

  title = '';
  tableColFirst;
  tableColSecond;
  tableColThird;

  examSearchTerm;
  examCategories = [{title: 'All', value: ''}];

  selectedCatagory: any = {};

  purchasedCourses = [
    {title: 'US history', category: 'Arts', price: '$99.99'},
    {title: 'natural science', category: 'Biology', price: '$90.00'},
    {title: 'Quantum Physics', category: 'Physics', price: '$60.09'},
    {title: 'Geometry', category: 'Math', price: '$90.00'},
    {title: 'genetics, marine biology', category: 'Biology', price: '$60.09'},
    {title: 'Quantum Physics', category: 'Physics', price: '$50.00'},
    {title: 'World history project origins', category: 'Arts', price: '$90.00'},
    {title: 'genetics, marine biology', category: 'Biology', price: '$60.09'},
  ];
  freeCourses = [
    {title: 'Statistics and probability', category: 'Arts'},
    {title: 'natural science', category: 'Biology'},
    {title: 'Quantum Physics', category: 'Physics'},
    {title: 'Geometry', category: 'Math'},
    {title: 'genetics, marine biology', category: 'Biology'},
    {title: 'Quantum Physics', category: 'Physics'},
    {title: 'Geometry', category: 'Math'},
    {title: 'genetics, marine biology', category: 'Biology'},
  ];


  list;

  loading = false;
  selectedExam;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private apiService: ApiService,
    private shareddataService: ShareddataService,
    private cookieService: CookieService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    if (this.data.type === 'exam') {
      if (this.data.planType === 'free') {
        this.title = 'Personalize Free Exams';
        this.tableColFirst = 'Exams';
        this.tableColSecond = 'Category';
      } else if (this.data.planType === 'purchased') {
        this.title = 'Personalize Purchased Exams';
        this.tableColFirst = 'Exams';
        this.tableColSecond = 'Category';
        this.tableColThird = 'Price';
      }
      this.list = this.shareddataService.allExamsList;
      this.getExams();
    } else if (this.data.type === 'course') {
      if (this.data.planType === 'free') {
        this.title = 'Personalize Free Courses';
        this.list = this.freeCourses;
        this.tableColFirst = 'Courses';
        this.tableColSecond = 'Category';
      } else if (this.data.planType === 'purchased') {
        this.title = 'Personalize Purchased Courses';
        this.list = this.purchasedCourses;
        this.tableColFirst = 'Courses';
        this.tableColSecond = 'Category';
        this.tableColThird = 'Price';
      }
    }

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const personalizeContent = document.getElementById('personalizeContent');
      if (!personalizeContent.style.minWidth) {
        personalizeContent.style.minWidth = personalizeContent.offsetWidth + 'px';
        personalizeContent.style.minHeight = personalizeContent.offsetHeight + 'px';
      }
    }, 500);
  }

  getExams(): void {
    this.loading = true;
    this.apiService.examSearch({}).subscribe((res) => {
      this.loading = false;
      const exams = res.exams;
      if (exams) {
        this.list = exams;
        this.shareddataService.allExamsList = exams;
        exams.map((item) => {
          const examType = item.examTypeText;
          let found = false;
          this.examCategories.map((cat) => {
            if (cat.title === examType) {
              found = true;
              return;
            }
          });
          if (!found) {
            this.examCategories.push({
              title: item.examTypeText,
              value: item.examTypeText,
            });
          }
        });
      }
    }, (error) => {
      this.loading = false;
    });
  }

  btnAction(res): void {
    const dialog = this.dialog.getDialogById('personalizedExamCourseDialog');
    dialog.close(res);

    setTimeout(() => {
      if (this.data.type === 'exam') {
        this.cookieService.set(EnumService.cookieNames.SELECTED_EXAM_DETAILS, JSON.stringify(this.selectedExam));
        this.router.navigate(['select-exam-course'], {
          queryParams: {
            selectionType: 'exam',
          }
        });
      }
    }, 400);
  }

  onCategorySelect(item): void {
    this.selectedCatagory = item;
  }

  selectedItemCount(): number {
    // let count = 0;
    // this.list.map((item) => {
    //   if (item.selected) {
    //     count++;
    //   }
    // });
    // return count;
    if (this.selectedExam) {
      return 1;
    }
    return 0;
  }
}
