import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../services/account.service';
import {AlertService} from '../../services/alert.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  isEmailSent = false;
  emailSentMessage = '';
  languageId = 1;
  maxMessageLength = 1000;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private alertService: AlertService,
    public dialog: MatDialog
  ) {
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', [
        Validators.required,
        Validators.maxLength(this.maxMessageLength)
      ]],
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
    this.accountService.contactusSubmit({
      languageId: this.accountService.userValue ? this.accountService.userValue.languageId : 1,
      // dateOfBirth: '',
      firstName: this.f.firstname.value,
      lastName: this.f.lastname.value,
      email: this.f.email.value,
      // phoneNo: '',
      message: this.f.message.value,
    })
      // .pipe(first())
      .subscribe({
        next: (data: any) => {
          this.loading = false;
          this.closeDialog();

          if (data.isSuccess) {
            this.alertService.success('Comment submitted successfully');
          } else {
            let error = 'Cannot send comment';
            if (data.messages) {
              error = data.messages.join(' ');
            }
            this.alertService.error(error);
          }
        },
        error: error => {
          this.closeDialog();
          this.loading = false;
          this.alertService.error(error.message);
        }
      });
  }

  closeDialog = () => {
    this.isEmailSent = false;
    this.submitted = false;
    const forgotpasswordDialog = this.dialog.getDialogById('contactusmodal');
    forgotpasswordDialog.close();
  };
}
