import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-termsofservice',
  templateUrl: './termsofservice.component.html',
  styleUrls: ['./termsofservice.component.scss']
})
export class TermsofserviceComponent implements OnInit {

  constructor(
    private location: Location,
  ) {
  }

  ngOnInit(): void {
  }

  onBack(): void {
    this.location.back();
  }

}
