import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-answer-choice-item',
    templateUrl: './answer-choice-item.component.html',
    styleUrls: ['./answer-choice-item.component.scss']
})
export class AnswerChoiceItemComponent implements OnInit {
    @Input() selected: string;
    @Input() index: number;
    @Input() title: string;
    questionIndex;

    constructor() {

    }

    ngOnInit(): void {
      this.questionIndex = String.fromCharCode(65 + this.index);
    }

}
