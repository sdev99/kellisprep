import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-confirm-pay',
  templateUrl: './confirm-pay.component.html',
  styleUrls: ['./confirm-pay.component.scss']
})
export class ConfirmPayComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  paymentMethod = 'card';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private location: Location,
    private accountService: AccountService,
  ) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      nameOnCard: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvvCode: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f(): any {
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

    setTimeout(() => {
      this.location.back();
    }, 1000);
  }

  onLeavePage(): void {
    this.location.back();
  }


  onProceed(): void {

  }

}
