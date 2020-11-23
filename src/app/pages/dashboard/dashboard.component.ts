import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmModalComponent} from '../../modals/confirm-modal/confirm-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {PersonalizeExamcourseComponent} from '../../modals/personalize-examcourse/personalize-examcourse.component';
import {ApiService} from '../../services/api.service';
import {AccountService} from '../../services/account.service';
import {CookieService} from 'ngx-cookie-service';
import {EnumService} from '../../services/enum.service';
import {PracticeTestsComponent} from '../practice-tests/practice-tests.component';
import {AuthGuard} from '../../helpers/auth.guard';
import {ShareddataService} from '../../services/shareddata.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as moment from 'moment';
import {from} from 'rxjs';

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
        {title: 'All', value: 'all'},
        {title: 'This Month', value: 'this_month'},
        {title: 'Yesterday', value: 'yesterday'},
        {title: 'Last week', value: 'last_week'},
        {title: 'Last month', value: 'last_month'},
        // {title: 'The very beginning'},
    ];

    filterExamList = [
        {title: 'FPSC Exams'},
        {title: 'PPSC Exams'},
        {title: 'NTS Exams'},
        {title: 'GAT Exams'},
    ];


    itemsPerPage = [20, 50, 100];
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
        public shareddataService: ShareddataService,
    ) {
        const selectedMenuIndex = this.cookieService.get(EnumService.cookieNames.DASHBOARD_SELECTED_MENU_INDEX) || 0;
        const selectedSubMenuIndex = this.cookieService.get(EnumService.cookieNames.DASHBOARD_SELECTED_SUBMENU_INDEX) || 0;

        this.selectedMenu = this.menuItems[selectedMenuIndex].submenus[selectedSubMenuIndex];
        this.selectedExam = this.filterExamList[0];
        this.selectedTime = this.filterTimesList[0];
    }

    ngOnInit(): void {
        this.setupUserHistory();
        this.getUserHistory();
        this.getExams();
    }

    getExams(): void {
        this.apiService.examSearch({}).subscribe((res) => {
            const exams = res.exams;
            if (exams) {
                localStorage.setItem(EnumService.localStorageKeys.ALL_EXAMS, JSON.stringify(exams));
            }
        }, (error) => {
        });
    }

    setupUserHistory = () => {
        const storedUserHistory = localStorage.getItem(EnumService.localStorageKeys.USER_HISTORY);
        if (storedUserHistory) {
            const userHistory = JSON.parse(storedUserHistory);
            const myHistories = {};
            Object.keys(userHistory).map((historyType) => {
                const list = userHistory[historyType];
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
            this.examHistoryPagination = {
                pageIndex: 0,
                pageSize: this.itemsPerPage[0],
                length: this.myHistories[this.selectedMenu.apiDataKey].length,
                previousPageIndex: -1
            };
        }
    };

    getUserHistory(): void {
        this.apiService.userHistory({courseLanguageId: 1, userId: this.accountService.userValue.id}).subscribe((data) => {
            localStorage.setItem(EnumService.localStorageKeys.USER_HISTORY, JSON.stringify(data));
            this.setupUserHistory();

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


    onItemSelect(item, menuIndex, submenuIndex): void {
        this.selectedMenu = item;
        this.cookieService.set(EnumService.cookieNames.DASHBOARD_SELECTED_MENU_INDEX, menuIndex);
        this.cookieService.set(EnumService.cookieNames.DASHBOARD_SELECTED_SUBMENU_INDEX, submenuIndex);
    }

    pageChange(event): void {
        this.examHistoryPagination = event;
    }

    getExamHistoryData(): any {
        const list = this.myHistories[this.selectedMenu.apiDataKey];
        let timeFilteredList;
        let fromDate;
        let toDate;
        let specificDate;

        switch (this.selectedTime.value) {
            case 'all':
                break;
            case 'yesterday':
                specificDate = moment().subtract(1, 'days');
                break;
            case 'last_week':
                fromDate = moment().subtract(1, 'weeks').startOf('isoWeek');
                toDate = moment().subtract(1, 'weeks').endOf('isoWeek');
                break;
            case 'this_month':
                fromDate = moment().startOf('month');
                toDate = moment();
                break;
            case 'last_month':
                fromDate = moment().subtract(1, 'months').startOf('month');
                toDate = moment().subtract(1, 'months').endOf('month');
                break;

            default:
                specificDate = moment(this.selectedTime.value);
                break;
        }
        if (fromDate || toDate || specificDate) {
            timeFilteredList = [];
            list.map((item) => {
                const itemDate = moment(item.completedOn);
                if (fromDate && toDate) {
                    if (itemDate.isBetween(fromDate, toDate, 'day', '[]')) {
                        timeFilteredList.push(item);
                    }
                } else if (specificDate) {
                    if (itemDate.isSame(specificDate, 'day')) {
                        timeFilteredList.push(item);
                    }
                }
            });
        } else {
            timeFilteredList = list;
        }

        // const length = this.examHistoryPagination.length;
        const pageSize = this.examHistoryPagination.pageSize;
        const pageIndex = this.examHistoryPagination.pageIndex;
        const resultList = timeFilteredList.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);
        return resultList;
    }

    startExam(item): void {
        const examType = item.type;
        const examId = item.id;
        const practiceTestRouteConfig = examType + '/:id';
        const practiceTestRoute = examType + '/' + examId;
        this.shareddataService.addDynamicRoute(practiceTestRouteConfig, PracticeTestsComponent, true);

        if (this.selectedMenu.type === 'exam') {
            this.shareddataService.startLoading();
            this.apiService.initExamSession({
                userId: this.accountService.userValue.id,
                examId
            }).subscribe((data) => {
                this.shareddataService.stopLoading();
                localStorage.setItem(EnumService.localStorageKeys.CURRENT_EXAM_SESSION, JSON.stringify(item));
                if (data.isSuccess) {
                    this.router.navigate([practiceTestRoute]);
                } else {
                    this.router.navigate([practiceTestRoute]);
                }
            }, (error) => {
                this.shareddataService.stopLoading();
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

    datePickerEvent(type: string, event): void {
        const eventC: MatDatepickerInputEvent<Date> = event;
        console.log(`${type}: ${eventC.value}`);
        this.selectedTime = {title: moment(eventC.value).format('DD/MM/YYYY'), value: eventC.value};
    }

}
