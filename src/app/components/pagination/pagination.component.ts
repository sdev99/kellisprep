import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() currentIndex: number;
  @Input() totalPages: number;
  pages = [];

  constructor() {
  }

  ngOnInit(): void {
    this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
  }

}
