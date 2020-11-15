import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {EnumService} from '../../services/enum.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-section-direction',
  templateUrl: './section-direction.component.html',
  styleUrls: ['./section-direction.component.scss']
})
export class SectionDirectionComponent implements OnInit {
  practiceType;
  itemDetail;
  pathsTree;
  examSessionData;
  sectionDescription;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params && params.practiceType) {
        this.practiceType = params.practiceType;
      }

      const item = cookieService.get(EnumService.cookieNames.CURRENT_EXAM_SESSION);
      const examSessionData = localStorage.getItem(EnumService.localStorageKeys.CURRENT_EXAM_SESSION_DATA);
      if (item) {
        this.itemDetail = JSON.parse(item);
        this.pathsTree = [this.itemDetail.type, this.itemDetail.name, this.practiceType + ' Section'];
      }
      if (examSessionData) {
        this.examSessionData = JSON.parse(examSessionData);
      }

      if (this.examSessionData && this.examSessionData.sectionData && this.examSessionData.sectionData.guideline) {
        this.sectionDescription = this.examSessionData.sectionData.guideline;
      }
    });
  }

  ngOnInit(): void {
  }

  onBack(): void {
    this.location.back();
  }

  onNext(): void {
    let navigateTo = 'reading-section';
    switch (this.practiceType) {
      case EnumService.examSectionTypes.READING:
        navigateTo = 'reading-section';
        break;
      case EnumService.examSectionTypes.WRITING:
        navigateTo = 'writing-section';
        break;
      case EnumService.examSectionTypes.MATH:
        navigateTo = 'math-section';
        break;
      case EnumService.examSectionTypes.LISTENING:
        navigateTo = 'listening-section';
        break;
      case EnumService.examSectionTypes.SPEAKING:
        navigateTo = 'speaking-section';
        break;
    }
    this.router.navigate([navigateTo]);
  }

  onFinishSectionClick(): void {
    this.router.navigate(['practice-tests']);
  }

}
