import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-answer-multiple-choice-item',
  templateUrl: './answer-multiple-choice-item.component.html',
  styleUrls: ['./answer-multiple-choice-item.component.scss']
})
export class AnswerMultipleChoiceItemComponent implements OnInit {
  environment = environment;

  @Input() selected: boolean;
  @Input() title: string;
  @Input() imageUri: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
