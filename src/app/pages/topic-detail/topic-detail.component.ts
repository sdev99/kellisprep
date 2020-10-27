import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.scss']
})
export class TopicDetailComponent implements OnInit {

  topics = [
    {
      title: 'Thinking like a historian',
      learnList: [
        {title: 'Thinking like a historian', duration: 600, readDuration: 500},
        {title: 'How to read a document: source identification', duration: 600, readDuration: 400},
        {title: 'How to read a document: Analyzing a historical text', duration: 600, readDuration: 350},
        {title: 'Avoiding common mistakes in historical essays', duration: 600, readDuration: 200},
      ]
    },
    {
      title: 'Spanish colonization',
      learnList: [
        {title: 'Spanish Colonization', duration: 600, readDuration: 500},
        {title: 'The Spanish conquistadores and colonial empire.', duration: 600, readDuration: 400},
        {title: 'Pueblo uprising of 1680', duration: 600, readDuration: 0},
        {title: 'Comparing European and Native American Cultures', duration: 600, readDuration: 0},
      ],
      practiceList: [
        {title: 'Comparing European and Native American Cultures', decription: 'Get 5 of 7 questions to level up!', practice: false},
        {title: 'Labor, Slavery and caste in the Spanish colonel system', decription: 'Get 5 of 7 questions to level up!', practice: true},
      ]
    },
    {
      title: 'Before contact',
      learnList: [
        {title: 'Before contact', duration: 600, readDuration: 500},
        {title: 'The Spanish conquistadores and colonial empire..', duration: 600, readDuration: 400},
      ],
      practiceList: [
        {title: 'Before contact', decription: 'Get 5 of 7 questions to level up!', practice: false},
        {title: 'Before contact level 2', decription: 'Get 5 of 7 questions to level up!', practice: true},
      ]
    },
    {
      title: 'Old and new worlds collide',
      learnList: [
        {title: 'Old and new worlds collide', duration: 600, readDuration: 500},
        {title: 'How to read a document: source identification', duration: 600, readDuration: 400},
      ],
    }
  ];

  categoryDetail;
  topicDetail;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params && params.category) {
        this.categoryDetail = JSON.parse(params.category);
      }
      if (params && params.topic) {
        this.topicDetail = JSON.parse(params.topic);
      }
    });

  }

  calculatePercent(item): number {
    if (item.duration > 0) {
      const percent = (item.readDuration / item.duration) * 100;
      return percent;
    }
    return 0;
  }

  ngOnInit(): void {
  }

  onTopicItem(item): void {

  }

  openLearnDetail(item): void {
    this.router.navigate(['learn-view'], {
      queryParams: {
        learnInfo: JSON.stringify(item),
        category: JSON.stringify(this.categoryDetail),
        topic: JSON.stringify(this.topicDetail),
      }
    });
  }

  startPractice(item): void {
    this.router.navigate(['practice-view'], {
      queryParams: {
        learnInfo: JSON.stringify(item),
        category: JSON.stringify(this.categoryDetail),
        topic: JSON.stringify(this.topicDetail),
      }
    });
  }

}
