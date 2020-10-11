import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './pages/auth/login/login.component';
import {RegisterComponent} from './pages/auth/register/register.component';
import {HomeComponent} from './pages/auth/home/home.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AuthGuard} from './helpers/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'}, // redirect to `first-component`
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
