import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-select-exam-course',
  templateUrl: './select-exam-course.component.html',
  styleUrls: ['./select-exam-course.component.scss']
})
export class SelectExamCourseComponent implements OnInit {
  selectionType;

  courseIncludes = [
    {title: '2.5 hours on-demand video', icon: './assets/images/play.png'},
    {title: '1 downloadable resource', icon: './assets/images/cloud-download.png'},
    {title: 'Full lifetime access', icon: './assets/images/unlock-icon.png'},
    {title: 'Access on mobile and TV', icon: './assets/images/mobile-icon.png'},
    {title: 'Certificate of completion', icon: './assets/images/certificate.png'},
  ];

  examIncludes = [
    {title: '3 Sections', icon: './assets/images/play.png'},
    {title: '1 downloadable resource', icon: './assets/images/cloud-download.png'},
    {title: 'Full lifetime access', icon: './assets/images/unlock-icon.png'},
    {title: 'Access on mobile and TV', icon: './assets/images/mobile-icon.png'}
  ];


  list = [];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params && params.selectionType) {
        this.selectionType = params.selectionType;
      }
    });

  }

  ngOnInit(): void {
    if (this.selectionType === 'exam') {
      this.list = this.examIncludes;
    } else if (this.selectionType === 'course') {
      this.list = this.courseIncludes;
    }
  }

  openConfirmPay(): void {
    this.router.navigate(['confirm-pay']);
  }

  onLeavePage(): void {
    this.location.back();
  }

}
