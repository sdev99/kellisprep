import {Injectable} from '@angular/core';
import {PracticeTestsComponent} from '../pages/practice-tests/practice-tests.component';
import {AuthGuard} from '../helpers/auth.guard';
import {Router} from '@angular/router';
import {EnumService} from './enum.service';
import {CookieService} from 'ngx-cookie-service';
import {ConfirmModalComponent} from '../modals/confirm-modal/confirm-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {TestDirectionComponent} from '../pages/test-direction/test-direction.component';
import {ApiService} from './api.service';
import {AccountService} from './account.service';
import {AlertService} from './alert.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../_models';

@Injectable({
  providedIn: 'root'
})
export class ShareddataService {

  private loadingSubject: BehaviorSubject<boolean>;
  public loading: Observable<boolean>;

  allExamsList;
  freeExams;
  paidExams;

  satSections = [
    {
      title: 'Reading Section',
      type: EnumService.examSectionTypes.READING,
      decription: 'Short detail about reading section in which you have to tell about what is reading section'
    },
    {
      title: 'Writing Section',
      type: EnumService.examSectionTypes.WRITING,
      decription: 'Short detail about witting section in which you have to tell about what is witting section'
    },
    {
      title: 'Math Section',
      type: EnumService.examSectionTypes.MATH,
      decription: 'Short detail about Math Section in which you have to tell about what is Math Section'
    },
  ];

  toeflSections = [
    {
      title: 'Reading Section',
      type: EnumService.examSectionTypes.READING,
      decription: 'Short detail about reading section in which you have to tell about what is reading section'
    },
    {
      title: 'Writing Section',
      type: EnumService.examSectionTypes.WRITING,
      decription: 'Short detail about witting section in which you have to tell about what is witting section'
    },
    {
      title: 'Listening Section',
      type: EnumService.examSectionTypes.LISTENING,
      decription: 'Short detail about Listening Section in which you have to tell about what is Listening Section'
    },
    {
      title: 'Speaking Section',
      type: EnumService.examSectionTypes.SPEAKING,
      decription: 'Short detail about speaking action which you have to tell about what is speaking action'
    },
  ];

  constructor(
    private router: Router,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private apiService: ApiService,
    private accountService: AccountService,
    private alertService: AlertService,
  ) {
    this.loadingSubject = new BehaviorSubject<boolean>(false);
    this.loading = this.loadingSubject.asObservable();
  }

  startLoading = () => {
    this.loadingSubject.next(true);
  };

  stopLoading = () => {
    this.loadingSubject.next(false);
  };

  addDynamicRoute(dynamicPath, component, canActivateAuth = false): void {
    const appRoutes = [...this.router.config];
    let alreadyAdded = false;
    appRoutes.map((route) => {
      if (route.path === dynamicPath) {
        alreadyAdded = true;
      }
    });
    const canActivate = [];
    if (canActivateAuth) {
      canActivate.push(AuthGuard);
    }
    if (!alreadyAdded) {
      const route = {path: dynamicPath, component, canActivate};
      appRoutes.push(route);
      this.router.resetConfig(appRoutes);
    }
  }


