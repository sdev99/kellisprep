import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

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
  examCategories = [
    {title: 'All', value: ''},
    {title: 'Arts', value: 'Arts'},
    {title: 'Biology', value: 'Biology'},
    {title: 'Physics', value: 'Physics'},
    {title: 'Math', value: 'Math'},
  ];

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
  purchasedExams = [
    {title: 'SAT', category: 'Arts', price: '$99.99'},
    {title: 'TOEFL', category: 'Biology', price: '$90.00'},
    {title: 'TOEIC', category: 'Physics', price: '$60.09'},
    {title: 'PPSC', category: 'Math', price: '$90.00'},
    {title: 'NTS', category: 'Biology', price: '$60.09'},
    {title: 'FPSC', category: 'Physics', price: '$50.00'},
    {title: 'NAT', category: 'Arts', price: '$90.00'},
    {title: 'PAT', category: 'Biology', price: '$60.09'},
  ];
  freeExams = [
    {title: 'SAT', category: 'Arts'},
    {title: 'TOEFL', category: 'Biology'},
    {title: 'TOEIC', category: 'Physics'},
    {title: 'PPSC', category: 'Math'},
    {title: 'NTS', category: 'Biology'},
    {title: 'FPSC', category: 'Physics'},
    {title: 'NAT', category: 'Arts'},
    {title: 'PAT', category: 'Biology'},
  ];

  list = [];

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    if (this.data.type === 'exam') {
      if (this.data.planType === 'free') {
        this.title = 'Personalize Free Exams';
        this.list = this.freeExams;
        this.tableColFirst = 'Exams';
        this.tableColSecond = 'Category';
      } else if (this.data.planType === 'purchased') {
        this.title = 'Personalize Purchased Exams';
        this.list = this.purchasedExams;
        this.tableColFirst = 'Exams';
        this.tableColSecond = 'Category';
        this.tableColThird = 'Price';
      }
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

  btnAction(res): void {
    const dialog = this.dialog.getDialogById('personalizedExamCourseDialog');
    dialog.close(res);
  }

  onCategorySelect(item): void {
    this.selectedCatagory = item;
  }

  selectedItemCount(): number {
    let count = 0;
    this.list.map((item) => {
      if (item.selected) {
        count++;
      }
    });
    return count;
  }
}
