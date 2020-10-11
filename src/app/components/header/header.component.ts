import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {User} from '../../_models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  isLoggedIn = false;

  constructor(
    private accountService: AccountService
  ) {
    this.user = accountService.userValue;
    this.accountService.user.subscribe(user => {
      this.user = user;
      this.isLoggedIn = (user && user.token) ? true : false;
    });
  }

  ngOnInit(): void {
  }


  logout() {
    this.accountService.logout();
  }
}
