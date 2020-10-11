import {Component, OnInit} from '@angular/core';
import {EnumService} from '../../../services/enum.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../../services/account.service';
import {AlertService} from '../../../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  roles = EnumService.userRoles;

  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
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
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: [4, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
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
    this.accountService.resgiter({
      firstname: this.f.firstname.value,
      lastname: this.f.lastname.value,
      username: this.f.username.value,
      eMail: this.f.email.value,
      password: this.f.password.value,
      roleId: this.f.role.value,
      googleId: '',
      facebookId: '',
    })
      // .pipe(first())
      .subscribe({
        next: (data: any) => {
          this.loading = false;

          if (data.isSuccess) {
            this.alertService.success('Signup successfully');
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);
          } else {
            let error = 'Cannot register';
            if (data.messages) {
              error = data.messages.join(' ');
            }
            this.alertService.error(error);
          }
        },
        error: error => {
          this.alertService.error(error.statusText);
          this.loading = false;
        }
      });
  }

}
