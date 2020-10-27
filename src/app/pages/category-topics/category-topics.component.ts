import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-category-topics',
  templateUrl: './category-topics.component.html',
  styleUrls: ['./category-topics.component.scss']
})
export class CategoryTopicsComponent implements OnInit {

  courses = [
    {
      title: 'Counting',
      icon: 'math-icon-1.png',
      list: [
        {title: 'Counting', value: 'Counting 0 to 12'},
        {title: 'Comparing small numbers', value: 'counting objects'},
      ]
    },
    {
      title: 'Addition and Subtraction within 20',
      icon: 'math-icon-2.png',
      list: [
        {title: 'What is addition? what is subtraction', value: 'Put together, take apart'},
        {title: 'Making small numbers', value: 'Relate addition and subtraction'},
      ]
    },
    {
      title: 'Place and value (tens and hundreds)',
      icon: 'math-icon-3.png',
      list: [
        {title: 'Tens', value: 'Hundreds'},
        {title: 'Comparing three number digits', value: 'Equal sign'},
      ]
    },
    {
      title: 'Measurement, data and geometry',
      icon: 'math-icon-4.png',
      list: [
        {title: 'Length and size', value: 'Picture graphs'}]
    }
  ];

  categoryDetail;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params && params.category) {
        this.categoryDetail = JSON.parse(params.category);
      }
    });

  }

  ngOnInit(): void {
  }


  onTopicSelect(item): void {
    this.router.navigate(['topic-detail'], {
      queryParams: {
        topic: JSON.stringify(item),
        category: JSON.stringify(this.categoryDetail),
      }
    });
  }


}