  endExamSession = (examSectionSets) => {
    const currentExamSessionStr = localStorage.getItem(EnumService.localStorageKeys.CURRENT_EXAM_SESSION);
    const examSessionDataStr = localStorage.getItem(EnumService.localStorageKeys.CURRENT_EXAM_SESSION_DATA);
    if (currentExamSessionStr && examSessionDataStr) {
      const currentExamSession = JSON.parse(currentExamSessionStr);
      const examSessionData = JSON.parse(examSessionDataStr);

      const asnwers = [];
      examSectionSets.map((item) => {
        const questions = item.questions;
        questions.map((question) => {
          const answerObject: any = {
            questionId: question.id,
          };

          let isAnswered = false;

          switch (question.typeId) {
            case EnumService.examQuestionTypes.MULTIPLE_CHOICE_SINGLE_SELECT:
            case EnumService.examQuestionTypes.MULTIPLE_CHOICE_MULTIPLE_SELECT:
              const choices = question.choices;
              const selectedChoices = [];
              choices.map((choice) => {
                if (choice.selected) {
                  selectedChoices.push(choice.id);
                  isAnswered = true;
                }
              });
              answerObject.selectedChoices = selectedChoices;
              break;

            case EnumService.examQuestionTypes.VERIFIABLE_TEXT_SINGLE_LINE:
            case EnumService.examQuestionTypes.UNVERIFIABLE_TEXT_SINGLE_LINE:
            case EnumService.examQuestionTypes.VERIFIABLE_TEXT_MULTI_LINE:
            case EnumService.examQuestionTypes.UNVERIFIABLE_TEXT_MULTI_LINE:
            case EnumService.examQuestionTypes.AUDIO_RESPONSE:
              answerObject.answerInput = question.answerInput;
              isAnswered = true;
              break;

            case EnumService.examQuestionTypes.DRAG_DROP:
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
              break;

            default:
              break;
          }


          if (isAnswered) {
            asnwers.push(answerObject);
          }
        });
      });


      this.startLoading();
      this.apiService.endExamSession({
        answers: asnwers,
        examSectionId: examSessionData.examSectionId
      }).subscribe((res) => {
        this.stopLoading();
        if (res.isSuccess) {
          this.checkForNextSection(currentExamSession, examSessionData);
        } else {
          this.alertService.error(res.messages.join('\n'));
        }
      }, (error) => {
        this.stopLoading();
      });
    }
  };

  getNextSectionForExamType(currentExamSession, examSessionData): any {
    let list;
    if (currentExamSession.type === 'SAT') {
      list = this.satSections;
    } else if (currentExamSession.type === 'TOEFL') {
      list = this.toeflSections;
    }
    let currentIndex = 0;
    list.map((item, key) => {
      if (item.type === examSessionData.sectionData.name) {
        currentIndex = key;
        return;
      }
    });
    if ((currentIndex + 1) < list.length) {
      return list[currentIndex + 1];
    }
    return null;
  }

  checkForNextSection(currentExamSession, examSessionData): any {
    const nextSection = this.getNextSectionForExamType(currentExamSession, examSessionData);
    if (nextSection) {
      const rightBtnTitle = 'Start the ' + nextSection.type + ' Section';

      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        id: 'confirmdialog',
        disableClose: true,
        role: 'dialog',
        data: {
          title: 'You finished ' + examSessionData.sectionData.name + ', nice work!',
          message: 'When you take the real ' + currentExamSession.type + ', there\'s a 10-minute break before the next section. Take a quick breather, and when you\'re ready, start the next section: ' + nextSection.type + ' section.',
          leftBtnTitle: 'Start Later',
          rightBtnTitle
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.resumeExam(currentExamSession);
        } else {
          const examType = currentExamSession.type;
          const examId = currentExamSession.id;
          const practiceTestRouteConfig = examType + '/:id';
          const practiceTestRoute = examType + '/' + examId;
          this.addDynamicRoute(practiceTestRouteConfig, PracticeTestsComponent, true);
          this.router.navigate([practiceTestRoute]);
        }
        console.log(`Dialog result: ${result}`);
      });
    } else {
      this.router.navigate(['dashboard']);
    }
  }

  resumeExam = (currentExamSession) => {
    this.startLoading();
    this.apiService.resumeExamSession({
      userId: this.accountService.userValue.id,
      examId: currentExamSession.id
    }).subscribe((data) => {
      this.stopLoading();
      if (data.isSuccess) {
        localStorage.setItem(EnumService.localStorageKeys.CURRENT_EXAM_SESSION_DATA, JSON.stringify(data));

        const examType = currentExamSession.type;
        const examId = currentExamSession.id;
        const sectionType = data.sectionData.name;
        const testDirectionRouteConfig = examType + '/:id/:section/direction';
        const testDirectionRoute = examType + '/' + examId + '/' + sectionType + '/direction';
        this.addDynamicRoute(testDirectionRouteConfig, TestDirectionComponent, true);
        this.router.navigate([testDirectionRoute]);
      } else {
        this.alertService.error(data.message.join('\n'));
      }
    }, error => {
      this.stopLoading();
      this.alertService.error(error && error.message ? error.message : error);
    });
  };
}
