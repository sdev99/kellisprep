import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {EnumService} from '../../services/enum.service';
import {CookieService} from 'ngx-cookie-service';
import {ShareddataService} from '../../services/shareddata.service';
import {SectionDirectionComponent} from '../section-direction/section-direction.component';

@Component({
  selector: 'app-test-direction',
  templateUrl: './test-direction.component.html',
  styleUrls: ['./test-direction.component.scss']
})
export class TestDirectionComponent implements OnInit {

  EnumService = EnumService;

  sectionType;
  itemDetail;
  examSessionData;
  pathsTree;

  sectionTitle = '';
  sectionDescription = '';


  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private router: Router,
    private shareddataService: ShareddataService,
  ) {
    this.route.params.subscribe((params) => {

      if (params && params.section) {
        this.sectionType = params.section;
        if (this.sectionType === EnumService.examSectionTypes.MATH) {
          this.sectionTitle = 'WELCOME TO ' + this.sectionType + ' (No CALCULATOR)';
          this.sectionDescription = 'This section has 20 questions and is 25 minutes total.';
        } else {
          this.sectionTitle = 'WELCOME TO ' + this.sectionType + ' Section';
          this.sectionDescription = 'This test is divided up into 4 sections. Once you have finished all of the sections, you will get your math and\n' +
            '        reading scores. You must complete (or skip) each section to unlock the next. You cannot "save" a section for\n' +
            '        later, and once a section\'s timer has run out, you cannot go back to work on that section again. You can take\n' +
            '        breaks between the sections, and you do not have to complete the whole practice test in one sitting. The first\n' +
            '        part is Reading. It is 65 minutes and has 52 questions.';
        }
      }

      const item = cookieService.get(EnumService.cookieNames.CURRENT_EXAM_SESSION);
      const examSessionData = localStorage.getItem(EnumService.localStorageKeys.CURRENT_EXAM_SESSION_DATA);
      if (item) {
        this.itemDetail = JSON.parse(item);
        this.pathsTree = [this.itemDetail.type, this.itemDetail.name, this.sectionType + ' Section'];
      }
      if (examSessionData) {
        this.examSessionData = JSON.parse(examSessionData);
        if (this.examSessionData && this.examSessionData.description) {
          this.sectionDescription = this.examSessionData.description;
        }
      }

    });
  }

  ngOnInit(): void {
  }

  onBack(): void {
    this.location.back();
  }

  onNext(): void {
    const examType = this.itemDetail.type;
    const examId = this.itemDetail.id;
    const sectionDirectionRouteConfig = examType + '/:id/:section/guideline';
    const sectionDirectionRoute = examType + '/' + examId + '/' + this.sectionType + '/guideline';
    this.shareddataService.addDynamicRoute(sectionDirectionRouteConfig, SectionDirectionComponent, true);

    this.router.navigate([sectionDirectionRoute]);
  }

  onFinishSectionClick(): void {
    this.router.navigate(['practice-tests']);
  }

}
