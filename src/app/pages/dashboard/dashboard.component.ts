import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  menuItems = [
    {
      title: 'My Courses',
      list: [
        {title: 'Purchased Courses'},
        {title: 'Free Courses'},
      ]
    },
    {
      title: 'My Exams',
      list: [
        {title: 'Purchased Exams'},
        {title: 'Free Exams'},
      ]
    },
    {
      title: 'My Account',
      list: [
        {title: 'Exam History'},
      ]
    }
  ];


  constructor() {
  }

  ngOnInit(): void {
  }

}
