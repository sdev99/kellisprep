import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmModalComponent} from '../../modals/confirm-modal/confirm-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {PersonalizeExamcourseComponent} from '../../modals/personalize-examcourse/personalize-examcourse.component';
import {ApiService} from '../../services/api.service';
import {AccountService} from '../../services/account.service';
import {CookieService} from 'ngx-cookie-service';
import {EnumService} from '../../services/enum.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading = false;

  menuItems = [
    {
      title: 'My Courses',
      submenus: [
        {
          title: 'Purchased Courses',
          type: 'course',
          planType: 'purchased',
          apiDataKey: 'paidCourses',
          list: [
            {
              title: 'US history',
              price: '$36.99',
              topics: [
                {title: 'Worlds collide (1491-1607)', status: 'resume'},
                {title: 'Colonial America (1607-1754)'},
                {title: 'The road to revolution (1754-1800)'},
                {title: 'The early republic (1800-1848)'}
              ]
            },
            {
              title: 'World history project origins',
              price: '$36.99',
              topics: [
                {title: 'Era 1: Our Big History (13.82 billion years ago to the future)', status: 'completed'},
                {title: 'Early Humans (250,000 years BP to 3,000 BCE)', status: 'start'},
                {title: 'Cities, Societies, and Empires (6,000 BCE to 700 CE)'},
                {title: 'Regional Webs (200 to 1500 CE)'}
              ]
            }
          ]
        },
        {
          title: 'Free Courses',
          type: 'course',
          planType: 'free',
          apiDataKey: 'freeCourses',
          list: [
            {
              title: 'US history',
              topics: [
                {title: 'Worlds collide (1491-1607)', status: 'resume'},
                {title: 'Colonial America (1607-1754)'},
                {title: 'The road to revolution (1754-1800)'},
                {title: 'The early republic (1800-1848)'}
              ]
            },
            {
              title: 'Geometry',
              topics: [
                {title: 'Worlds collide (1491-1607)', status: 'completed'},
                {title: 'Colonial America (1607-1754)', status: 'start'},
                {title: 'The road to revolution (1754-1800)'},
                {title: 'The early republic (1800-1848)'}
              ]
            }
          ]
        },
      ]
    },
    {
      title: 'My Exams',
      submenus: [
        {
          title: 'Purchased Exams',
          apiDataKey: 'paidExams',
          type: 'exam',
          planType: 'purchased',
          list: [
            {
              title: 'SAT',
              price: '$36.99',
              topics: [
                {title: 'Practice test1', status: 'resume'},
                {title: 'Practice test2'},
                {title: 'Practice test3'},
                {title: 'Practice test4'},
              ]
            },
            {
              title: 'TOFEL',
              price: '$60.99',
              topics: [
                {title: 'Practice test1', status: 'completed'},
                {title: 'Practice test2', status: 'resume'},
                {title: 'Practice test3'},
                {title: 'Practice test4'},
              ]
            }
          ]
        },
        {
          title: 'Free Exams',
          type: 'exam',
          planType: 'free',
          apiDataKey: 'freeExams',
          list: [
            {
              title: 'SAT',
              topics: [
                {title: 'Practice test1', status: 'resume'},
                {title: 'Practice test2'},
                {title: 'Practice test3'},
                {title: 'Practice test4'},
              ]
            },
            {
              title: 'TOFEL',
              topics: [
                {title: 'Practice test1', status: 'completed'},
                {title: 'Practice test2', status: 'completed'},
                {title: 'Practice test3', status: 'start'},
                {title: 'Practice test4'},
                {title: 'Practice test5'},
              ]
            }
          ]
        },
      ]
    },
    {
      title: 'My Account',
      submenus: [
        {
          title: 'Exam History',
          type: 'exam_history',
          apiDataKey: 'examHistory',
        },
      ]
    }
  ];

  filterTimesList = [
    {title: 'Yesterday'},
    {title: 'Last week'},
    {title: 'Last month'},
    {title: 'The very beginning'},
  ];

  filterExamList = [
    {title: 'FPSC Exams'},
    {title: 'PPSC Exams'},
    {title: 'NTS Exams'},
    {title: 'GAT Exams'},
  ];


  examsHistories = [
    {title: 'Exam 1', type: 'FPSC Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 2', type: 'NTS Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 3', type: 'GAT Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 4', type: 'FPSC Exams', date: '2020/10/12 12:10', score: 80},
    {title: 'Exam 5', type: 'PPSC Exams', date: '2020/9/11 12:10', score: 40},
    {title: 'Exam 5', type: 'NTS Exams', date: '2020/11/19 12:10', score: 30},
    {title: 'Exam 7', type: 'GAT Exams', date: '2020/12/12 19:10', score: 30},
    {title: 'Exam 1', type: 'FPSC Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 2', type: 'NTS Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 3', type: 'GAT Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 4', type: 'FPSC Exams', date: '2020/10/12 12:10', score: 80},
    {title: 'Exam 5', type: 'PPSC Exams', date: '2020/9/11 12:10', score: 40},
    {title: 'Exam 5', type: 'NTS Exams', date: '2020/11/19 12:10', score: 30},
    {title: 'Exam 7', type: 'GAT Exams', date: '2020/12/12 19:10', score: 30},
    {title: 'Exam 1', type: 'FPSC Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 2', type: 'NTS Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 3', type: 'GAT Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 4', type: 'FPSC Exams', date: '2020/10/12 12:10', score: 80},
    {title: 'Exam 5', type: 'PPSC Exams', date: '2020/9/11 12:10', score: 40},
    {title: 'Exam 5', type: 'NTS Exams', date: '2020/11/19 12:10', score: 30},
    {title: 'Exam 7', type: 'GAT Exams', date: '2020/12/12 19:10', score: 30},
    {title: 'Exam 1', type: 'FPSC Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 2', type: 'NTS Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 3', type: 'GAT Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 4', type: 'FPSC Exams', date: '2020/10/12 12:10', score: 80},
    {title: 'Exam 5', type: 'PPSC Exams', date: '2020/9/11 12:10', score: 40},
    {title: 'Exam 5', type: 'NTS Exams', date: '2020/11/19 12:10', score: 30},
    {title: 'Exam 7', type: 'GAT Exams', date: '2020/12/12 19:10', score: 30},
    {title: 'Exam 1', type: 'FPSC Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 2', type: 'NTS Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 3', type: 'GAT Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 4', type: 'FPSC Exams', date: '2020/10/12 12:10', score: 80},
    {title: 'Exam 5', type: 'PPSC Exams', date: '2020/9/11 12:10', score: 40},
    {title: 'Exam 5', type: 'NTS Exams', date: '2020/11/19 12:10', score: 30},
    {title: 'Exam 7', type: 'GAT Exams', date: '2020/12/12 19:10', score: 30},
    {title: 'Exam 1', type: 'FPSC Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 2', type: 'NTS Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 3', type: 'GAT Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 4', type: 'FPSC Exams', date: '2020/10/12 12:10', score: 80},
    {title: 'Exam 5', type: 'PPSC Exams', date: '2020/9/11 12:10', score: 40},
    {title: 'Exam 5', type: 'NTS Exams', date: '2020/11/19 12:10', score: 30},
    {title: 'Exam 7', type: 'GAT Exams', date: '2020/12/12 19:10', score: 30},
    {title: 'Exam 1', type: 'FPSC Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 2', type: 'NTS Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 3', type: 'GAT Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 4', type: 'FPSC Exams', date: '2020/10/12 12:10', score: 80},
    {title: 'Exam 5', type: 'PPSC Exams', date: '2020/9/11 12:10', score: 40},
    {title: 'Exam 5', type: 'NTS Exams', date: '2020/11/19 12:10', score: 30},
    {title: 'Exam 7', type: 'GAT Exams', date: '2020/12/12 19:10', score: 30},
    {title: 'Exam 1', type: 'FPSC Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 2', type: 'NTS Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 3', type: 'GAT Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 4', type: 'FPSC Exams', date: '2020/10/12 12:10', score: 80},
    {title: 'Exam 5', type: 'PPSC Exams', date: '2020/9/11 12:10', score: 40},
    {title: 'Exam 5', type: 'NTS Exams', date: '2020/11/19 12:10', score: 30},
    {title: 'Exam 7', type: 'GAT Exams', date: '2020/12/12 19:10', score: 30},
    {title: 'Exam 1', type: 'FPSC Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 2', type: 'NTS Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 3', type: 'GAT Exams', date: '2020/10/12 12:10', score: 30},
    {title: 'Exam 4', type: 'FPSC Exams', date: '2020/10/12 12:10', score: 80},
    {title: 'Exam 5', type: 'PPSC Exams', date: '2020/9/11 12:10', score: 40},
    {title: 'Exam 5', type: 'NTS Exams', date: '2020/11/19 12:10', score: 30},
    {title: 'Exam 7', type: 'GAT Exams', date: '2020/12/12 19:10', score: 30},
  ];


  itemsPerPage = [10, 20, 30, 40, 50, 100];
  selectedExam: any = {};
  selectedTime: any = {};

  examSearchTerm = '';

  selectedMenu: any = {};
  examHistoryPagination: {
    pageIndex: number,
    pageSize: number,
    length: number,
    previousPageIndex: number
  };

  myHistories;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public apiService: ApiService,
    public cookieService: CookieService,
    public accountService: AccountService,
  ) {
    this.selectedMenu = this.menuItems[0].submenus[0];
    this.selectedExam = this.filterExamList[0];
    this.selectedTime = this.filterTimesList[0];

    this.examHistoryPagination = {
      pageIndex: 0,
      pageSize: 10,
      length: this.examsHistories.length,
      previousPageIndex: -1
    };
  }

  ngOnInit(): void {
    this.getUserHistory();
  }

  getUserHistory(): void {
    this.apiService.userHistory({courseLanguageId: 1, userId: this.accountService.userValue.id}).subscribe((data) => {

      const myHistories = {};
      Object.keys(data).map((historyType) => {
        const list = data[historyType];
        if (historyType !== 'examHistory') {
          const examsByTypes = {};
          list.map((item) => {
            if (!examsByTypes[item.type]) {
              examsByTypes[item.type] = [];
            }
            examsByTypes[item.type].push(item);
          });
          myHistories[historyType] = examsByTypes;
        } else {
          myHistories[historyType] = list;
        }
      });

      this.myHistories = myHistories;

      // currencyId: 1
      // currencyText: "USD"
      // id: 8
      // isStarted: false
      // name: "TOEFL #1"
      // price: 100
      // sectionId: null
      // type: "TOEFL"

    }, (error) => {

    });
  }


  onItemSelect(item): void {
    this.selectedMenu = item;
  }

  pageChange(event): void {
    this.examHistoryPagination = event;
  }

  startExam(item): void {
    if (this.selectedMenu.type === 'exam') {
      this.loading = true;
      this.apiService.initExamSession({
        userId: this.accountService.userValue.id,
        examId: item.id
      }).subscribe((data) => {
        this.loading = false;
        this.cookieService.set(EnumService.cookieNames.CURRENT_EXAM_SESSION, JSON.stringify(item));
        if (data.isSuccess) {
          this.router.navigate(['practice-tests']);
        } else {
          this.router.navigate(['practice-tests']);
        }
      }, (error) => {
        this.loading = false;
      });
      // {
      //   "examId": 2,
      //   "userId": 14,
      //   "sessionId": "b34ab0e5-ec3e-4c13-9ae5-556a9f07439c",
      //   "examTypeId": 1,
      //   "examTypeText": "SAT",
      //   "title": "SAT-EXAM-01",
      //   "description": "<p>SAT-EXAM-01</p>",
      //   "isSuccess": true,
      //   "exception": null,
      //   "messages": null
      // }

    } else if (this.selectedMenu.type === 'course') {
      this.router.navigate(['topic-detail'], {
        queryParams: {
          topic: JSON.stringify(item),
        }
      });
    }
  }

  openTopicDetail(category, item = {}): void {
    if (this.selectedMenu.type === 'exam') {
      this.router.navigate(['practice-tests'], {
        queryParams: {
          topic: JSON.stringify(item),
          category: JSON.stringify(category),
        }
      });
    } else if (this.selectedMenu.type === 'course') {
      this.router.navigate(['topic-detail'], {
        queryParams: {
          topic: JSON.stringify(item),
          category: JSON.stringify(category),
        }
      });
    }
  }

  seeAll(type): void {
    if (this.selectedMenu.type === 'course') {
      this.router.navigate(['category-topics'], {
        queryParams: {
          category: type
        }
      });
    }
  }

  getExamHistoryListByPagination(): any {
    const list = this.examsHistories.clone().splice(this.examHistoryPagination.pageIndex * this.examHistoryPagination.pageSize, this.examHistoryPagination.pageSize);
    return list;
  }

  openAddExamCourseDialog(): void {

    const dialogRef = this.dialog.open(PersonalizeExamcourseComponent, {
      id: 'personalizedExamCourseDialog',
      disableClose: false,
      role: 'dialog',
      data: {
        type: this.selectedMenu.type,
        planType: this.selectedMenu.planType
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
