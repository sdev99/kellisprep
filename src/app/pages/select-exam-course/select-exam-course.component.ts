import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ApiService} from '../../services/api.service';
import {AccountService} from '../../services/account.service';
import {AlertService} from '../../services/alert.service';
import {CookieService} from 'ngx-cookie-service';
import {EnumService} from '../../services/enum.service';
import {ShareddataService} from '../../services/shareddata.service';

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

    examIncludes = [];


    list = [];
    examDetail;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private apiService: ApiService,
        private accountService: AccountService,
        private cookieService: CookieService,
        private router: Router,
        private shareddataService: ShareddataService,
    ) {
        this.route.queryParams.subscribe((params) => {
            if (params && params.selectionType) {
                this.selectionType = params.selectionType;
            }
        });

        const examDetail = cookieService.get(EnumService.cookieNames.SELECTED_EXAM_DETAILS);
        if (examDetail) {
            this.examDetail = JSON.parse(examDetail);
            this.examIncludes.push({
                title: this.examDetail.numberOfSections + ' Sections',
                icon: './assets/images/play.png'
            });
            this.examIncludes.push({title: 'Full lifetime access', icon: './assets/images/unlock-icon.png'});
            this.examIncludes.push({title: 'Access on Mobile', icon: './assets/images/mobile-icon.png'});
        }

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
            this.shareddataService.startLoading();
            this.apiService.purchaseExam({
                userId: this.accountService.userValue.id,
                examId: this.examDetail.examId
            }).subscribe((res) => {
                this.shareddataService.stopLoading();
                if (res.isSuccess) {
                    this.router.navigate(['dashboard']);
                } else {
                    this.alertService.error(res.messages.join('\n'));
                }
            }, (error) => {
                this.shareddataService.stopLoading();
            });
        }
    }

    onLeavePage(): void {
        this.location.back();
    }

}
