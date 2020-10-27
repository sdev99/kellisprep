import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './pages/auth/login/login.component';
import {RegisterComponent} from './pages/auth/register/register.component';
import {HomeComponent} from './pages/auth/home/home.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AuthGuard} from './helpers/auth.guard';
import {CategoryTopicsComponent} from './pages/category-topics/category-topics.component';
import {TopicDetailComponent} from './pages/topic-detail/topic-detail.component';
import {SelectExamCourseComponent} from './pages/select-exam-course/select-exam-course.component';
import {ConfirmPayComponent} from './pages/confirm-pay/confirm-pay.component';
import {LearnViewComponent} from './pages/learn-view/learn-view.component';
import {PracticeViewComponent} from './pages/practice-view/practice-view.component';
import {PracticeTestsComponent} from './pages/practice-tests/practice-tests.component';
import {TestDirectionComponent} from './pages/test-direction/test-direction.component';
import {SectionDirectionComponent} from './pages/section-direction/section-direction.component';
import {WritingSectionComponent} from './pages/writing-section/writing-section.component';
import {PrivacypolicyComponent} from './pages/privacypolicy/privacypolicy.component';
import {TermsofserviceComponent} from './pages/termsofservice/termsofservice.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'}, // redirect to `first-component`
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'privacypolicy', component: PrivacypolicyComponent},
  {path: 'termsofservice', component: TermsofserviceComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'category-topics', component: CategoryTopicsComponent, canActivate: [AuthGuard]},
  {path: 'topic-detail', component: TopicDetailComponent, canActivate: [AuthGuard]},
  {path: 'select-exam-course', component: SelectExamCourseComponent, canActivate: [AuthGuard]},
  {path: 'confirm-pay', component: ConfirmPayComponent, canActivate: [AuthGuard]},
  {path: 'learn-view', component: LearnViewComponent, canActivate: [AuthGuard]},
  {path: 'practice-view', component: PracticeViewComponent, canActivate: [AuthGuard]},
  {path: 'practice-tests', component: PracticeTestsComponent, canActivate: [AuthGuard]},
  {path: 'test-direction', component: TestDirectionComponent, canActivate: [AuthGuard]},
  {path: 'section-direction', component: SectionDirectionComponent, canActivate: [AuthGuard]},
  {path: 'writing-section', component: WritingSectionComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
