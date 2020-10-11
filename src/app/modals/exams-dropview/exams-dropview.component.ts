import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-exams-dropview',
  templateUrl: './exams-dropview.component.html'
})
export class ExamsDropviewComponent implements OnInit {
  examPlans = ['Free Exams', 'Paid Exams'];
  examTypes = [
    {
      type: 'SAT Exams',
      list: [
        {title: 'Exam name 1'},
        {title: 'Exam name 2'},
        {title: 'Exam name 3'},
        {title: 'Exam name 4'},
        {title: 'Exam name 5'},
        {title: 'Exam name 6'},
        {title: 'Exam name 7'},
        {title: 'Exam name 8'},
        {title: 'Exam name 9'},
        {title: 'Exam name 10'},
      ]
    },
    {
      type: 'TOEFL Exams',
      list: [
        {title: 'Exam name 1'},
        {title: 'Exam name 2'},
        {title: 'Exam name 3'},
        {title: 'Exam name 4'},
        {title: 'Exam name 5'},
        {title: 'Exam name 6'},
        {title: 'Exam name 7'},
        {title: 'Exam name 8'},
        {title: 'Exam name 9'},
        {title: 'Exam name 10'},
      ]
    },
    {
      type: 'TOEIC Exams',
      list: [
        {title: 'Exam name 1'},
        {title: 'Exam name 2'},
        {title: 'Exam name 3'},
        {title: 'Exam name 4'},
        {title: 'Exam name 5'},
        {title: 'Exam name 6'},
        {title: 'Exam name 7'},
        {title: 'Exam name 8'},
        {title: 'Exam name 9'},
        {title: 'Exam name 10'},
      ]
    }
  ];


  constructor() {
  }

  ngOnInit(): void {
  }

}
