import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-exams-dropview',
  templateUrl: './exams-dropview.component.html',
  styleUrls: ['./exams-dropview.component.scss']
})
export class ExamsDropviewComponent implements OnInit {
  @Output() dismiss = new EventEmitter<void>();

  examPlans = ['Free Exams', 'Paid Exams'];
  examTypes = [
    {
      type: 'SAT Exams',
      list: [
        {title: 'Exam name 1'},
        {title: 'Exam name 2'},
        {title: 'Exam name 3'},
        {title: 'Exam name 4'},
        {title: 'Exam name 5'},
        {title: 'Exam name 6'},
        {title: 'Exam name 7'},
        {title: 'Exam name 8'},
        {title: 'Exam name 9'},
        {title: 'Exam name 10'},
      ]
    },
    {
      type: 'TOEFL Exams',
      list: [
        {title: 'Exam name 1'},
        {title: 'Exam name 2'},
        {title: 'Exam name 3'},
        {title: 'Exam name 4'},
        {title: 'Exam name 5'},
        {title: 'Exam name 6'},
        {title: 'Exam name 7'},
        {title: 'Exam name 8'},
        {title: 'Exam name 9'},
        {title: 'Exam name 10'},
      ]
    }
  ];


  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  onExamSelect(exam): void {
    this.dismiss.emit();
    this.router.navigate(['select-exam-course'], {
      queryParams: {
        selectionType: 'exam'
      }
    });
  }
}
