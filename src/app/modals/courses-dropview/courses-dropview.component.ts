import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-courses-dropview',
  templateUrl: './courses-dropview.component.html'
})
export class CoursesDropviewComponent implements OnInit {
  coursePlans = ['Free Courses', 'Paid Courses'];

  courseTypes = [
    {
      type: 'Arts and Humanities',
      list: [
        {title: 'Couse name 1'},
        {title: 'Couse name 2'},
        {title: 'Couse name 3'},
        {title: 'Couse name 4'},
        {title: 'Couse name 5'},
        {title: 'Couse name 6'},
        {title: 'Couse name 7'},
        {title: 'Couse name 8'},
        {title: 'Couse name 9'},
        {title: 'Couse name 10'},
      ]
    },
    {
      type: 'SAT',
      list: [
        {title: 'Couse name 1'},
        {title: 'Couse name 2'},
        {title: 'Couse name 3'},
        {title: 'Couse name 4'},
        {title: 'Couse name 5'},
        {title: 'Couse name 6'},
        {title: 'Couse name 7'},
        {title: 'Couse name 8'},
        {title: 'Couse name 9'},
        {title: 'Couse name 10'},
      ]
    },
    {
      type: 'Tofefl',
      list: [
        {title: 'Couse name 1'},
        {title: 'Couse name 2'},
        {title: 'Couse name 3'},
        {title: 'Couse name 4'},
        {title: 'Couse name 5'},
        {title: 'Couse name 6'},
        {title: 'Couse name 7'},
        {title: 'Couse name 8'},
        {title: 'Couse name 9'},
        {title: 'Couse name 10'},
      ]
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
