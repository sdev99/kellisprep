import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmModalComponent} from '../../modals/confirm-modal/confirm-modal.component';
import {EnumService} from '../../services/enum.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-speaking-section',
  templateUrl: './speaking-section.component.html',
  styleUrls: ['./speaking-section.component.scss']
})
export class SpeakingSectionComponent implements OnInit {

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

  questions: any = [];

  currentIndex = 0;
  questionsPerpage = 10;
  totalPages = 1;

  maxMessageLength = 250;
  submitted = false;
  data: any = {};

  itemDetail;
  pathsTree = [];

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private cookieService: CookieService,
  ) {

    const item = cookieService.get(EnumService.cookieNames.CURRENT_EXAM_SESSION);
    if (item) {
      this.itemDetail = JSON.parse(item);
      this.pathsTree = [this.itemDetail.type, this.itemDetail.name, 'Speaking Section'];
    }

    this.route.queryParams.subscribe((params) => {
      if (params && params.data) {
        this.data = JSON.parse(params.data);
      }
    });

    for (let i = 0; i < 30; i++) {
      if (i % 14 === 0) {
        this.questions.push({
          title: (i + 1) + ' Big History weaves expert thinking about the Universe into a coherent story and looks at the entire span of history at different scales. It’s a modern, scientific version of an origin story.',
          questionType: 'multilinetext',
          answer: ''
        });
      }  else {
        this.questions.push({
          title: (i + 1) + ' Which of the following statements is the best definition of Big History?',
          questionType: (i % 4 === 0) ? 'multichoice' : 'singlechoice',
          answers: [
            {index: 'A', title: 'How was the Universe created?'},
            {index: 'B', title: 'Why are stars so big and humans so small?'},
            {index: 'C', title: 'Why are humans so insignificant?'},
            {index: 'D', title: 'What does it mean to be human?'},
          ],
        });
      }
    }

    this.totalPages = Math.ceil(this.questions.length / this.questionsPerpage);
  }


  ngOnInit(): void {
    if (!(this.examSessionData.sectionData && this.examSessionData.sectionData.name === 'Speaking')) {
      this.location.back();
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
      setTimeout(() => {
        this.openDialog1();
      }, 500);
    });
  }

  openDialog1(): void {

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      id: 'confirmdialog',
      disableClose: true,
      role: 'dialog',
      data: {
        title: 'You finished Reading, nice work!',
        message: 'When you take the real SAT, there\'s a 10-minute break before the next section. Take a quick breather, and when you\'re ready, start the next section: Writing section.',
        leftBtnTitle: 'Start Later',
        rightBtnTitle: 'Start the Writing Section'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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
    if (this.currentIndex < (this.totalPages - 1)) {
      this.currentIndex++;
    }
  }

  getQuestionsForCurrentPage(): any {
    const startIndex = (this.currentIndex * this.questionsPerpage);
    return this.questions.slice(startIndex, startIndex + this.questionsPerpage);
  }

  onFinishSectionClick(): void {
    this.router.navigate(['practice-tests']);
  }

}
