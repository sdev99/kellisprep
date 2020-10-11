import {Component, OnInit} from '@angular/core';
import {ForgotpasswordComponent} from '../../../modals/forgotpassword/forgotpassword.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogPosition} from '@angular/material/dialog/dialog-config';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../../services/account.service';
import {first} from 'rxjs/operators';
import {AlertService} from '../../../services/alert.service';
import {EnumService} from '../../../services/enum.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.accountService.userValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['sukhdev.patidar99@gmail.com', Validators.required],
      password: ['12345678', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  openDialog() {

    const dialogRef = this.dialog.open(ForgotpasswordComponent, {
      id: 'forgotpassword',
      disableClose: true,
      role: 'dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.login(this.f.email.value, this.f.password.value)
      // .pipe(first())
      .subscribe({
        next: (data: any) => {
          this.loading = false;

          if (data.isSuccess) {
            this.alertService.success('Login success');
            const returnUrl = this.route.snapshot.queryParams.returnUrl || '/dashboard';

            setTimeout(() => {
              this.router.navigate([returnUrl]);
            }, 1000);
          } else {
            this.alertService.error(data.message);
          }
        },
        error: error => {
          this.loading = false;
          this.alertService.error(error.statusText);
        }
      });
  }
}
