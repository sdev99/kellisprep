import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.scss']
})
export class PrivacypolicyComponent implements OnInit {
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
