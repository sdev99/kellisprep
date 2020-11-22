import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ForgotpasswordComponent} from '../../modals/forgotpassword/forgotpassword.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmModalComponent} from '../../modals/confirm-modal/confirm-modal.component';
import {EnumService} from '../../services/enum.service';
import {CookieService} from 'ngx-cookie-service';
import {ApiService} from '../../services/api.service';
import {AccountService} from '../../services/account.service';
import {AlertService} from '../../services/alert.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TestDirectionComponent} from '../test-direction/test-direction.component';
import {ShareddataService} from '../../services/shareddata.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-reading-section',
  templateUrl: './reading-section.component.html',
  styleUrls: ['./reading-section.component.scss']
})
export class ReadingSectionComponent implements OnInit {
  environment = environment;

  EnumService = EnumService;

  loading = false;

  descriptionText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel tristique urna. Aliquam bibendum fringilla\n' +
    '          nulla at ultrices. Etiam bibendum mi sed enim ultricies, et varius quam pellentesque. Proin lobortis dolor\n' +
    '          mauris,\n' +
    '          id posuere nunc semper pharetra. Phasellus et lobortis lorem. Phasellus sed pharetra odio. Interdum et\n' +
    '          malesuada\n' +
    '          fames ac ante ipsum primis in faucibus. Aenean fermentum, urna sit amet interdum pharetra, mi arcu hendrerit\n' +
    '          risus, at rutrum tortor neque sit amet ipsum.\n' +
    '          <br/>\n' +
    '          <br/>\n' +
    '          Duis commodo dolor dolor, vel ornare elit ornare sed. Ut non\n' +
    '          pulvinar libero. Sed porta eu tortor interdum suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing\n' +
    '          elit.\n' +
    '          Nullam dui turpis, facilisis et quam eu, ultrices auctor neque. Donec pretium sapien non eleifend consectetur.\n' +
    '          Nullam ligula ante, suscipit vel ex sit amet, semper feugiat arcu. Fusce vehicula leo placerat venenatis\n' +
    '          fermentum.\n' +
    '          <br/>\n' +
    '          <br/>\n' +
    '          Nullam eu eros tincidunt, aliquet felis ac, efficitur dolor. Sed malesuada nisi id neque fermentum, vel\n' +
    '          consequat leo ornare. Duis a turpis pulvinar, auctor turpis vel, facilisis velit. Cras fermentum quis felis in\n' +
    '          posuere. Proin in dictum nisi, vel luctus erat. Integer in libero est. Mauris aliquet libero in mauris\n' +
    '          porttitor,\n' +
    '          a tempor lacus lacinia.Duis commodo dolor dolor, vel ornare elit ornare sed. Ut non pulvinar libero. Sed\n' +
    '          porta\n' +
    '          eu tortor interdum suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n' +
    '          <br/>\n' +
    '          <br/>\n' +
    '          Nullam dui turpis, facilisis\n' +
    '          et quam eu, ultrices auctor neque. Donec pretium sapien non eleifend consectetur. Nullam ligula ante, suscipit\n' +
    '          vel\n' +
    '          ex sit amet, semper feugiat arcu. Fusce vehicula leo placerat venenatis fermentum. Nullam eu eros tincidunt,\n' +
    '          aliquet felis ac, efficitur dolor. Sed malesuada nisi id neque fermentum, vel consequat leo ornare. Duis a\n' +
    '          turpis\n' +
    '          pulvinar, auctor turpis vel, facilisis velit. Cras fermentum quis felis in posuere.\n' +
    '          <br/>\n' +
    '          <br/>\n' +
    '          Proin in dictum nisi, vel\n' +
    '          luctus erat. Integer in libero est. Mauris aliquet libero in mauris porttitor, a tempor lacus lacinia.';


  currentIndex = 0;

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
    public shareddataService: ShareddataService,
    private cookieService: CookieService,
  ) {

    const item = cookieService.get(EnumService.cookieNames.CURRENT_EXAM_SESSION);
    const examSessionData = localStorage.getItem(EnumService.localStorageKeys.CURRENT_EXAM_SESSION_DATA);

    if (item) {
      this.itemDetail = JSON.parse(item);
      this.pathsTree = [this.itemDetail.type, this.itemDetail.name, EnumService.examSectionTypes.READING + ' Section'];
    }

    if (examSessionData) {
      // {"examSectionId":17,"sessionId":"b34ab0e5-ec3e-4c13-9ae5-556a9f07439c","examTypeId":1,"examTypeText":"SAT","title":"SAT-EXAM-01","description":"<p>SAT-EXAM-01</p>","duration":null,"sectionData":{"id":1,"name":"Reading","guideline":null,"sets":[{"id":2,"orderNo":1,"passage":" ","videoUri":null,"videoRepeatable":false,"questions":[{"id":1,"typeId":1,"text":"<p>q1x</p>","imageUri":"/medialibrary/image/worldmap.jpg","orderNo":0,"weight":1.00,"choices":[{"id":1,"text":"c1x","imageUri":null},{"id":2,"text":"c2x","imageUri":null},{"id":3,"text":"c3x","imageUri":null},{"id":4,"text":"c4x","imageUri":null}],"groups":[],"items":[]},{"id":10,"typeId":1,"text":" ","imageUri":null,"orderNo":1,"weight":1.00,"choices":[],"groups":[],"items":[]},{"id":12,"typeId":1,"text":" ","imageUri":null,"orderNo":2,"weight":1.00,"choices":[],"groups":[],"items":[]},{"id":17,"typeId":1,"text":"<p>aaaa</p>","imageUri":null,"orderNo":3,"weight":1.00,"choices":[{"id":20,"text":"cc1","imageUri":null},{"id":21,"text":"cc2","imageUri":null},{"id":22,"text":"cc3","imageUri":null},{"id":23,"text":"cc4","imageUri":null}],"groups":[],"items":[]},{"id":18,"typeId":1,"text":" ","imageUri":null,"orderNo":4,"weight":1.00,"choices":[],"groups":[],"items":[]},{"id":19,"typeId":1,"text":" ","imageUri":null,"orderNo":5,"weight":1.00,"choices":[],"groups":[],"items":[]},{"id":22,"typeId":1,"text":"<p>bbbb</p>","imageUri":null,"orderNo":6,"weight":1.00,"choices":[{"id":24,"text":"bc1","imageUri":null},{"id":25,"text":"bc2","imageUri":null},{"id":26,"text":"bc3","imageUri":null}],"groups":[],"items":[]},{"id":23,"typeId":1,"text":" ","imageUri":null,"orderNo":7,"weight":1.00,"choices":[],"groups":[],"items":[]}]}]},"isSuccess":true,"exception":null,"messages":["OK"]}
      this.examSessionData = JSON.parse(examSessionData);
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
    if (!(this.examSessionData.sectionData && this.examSessionData.sectionData.name === EnumService.examSectionTypes.READING)) {
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

  onFinishSectionClick(): void {
    this.router.navigate(['practice-tests']);
  }

}
