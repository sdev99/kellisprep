import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-practice-tests',
  templateUrl: './practice-tests.component.html',
  styleUrls: ['./practice-tests.component.scss']
})
export class PracticeTestsComponent implements OnInit {


  practiceList = [
    {title: 'Reading Section', decription: 'Short detail about reading section in which you have to tell about what is reading section'},
    {title: 'Writing Section', decription: 'Short detail about witting section in which you have to tell about what is witting section'},
    {title: 'Math Section', decription: 'Short detail about Math Section in which you have to tell about what is Math Section'},
  ];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParams.subscribe((params) => {

    });

  }


  ngOnInit(): void {
  }

  onTopicItem(item): void {

  }


  startPractice(item): void {
    this.router.navigate(['test-direction'], {
      queryParams: {
        data: JSON.stringify(item)
      }
    });
  }

}
