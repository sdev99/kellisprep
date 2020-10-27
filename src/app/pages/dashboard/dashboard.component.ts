import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmModalComponent} from '../../modals/confirm-modal/confirm-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {PersonalizeExamcourseComponent} from '../../modals/personalize-examcourse/personalize-examcourse.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  menuItems = [
    {
      title: 'My Courses',
      submenus: [
        {
          title: 'Purchased Courses',
          type: 'course',
          planType: 'purchased',
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
          type: 'exam_history'
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

  constructor(
    private router: Router,
    public dialog: MatDialog,
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
  }

  onItemSelect(item): void {
    this.selectedMenu = item;
  }

  pageChange(event): void {
    this.examHistoryPagination = event;
  }

  openTopicDetail(category, item): void {
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

  seeAll(item): void {
    if (this.selectedMenu.type === 'course') {
      this.router.navigate(['category-topics'], {
        queryParams: {
          category: JSON.stringify(item)
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
