import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-answer-multiple-choice-item',
  templateUrl: './answer-multiple-choice-item.component.html',
  styleUrls: ['./answer-multiple-choice-item.component.scss']
})
export class AnswerMultipleChoiceItemComponent implements OnInit {

  @Input() selected: boolean;
  @Input() title: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
