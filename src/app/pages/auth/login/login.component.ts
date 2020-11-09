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
import {SocialAuthService} from 'angularx-social-login';
import {FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginLoading = false;
  facebookLoading = false;
  googleLoading = false;
  submitted = false;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private authService: SocialAuthService
  ) {
    // redirect to home if already logged in
    if (this.accountService.userValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      // email: ['sukhdev.patidar99@gmail.com', Validators.required],
      // password: ['12345678', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.form.controls;
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(ForgotpasswordComponent, {
      id: 'forgotpassword',
      disableClose: true,
      role: 'dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  signInWithGoogle(): void {
    this.alertService.clear();
    this.googleLoading = true;

    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res) => {
      // authToken: "ya29.A0AfH6SMBPjpYO2N20nzaZkMJjxa9bMUrhlCyCTRQABd_tnKAHHflXasiNqf0sBkQM8a_0vkwrb90c3T5rpecd9YfD4Ns3hmuUBjeDxipToHwNjivFJpHhNPQ4NtWPPu4Is4w0AIDMz4nU8R-pWk9S2iKAtVbRlTDcCphPOa0s8FM"
      // email: "sukhdev.patidar99@gmail.com"
      // firstName: "Sukhdev"
      // id: "108193064198858490079"
      // idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImYwOTJiNjEyZTliNjQ0N2RlYjEwNjg1YmI4ZmZhOGFlNjJmNmFhOTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjgyMDc5OTM4NzE5LWJsaG9qaXUxZzRzamozdTJyY3BsM2J0Nm12bzQ2N200LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjgyMDc5OTM4NzE5LWJsaG9qaXUxZzRzamozdTJyY3BsM2J0Nm12bzQ2N200LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA4MTkzMDY0MTk4ODU4NDkwMDc5IiwiZW1haWwiOiJzdWtoZGV2LnBhdGlkYXI5OUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IlVadFRRLVR0c2ZVYVVadlRyWnMzV3ciLCJuYW1lIjoiU3VraGRldiBQYXRpZGFyIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdnYUo2dHN6UmQ5Y1lGbEQ2eVF6UmxOSDdQOUhJN2szZHZ5bGpYMW1RPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlN1a2hkZXYiLCJmYW1pbHlfbmFtZSI6IlBhdGlkYXIiLCJsb2NhbGUiOiJlbi1HQiIsImlhdCI6MTYwNDUwOTQ4NSwiZXhwIjoxNjA0NTEzMDg1LCJqdGkiOiJjMTkyNTMzOTAyZjY0OTdlYjhhZTI5Yzk3ZmE4ZTQxZWNiMjE1NDAxIn0.1gJCeXr5F2SZRZA2MQfIjFhXQjP_6bqhlUYxkQ9BkifB2jF2gcJoD7gozRiDL9iO2e1JaMCNY0Q0LGg5eD-bQDzdxGt4m5HSI-_-OyX--HKQOWB4_odXecszfX-lkIyFuasiIqcrHD2Z4aoBtaufOhJdvStcCrQmsmdxUyuLHXnupZThanXg2Drc2OxlKIfZcShgeFA4PIXEAaCIq_147YERMYsrG1x5MPrI_vvRlaw1NDRx-CW65APGUI83Q2jbelwI8qcAdkq1dTi6gjAS7HmoI2F8AGFwTsh5qDd8srr_gT43ZAwZ6UUdqT1VhZy0701b_1yIjiiVcjUKXBcs6Q"
      // lastName: "Patidar"
      // name: "Sukhdev Patidar"
      // photoUrl: "https://lh3.googleusercontent.com/a-/AOh14GgaJ6tszRd9cYFlD6yQzRlNH7P9HI7k3dvyljX1mQ=s96-c"
      // provider: "GOOGLE"

      this.accountService.googleLogin(res.id)
        // .pipe(first())
        .subscribe({
          next: (data: any) => {
            this.googleLoading = false;

            if (data.isSuccess) {
              this.alertService.success('Login success');
              const returnUrl = this.route.snapshot.queryParams.returnUrl || '/dashboard';

              setTimeout(() => {
                this.router.navigate([returnUrl]);
              }, 1000);
            } else {
              this.signUpWithGoogle(res);
            }
          },
          error: error => {
            this.googleLoading = false;
            this.signUpWithGoogle(res);
          }
        });

    }).catch((error) => {
      this.googleLoading = false;
    });
  }

  signInWithFB(): void {
    this.alertService.clear();
    this.facebookLoading = true;

    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res) => {
      debugger;
      // authToken: "EAALjhn5rDVgBAMRRW5qPbWfAKR3QgG5zB65TDgXNreLwkcEZAZCw3sIiOZAZBIqeeVZBPZAMMzbLlIAzUDCk8ZBnpUSeR8aQ7ZAcDmTOKZAwDuDzQOSDAAZCZAdTxecwWj8vq39iCpRWBP0j0eRtPml5xD1ERDtJJvWiFlBoNsapAaOo8oOXbwLgQgIVvWZBrUwXZCk6yFZCDKHWegBAZDZD"
      // email: "sukhdev.patidar99@gmail.com"
      // firstName: "Sukhdev"
      // id: "4630842856988607"
      // lastName: "Patidar"
      // name: "Sukhdev Patidar"
      // photoUrl: "https://graph.facebook.com/4630842856988607/picture?type=normal"
      // provider: "FACEBOOK"

      this.accountService.facebookLogin(res.id)
        // .pipe(first())
        .subscribe({
          next: (data: any) => {
            this.facebookLoading = false;

            if (data.isSuccess) {
              this.alertService.success('Login success');
              const returnUrl = this.route.snapshot.queryParams.returnUrl || '/dashboard';

              setTimeout(() => {
                this.router.navigate([returnUrl]);
              }, 1000);
            } else {
              this.signUpWithFB(res);
            }
          },
          error: error => {
            this.facebookLoading = false;
            this.signUpWithFB(res);
          }
        });

    }).catch((error) => {
      this.facebookLoading = false;
    });
  }


  signUpWithFB(socialUser): void {
    this.alertService.clear();
    this.facebookLoading = true;

    this.accountService.facebookRegister({
      facebookId: socialUser.id,
      firstname: socialUser.firstName,
      lastname: socialUser.lastName,
      eMail: socialUser.email,
      username: socialUser.name,
      roleId: EnumService.userRoles.Student,
    })
      // .pipe(first())
      .subscribe({
        next: (data: any) => {
          this.facebookLoading = false;

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
          this.facebookLoading = false;
          this.alertService.error(error.statusText);
        }
      });
  }

  signUpWithGoogle(socialUser): void {
    this.alertService.clear();
    this.googleLoading = true;

    this.accountService.googleRegister({
      googleId: socialUser.id,
      firstname: socialUser.firstName,
      lastname: socialUser.lastName,
      username: socialUser.name,
      roleId: EnumService.userRoles.Student,
    })
      // .pipe(first())
      .subscribe({
        next: (data: any) => {
          this.googleLoading = false;

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
          this.googleLoading = false;
          this.alertService.error(error.statusText);
        }
      });
  }

  onSubmit(): void {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loginLoading = true;
    this.accountService.login(this.f.email.value, this.f.password.value)
      // .pipe(first())
      .subscribe({
        next: (data: any) => {
          this.loginLoading = false;

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
          this.loginLoading = false;
          this.alertService.error(error.statusText);
        }
      });
  }
}
