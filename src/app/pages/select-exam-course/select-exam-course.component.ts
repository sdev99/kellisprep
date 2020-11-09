import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ApiService} from '../../services/api.service';
import {AccountService} from '../../services/account.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-select-exam-course',
  templateUrl: './select-exam-course.component.html',
  styleUrls: ['./select-exam-course.component.scss']
})
export class SelectExamCourseComponent implements OnInit {
  selectionType;
  loading = false;

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
  examDetail;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private apiService: ApiService,
    private accountService: AccountService,
    private router: Router,
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params && params.selectionType) {
        this.selectionType = params.selectionType;
      }
      if (params && params.examDetail) {
        this.examDetail = JSON.parse(params.examDetail);
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
    const allowPurchase = false; // for test; remove this key after payment method integration, buy now all exam as free

    if (allowPurchase && this.examDetail && this.examDetail.price) {
      this.router.navigate(['confirm-pay'], {
        queryParams: {
          selectionType: this.selectionType,
          examDetail: JSON.stringify(this.examDetail)
        }
      });
    } else {
      this.alertService.clear();
      this.loading = true;
      this.apiService.purchaseExam({
        userId: this.accountService.userValue.id,
        examId: this.examDetail.examId
      }).subscribe((res) => {
        this.loading = false;
        if (res.isSuccess) {
          this.router.navigate(['dashboard']);
        } else {
          this.alertService.error(res.messages.join('\n'));
        }
      }, (error) => {
        this.loading = false;
      });
    }
  }

  onLeavePage(): void {
    this.location.back();
  }

}
