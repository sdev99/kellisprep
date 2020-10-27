import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EnumService} from '../../services/enum.service';
import {AccountService} from '../../services/account.service';
import {AlertService} from '../../services/alert.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  isEmailSent = false;
  emailSentMessage = '';
  languageId = 1;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private alertService: AlertService,
    public dialog: MatDialog
  ) {
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.forgotpassword(this.languageId, this.f.email.value)
      // .pipe(first())
      .subscribe({
        next: (data: any) => {
          this.loading = false;

          if (data.isSuccess) {
            this.isEmailSent = true;
            this.emailSentMessage = 'We\'ve sent you a message at: ' + this.f.email.value + ' Follow the link in that message to reset your\n' +
              '          password.';
          } else {
            this.closeDialog();
            let error = 'Cannot reset password';
            if (data.messages) {
              error = data.messages.join(' ');
            }
            this.alertService.error(error);
          }
        },
        error: error => {
          this.closeDialog();
          this.loading = false;
          this.alertService.error(error.statusText);
        }
      });
  }

  closeDialog = () => {
    this.isEmailSent = false;
    this.submitted = false;
    const forgotpasswordDialog = this.dialog.getDialogById('forgotpassword');
    forgotpasswordDialog.close();
  };

}
