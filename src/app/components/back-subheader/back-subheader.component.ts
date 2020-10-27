import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-back-subheader',
  templateUrl: './back-subheader.component.html',
  styleUrls: ['./back-subheader.component.scss']
})
export class BackSubheaderComponent implements OnInit {
  @Input() title: string;
  @Output() back = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onBack(): void {
    this.back.emit();
  }

}
