import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {EnumService} from '../../services/enum.service';
import {ApiService} from '../../services/api.service';
import {AccountService} from '../../services/account.service';
import {AlertService} from '../../services/alert.service';
import {ShareddataService} from '../../services/shareddata.service';
import {TestDirectionComponent} from '../test-direction/test-direction.component';
import {ConfirmModalComponent} from '../../modals/confirm-modal/confirm-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-practice-tests',
  templateUrl: './practice-tests.component.html',
  styleUrls: ['./practice-tests.component.scss']
})
export class PracticeTestsComponent implements OnInit {


  practiceList;
  itemDetail;
  pathsTree = [];

  examResumeSessionData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private apiService: ApiService,
    private alertService: AlertService,
    private accountService: AccountService,
    public dialog: MatDialog,
    private shareddataService: ShareddataService,
  ) {

    const item = localStorage.getItem(EnumService.localStorageKeys.CURRENT_EXAM_SESSION);
    if (item) {
      this.itemDetail = JSON.parse(item);
      this.pathsTree = [this.itemDetail.type, this.itemDetail.name];
      if (this.itemDetail.type === 'SAT') {
        this.practiceList = shareddataService.satSections;
      }
      if (this.itemDetail.type === 'TOEFL') {
        this.practiceList = shareddataService.toeflSections;
      }
    }

    this.route.params.subscribe((params) => {
      const id = params.id;
    });
  }


  ngOnInit(): void {
    this.resumeExam();
  }

  resumeExam = () => {
    this.shareddataService.startLoading();
    this.apiService.resumeExamSession({
      userId: this.accountService.userValue.id,
      examId: this.itemDetail.id
    }).subscribe((data) => {
      this.shareddataService.stopLoading();
      if (data.isSuccess) {
        this.examResumeSessionData = data;
        localStorage.setItem(EnumService.localStorageKeys.CURRENT_EXAM_SESSION_DATA, JSON.stringify(data));
        // {"examSectionId":17,"sessionId":"b34ab0e5-ec3e-4c13-9ae5-556a9f07439c","examTypeId":1,"examTypeText":"SAT","title":"SAT-EXAM-01","description":"<p>SAT-EXAM-01</p>","duration":null,"sectionData":{"id":1,"name":"Reading","guideline":null,"sets":[{"id":2,"orderNo":1,"passage":" ","videoUri":null,"videoRepeatable":false,"questions":[{"id":1,"typeId":1,"text":"<p>q1x</p>","imageUri":"/medialibrary/image/worldmap.jpg","orderNo":0,"weight":1.00,"choices":[{"id":1,"text":"c1x","imageUri":null},{"id":2,"text":"c2x","imageUri":null},{"id":3,"text":"c3x","imageUri":null},{"id":4,"text":"c4x","imageUri":null}],"groups":[],"items":[]},{"id":10,"typeId":1,"text":" ","imageUri":null,"orderNo":1,"weight":1.00,"choices":[],"groups":[],"items":[]},{"id":12,"typeId":1,"text":" ","imageUri":null,"orderNo":2,"weight":1.00,"choices":[],"groups":[],"items":[]},{"id":17,"typeId":1,"text":"<p>aaaa</p>","imageUri":null,"orderNo":3,"weight":1.00,"choices":[{"id":20,"text":"cc1","imageUri":null},{"id":21,"text":"cc2","imageUri":null},{"id":22,"text":"cc3","imageUri":null},{"id":23,"text":"cc4","imageUri":null}],"groups":[],"items":[]},{"id":18,"typeId":1,"text":" ","imageUri":null,"orderNo":4,"weight":1.00,"choices":[],"groups":[],"items":[]},{"id":19,"typeId":1,"text":" ","imageUri":null,"orderNo":5,"weight":1.00,"choices":[],"groups":[],"items":[]},{"id":22,"typeId":1,"text":"<p>bbbb</p>","imageUri":null,"orderNo":6,"weight":1.00,"choices":[{"id":24,"text":"bc1","imageUri":null},{"id":25,"text":"bc2","imageUri":null},{"id":26,"text":"bc3","imageUri":null}],"groups":[],"items":[]},{"id":23,"typeId":1,"text":" ","imageUri":null,"orderNo":7,"weight":1.00,"choices":[],"groups":[],"items":[]}]}]},"isSuccess":true,"exception":null,"messages":["OK"]}
      } else {
        this.alertService.error(data.message.join('\n'));
      }
    }, (error) => {
      this.shareddataService.stopLoading();
    });
  };

  onTopicItem(item): void {

  }


  startPractice(item): void {
    let isSectionHaveQuestions = false;
    const examType = this.itemDetail.type;
    const examId = this.itemDetail.id;
    const sectionType = item.type;

    if (this.examResumeSessionData && this.examResumeSessionData.sectionData && this.examResumeSessionData.sectionData.sets && this.examResumeSessionData.sectionData.sets.length > 0) {
      this.examResumeSessionData.sectionData.sets.map((set) => {
        if (set.questions && set.questions.length > 0) {
          isSectionHaveQuestions = true;
          return;
        }
      });
    }

    if (isSectionHaveQuestions) {
      const testDirectionRouteConfig = examType + '/:id/:section/direction';
      const testDirectionRoute = examType + '/' + examId + '/' + sectionType + '/direction';
      this.shareddataService.addDynamicRoute(testDirectionRouteConfig, TestDirectionComponent, true);

      this.router.navigate([testDirectionRoute]);
    } else {
      this.openEmptySectionDialog(sectionType);
    }
  }

  openEmptySectionDialog(sectionType): void {

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      id: 'alertDialog',
      disableClose: true,
      role: 'dialog',
      data: {
        title: sectionType + ' Section !',
        message: 'This exam section is currently empty.',
        leftBtnTitle: 'Dismiss',
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
