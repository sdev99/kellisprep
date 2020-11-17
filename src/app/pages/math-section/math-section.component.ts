import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmModalComponent} from '../../modals/confirm-modal/confirm-modal.component';
import {EnumService} from '../../services/enum.service';
import {CookieService} from 'ngx-cookie-service';
import {AccountService} from '../../services/account.service';
import {ApiService} from '../../services/api.service';
import {AlertService} from '../../services/alert.service';
import {environment} from '../../../environments/environment';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-math-section',
  templateUrl: './math-section.component.html',
  styleUrls: ['./math-section.component.scss']
})
export class MathSectionComponent implements OnInit {
  environment = environment;

  EnumService = EnumService;

  loading = false;


  currentSetIndex = 0;
  currentIndex = 0;
  currentQuestion;

  maxMessageLength = 250;
  submitted = false;

  itemDetail;
  examSessionData;
  examSectionSets;
  pathsTree = [];

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private apiService: ApiService,
    private alertService: AlertService,
    public dialog: MatDialog,
    private cookieService: CookieService,
  ) {

    const item = cookieService.get(EnumService.cookieNames.CURRENT_EXAM_SESSION);
    const examData = localStorage.getItem(EnumService.localStorageKeys.CURRENT_EXAM_SESSION_DATA);

    if (item) {
      this.itemDetail = JSON.parse(item);
      this.pathsTree = [this.itemDetail.type, this.itemDetail.name, 'Math Section'];
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

      this.currentQuestion = this.examSectionSets[this.currentSetIndex].questions[this.currentIndex];
    }
  }


  ngOnInit(): void {
    if (!(this.examSessionData.sectionData && this.examSessionData.sectionData.name === 'Math')) {
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

  endExamSession = () => {
    const examSectionSets = this.examSectionSets;
    const asnwers = [];
    examSectionSets.map((item) => {
      const questions = item.questions;
      questions.map((question) => {
        const answerObject: any = {
          questionId: question.id,
        };

        let isAnswered = false;

        if (question.typeId === EnumService.examQuestionTypes.MULTIPLE_CHOICE_SINGLE_SELECT || question.typeId === EnumService.examQuestionTypes.MULTIPLE_CHOICE_MULTIPLE_SELECT) {
          const choices = question.choices;
          const selectedChoices = [];
          choices.map((choice) => {
            if (choice.selected) {
              selectedChoices.push(choice.id);
              isAnswered = true;
            }
          });

          answerObject.selectedChoices = selectedChoices;
        } else if (question.typeId === EnumService.examQuestionTypes.VERIFIABLE_TEXT_SINGLE_LINE || question.typeId === EnumService.examQuestionTypes.UNVERIFIABLE_TEXT_SINGLE_LINE || question.typeId === EnumService.examQuestionTypes.VERIFIABLE_TEXT_MULTI_LINE || question.typeId === EnumService.examQuestionTypes.UNVERIFIABLE_TEXT_MULTI_LINE) {
          answerObject.answerInput = question.answerInput;
          isAnswered = true;
        } else if (question.typeId === EnumService.examQuestionTypes.DRAG_DROP) {
          const groups = question.groups;
          const groupItemMatches = [];
          groups.map((group) => {
            const answered = group.answered;
            const answerIds = [];
            answered.map((answer) => {
              answerIds.push(answer.id);
              isAnswered = true;
            });

            const DragAndDropAnswerObject = {
              groupId: group.id,
              itemIds: answerIds
            };

            groupItemMatches.push(DragAndDropAnswerObject);

          });
          answerObject.groupItemMatches = groupItemMatches;
        }

        if (isAnswered) {
          asnwers.push(answerObject);
        }
      });
    });

    this.loading = true;
    this.apiService.endExamSession({
      answers: asnwers,
      examSectionId: this.examSessionData.examSectionId
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
  };


  singleChoiceItemSelect(item, subItem): void {
    item.choices.map((choice) => {
      choice.selected = false;
    });
    subItem.selected = true;
  }


  finishSection = () => {
    if (this.currentSetIndex < this.examSectionSets.length - 1) {
      this.currentSetIndex++;
      this.currentIndex = 0;
      this.currentQuestion = this.examSectionSets[this.currentSetIndex].questions[this.currentIndex];
    } else {
      this.openDialog();
    }
  };

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
        this.endExamSession();
      } else {
        this.currentSetIndex = 0;
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
      this.currentQuestion = this.examSectionSets[this.currentSetIndex].questions[this.currentIndex];
    }
  }

  onNext(): void {
    if (this.currentIndex < (this.examSectionSets[this.currentSetIndex].questions.length - 1)) {
      this.currentIndex++;
      this.currentQuestion = this.examSectionSets[this.currentSetIndex].questions[this.currentIndex];
    }
  }

  onFinishSectionClick(): void {
    this.router.navigate(['practice-tests']);
  }

}
