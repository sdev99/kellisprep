import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ForgotpasswordComponent} from '../../modals/forgotpassword/forgotpassword.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmModalComponent} from '../../modals/confirm-modal/confirm-modal.component';
import {EnumService} from '../../services/enum.service';
import {CookieService} from 'ngx-cookie-service';
import {AccountService} from '../../services/account.service';
import {ApiService} from '../../services/api.service';
import {AlertService} from '../../services/alert.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TestDirectionComponent} from '../test-direction/test-direction.component';
import {ShareddataService} from '../../services/shareddata.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-writing-section',
  templateUrl: './writing-section.component.html',
  styleUrls: ['./writing-section.component.scss']
})
export class WritingSectionComponent implements OnInit {
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  environment = environment;

  EnumService = EnumService;

  currentIndex = 0;

  maxMessageLength = 250;
  submitted = false;
  isVideoPlaying = false;

  itemDetail;
  examSessionData;
  examSectionSets;
  pathsTree = [];

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public shareddataService: ShareddataService,
  ) {

    const item = localStorage.getItem(EnumService.localStorageKeys.CURRENT_EXAM_SESSION);
    const examData = localStorage.getItem(EnumService.localStorageKeys.CURRENT_EXAM_SESSION_DATA);

    if (item) {
      this.itemDetail = JSON.parse(item);
      this.pathsTree = [this.itemDetail.type, this.itemDetail.name, EnumService.examSectionTypes.WRITING + ' Section'];
    }

    if (examData) {
      // {"examSectionId":17,"sessionId":"b34ab0e5-ec3e-4c13-9ae5-556a9f07439c","examTypeId":1,"examTypeText":"SAT","title":"SAT-EXAM-01","description":"<p>SAT-EXAM-01</p>","duration":null,"sectionData":{"id":1,"name":"Reading","guideline":null,"sets":[{"id":2,"orderNo":1,"passage":" ","videoUri":null,"videoRepeatable":false,"questions":[{"id":1,"typeId":1,"text":"<p>q1x</p>","imageUri":"/medialibrary/image/worldmap.jpg","orderNo":0,"weight":1.00,"choices":[{"id":1,"text":"c1x","imageUri":null},{"id":2,"text":"c2x","imageUri":null},{"id":3,"text":"c3x","imageUri":null},{"id":4,"text":"c4x","imageUri":null}],"groups":[],"items":[]},{"id":10,"typeId":1,"text":" ","imageUri":null,"orderNo":1,"weight":1.00,"choices":[],"groups":[],"items":[]},{"id":12,"typeId":1,"text":" ","imageUri":null,"orderNo":2,"weight":1.00,"choices":[],"groups":[],"items":[]},{"id":17,"typeId":1,"text":"<p>aaaa</p>","imageUri":null,"orderNo":3,"weight":1.00,"choices":[{"id":20,"text":"cc1","imageUri":null},{"id":21,"text":"cc2","imageUri":null},{"id":22,"text":"cc3","imageUri":null},{"id":23,"text":"cc4","imageUri":null}],"groups":[],"items":[]},{"id":18,"typeId":1,"text":" ","imageUri":null,"orderNo":4,"weight":1.00,"choices":[],"groups":[],"items":[]},{"id":19,"typeId":1,"text":" ","imageUri":null,"orderNo":5,"weight":1.00,"choices":[],"groups":[],"items":[]},{"id":22,"typeId":1,"text":"<p>bbbb</p>","imageUri":null,"orderNo":6,"weight":1.00,"choices":[{"id":24,"text":"bc1","imageUri":null},{"id":25,"text":"bc2","imageUri":null},{"id":26,"text":"bc3","imageUri":null}],"groups":[],"items":[]},{"id":23,"typeId":1,"text":" ","imageUri":null,"orderNo":7,"weight":1.00,"choices":[],"groups":[],"items":[]}]}]},"isSuccess":true,"exception":null,"messages":["OK"]}
      this.examSessionData = JSON.parse(examData);
      this.examSectionSets = this.examSessionData.sectionData?.sets;
      this.examSectionSets.map((set) => {
        set.questions.map((question) => {
          if (question.typeId === EnumService.examQuestionTypes.DRAG_DROP) {
            question.groups.map((group) => {
              group.answered = [];
            });
          }
        });
      });
    }

    this.route.queryParams.subscribe((params) => {

    });

  }


  ngOnInit(): void {
    if (!(this.examSessionData.sectionData && this.examSessionData.sectionData.name === EnumService.examSectionTypes.WRITING)) {
      this.location.back();
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }


  singleChoiceItemSelect(item, subItem): void {
    item.choices.map((choice) => {
      choice.selected = false;
    });
    subItem.selected = true;
  }

  // Video Play
  shouldVideoClipPlay = () => {
    if (this.examSectionSets && this.examSectionSets.length > this.currentIndex) {
      const currentSet = this.examSectionSets[this.currentIndex];
      if (currentSet.videoUri && !currentSet.startSetQuestion) {
        return true;
      }
    }
    return false;
  };

  playVideo(event: any): void {
    this.isVideoPlaying = true;
    this.videoplayer.nativeElement.play();
  }

  videoEnd(event: any): void {
    if (this.examSectionSets && this.examSectionSets.length > this.currentIndex) {
      const currentSet = this.examSectionSets[this.currentIndex];
      if (!currentSet.videoRepeatable) {
        currentSet.startSetQuestion = true;
        this.isVideoPlaying = false;
      }
    }
  }

  // End-- Video Play

  startSetQuestion(): void {
    if (this.examSectionSets && this.examSectionSets.length > this.currentIndex) {
      const currentSet = this.examSectionSets[this.currentIndex];
      currentSet.startSetQuestion = true;
      this.isVideoPlaying = false;
      this.videoplayer.nativeElement.pause();
    }
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      id: 'confirmdialog',
      disableClose: true,
      role: 'dialog',
      data: {
        title: 'Are you sure you want to finish this section?',
        message: 'You will not be able to return later to double-check or change your answers if you finish this section. Are you sure you are done checking your work?',
        leftBtnTitle: 'No, go back to question 1',
        rightBtnTitle: 'Yes I am done'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.shareddataService.endExamSession(this.examSectionSets);
      } else {
        this.currentIndex = 0;
      }
    });
  }

  onBack(): void {
    this.location.back();
  }

  onPrevious(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  onNext(): void {
    if (this.currentIndex < (this.examSectionSets.length - 1)) {
      this.currentIndex++;
    }
  }

  totalQuestionCount(): number {
    let totalQuestionCount = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.examSectionSets.length; i++) {
      const set = this.examSectionSets[i];
      totalQuestionCount = totalQuestionCount + set.questions.length;
    }
    return totalQuestionCount;
  }

  previousQuestionsCount(): number {
    if (this.currentIndex > 0) {
      let totalQuestionCount = 0;
      for (let i = 0; i <= (this.currentIndex - 1); i++) {
        const set = this.examSectionSets[i];
        totalQuestionCount = totalQuestionCount + set.questions.length;
      }
      return totalQuestionCount;
    }
    return 0;
  }

  previousBtnText(): string {
    if (this.currentIndex > 0) {
      let totalQuestionCount = 0;
      for (let i = 0; i < (this.currentIndex - 1); i++) {
        const set = this.examSectionSets[i];
        totalQuestionCount = totalQuestionCount + set.questions.length;
      }
      const prevSet = this.examSectionSets[this.currentIndex - 1];
      const prevSetQuestionCount = prevSet.questions.length;
      return (totalQuestionCount + 1) + ' - ' + (totalQuestionCount + prevSetQuestionCount);
    }
    return '';
  }

  nextBtnText(): string {
    if (this.currentIndex < this.examSectionSets.length - 1) {
      let totalQuestionCount = 0;
      for (let i = 0; i <= this.currentIndex; i++) {
        const set = this.examSectionSets[i];
        totalQuestionCount = totalQuestionCount + set.questions.length;
      }
      const nextSet = this.examSectionSets[this.currentIndex + 1];
      const nextSetQuestionCount = nextSet.questions.length;
      if (nextSetQuestionCount > 0) {
        const startQuestionCount = totalQuestionCount + 1;
        const endQuestionCount = totalQuestionCount + nextSetQuestionCount;
        if (startQuestionCount === endQuestionCount) {
          return startQuestionCount.toString();
        }
        return startQuestionCount + ' - ' + endQuestionCount;
      }
    }
    return '';
  }

}
