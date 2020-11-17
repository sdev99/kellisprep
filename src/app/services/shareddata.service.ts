import {Injectable} from '@angular/core';
import {PracticeTestsComponent} from '../pages/practice-tests/practice-tests.component';
import {AuthGuard} from '../helpers/auth.guard';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShareddataService {

  allExamsList;
  freeExams;
  paidExams;

  constructor(
    private router: Router,
  ) {
  }

  addDynamicRoute(dynamicPath, component, canActivateAuth = false): void {
    const appRoutes = [...this.router.config];
    let alreadyAdded = false;
    appRoutes.map((route) => {
      if (route.path === dynamicPath) {
        alreadyAdded = true;
      }
    });
    const canActivate = [];
    if (canActivateAuth) {
      canActivate.push(AuthGuard);
    }
    if (!alreadyAdded) {
      const route = {path: dynamicPath, component, canActivate};
      appRoutes.push(route);
      this.router.resetConfig(appRoutes);
    }
  }
}
