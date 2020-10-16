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
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ForgotpasswordComponent} from './modals/forgotpassword/forgotpassword.component';
import {MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
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
    PipesModule
  ],
  providers: [{provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
