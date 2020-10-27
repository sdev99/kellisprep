import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-learn-view',
  templateUrl: './learn-view.component.html',
  styleUrls: ['./learn-view.component.scss']
})
export class LearnViewComponent implements OnInit {

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
