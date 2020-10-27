import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-answer-choice-item',
  templateUrl: './answer-choice-item.component.html',
  styleUrls: ['./answer-choice-item.component.scss']
})
export class AnswerChoiceItemComponent implements OnInit {
  @Input() selected: string;
  @Input() index: string;
  @Input() title: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
