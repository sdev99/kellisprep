import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/auth/home/home.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {RegisterComponent} from './pages/auth/register/register.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {NgbAccordion, NgbAccordionModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ForgotpasswordComponent} from './modals/forgotpassword/forgotpassword.component';
import {MatDialogModule} from '@angular/material/dialog';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AlertComponent} from './components/alert/alert.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {ExamsDropviewComponent} from './modals/exams-dropview/exams-dropview.component';
import {MatTabsModule} from '@angular/material/tabs';
import {CoursesDropviewComponent} from './modals/courses-dropview/courses-dropview.component';
import {ContactUsComponent} from './modals/contact-us/contact-us.component';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {PipesModule} from './pipes/pipes.module';
import {MatPaginatorIntlCro} from './classes/mat-paginator-intl-cro';
import {CategoryTopicsComponent} from './pages/category-topics/category-topics.component';
import {TopicDetailComponent} from './pages/topic-detail/topic-detail.component';
import {VideoDurationIndicatorComponent} from './components/video-duration-indicator/video-duration-indicator.component';
import {SelectExamCourseComponent} from './pages/select-exam-course/select-exam-course.component';
import {PagePathTreeComponent} from './components/page-path-tree/page-path-tree.component';
import {IonicModule} from '@ionic/angular';
import {ConfirmPayComponent} from './pages/confirm-pay/confirm-pay.component';
import {LearnViewComponent} from './pages/learn-view/learn-view.component';
import {BackSubheaderComponent} from './components/back-subheader/back-subheader.component';
import {PracticeViewComponent} from './pages/practice-view/practice-view.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {PracticeTestsComponent} from './pages/practice-tests/practice-tests.component';
import {TestDirectionComponent} from './pages/test-direction/test-direction.component';
import {SectionDirectionComponent} from './pages/section-direction/section-direction.component';
import {WritingSectionComponent} from './pages/writing-section/writing-section.component';
import {AnswerChoiceItemComponent} from './components/answer-choice-item/answer-choice-item.component';
import {ConfirmModalComponent} from './modals/confirm-modal/confirm-modal.component';
import {TermsofserviceComponent} from './pages/termsofservice/termsofservice.component';
import {PrivacypolicyComponent} from './pages/privacypolicy/privacypolicy.component';
import {PersonalizeExamcourseComponent} from './modals/personalize-examcourse/personalize-examcourse.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {AnswerMultipleChoiceItemComponent} from './components/answer-multiple-choice-item/answer-multiple-choice-item.component';
import {ErrorInterceptor} from './helpers/error.interceptor';
import {SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import {NgxLoadingModule} from 'ngx-loading';
import {CookieService} from 'ngx-cookie-service';

import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
import {ReadingSectionComponent} from './pages/reading-section/reading-section.component';
import {MathSectionComponent} from './pages/math-section/math-section.component';
import {ListeningSpeakingSectionComponent} from './pages/listening-speaking-section/listening-speaking-section.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    ForgotpasswordComponent,
    DashboardComponent,
    AlertComponent,
    ExamsDropviewComponent,
    CoursesDropviewComponent,
    ContactUsComponent,
    CategoryTopicsComponent,
    TopicDetailComponent,
    VideoDurationIndicatorComponent,
    SelectExamCourseComponent,
    PagePathTreeComponent,
    ConfirmPayComponent,
    LearnViewComponent,
    BackSubheaderComponent,
    PracticeViewComponent,
    PaginationComponent,
    PracticeTestsComponent,
    TestDirectionComponent,
    SectionDirectionComponent,
    WritingSectionComponent,
    AnswerChoiceItemComponent,
    ConfirmModalComponent,
    TermsofserviceComponent,
    PrivacypolicyComponent,
    PersonalizeExamcourseComponent,
    AnswerMultipleChoiceItemComponent,
    ReadingSectionComponent,
    MathSectionComponent,
    ListeningSpeakingSectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    NgbModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    MatSidenavModule,
    MatSelectModule,
    FormsModule,
    MatTabsModule,
    MatPaginatorModule,
    PipesModule,
    IonicModule.forRoot(),
    MatRippleModule,
    MatCheckboxModule,
    MatTableModule,
    SocialLoginModule,
    NgxLoadingModule.forRoot({}),
    DragDropModule,
    NgbModule,
    NgbAccordionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '282079938719-blhojiu1g4sjj3u2rcpl3bt6mvo467m4.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('813116739489112'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
