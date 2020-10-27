import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-practice-view',
  templateUrl: './practice-view.component.html',
  styleUrls: ['./practice-view.component.scss']
})
export class PracticeViewComponent implements OnInit {

  questions: any = [
    {
      title: 'Which of the following statements is the best definition of Big History?',
      questionType: 'singlechoice',
      descriptionType: 'text',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel tristique urna. Aliquam bibendum fringilla\n' +
        '          nulla at ultrices. Etiam bibendum mi sed enim ultricies, et varius quam pellentesque. Proin lobortis dolor\n' +
        '          mauris,\n' +
        '          id posuere nunc semper pharetra. Phasellus et lobortis lorem. Phasellus sed pharetra odio. Interdum et\n' +
        '          malesuada\n' +
        '          fames ac ante ipsum primis in faucibus. Aenean fermentum, urna sit amet interdum pharetra, mi arcu hendrerit\n' +
        '          risus, at rutrum tortor neque sit amet ipsum.\n' +
        '          <br/>\n' +
        '          <br/>\n' +
        '          Duis commodo dolor dolor, vel ornare elit ornare sed. Ut non\n' +
        '          pulvinar libero. Sed porta eu tortor interdum suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing\n' +
        '          elit.\n' +
        '          Nullam dui turpis, facilisis et quam eu, ultrices auctor neque. Donec pretium sapien non eleifend consectetur.\n' +
        '          Nullam ligula ante, suscipit vel ex sit amet, semper feugiat arcu. Fusce vehicula leo placerat venenatis\n' +
        '          fermentum.\n' +
        '          <br/>\n' +
        '          <br/>\n' +
        '          Nullam eu eros tincidunt, aliquet felis ac, efficitur dolor. Sed malesuada nisi id neque fermentum, vel\n' +
        '          consequat leo ornare. Duis a turpis pulvinar, auctor turpis vel, facilisis velit. Cras fermentum quis felis in\n' +
        '          posuere. Proin in dictum nisi, vel luctus erat. Integer in libero est. Mauris aliquet libero in mauris\n' +
        '          porttitor,\n' +
        '          a tempor lacus lacinia.Duis commodo dolor dolor, vel ornare elit ornare sed. Ut non pulvinar libero. Sed\n' +
        '          porta\n' +
        '          eu tortor interdum suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n' +
        '          <br/>\n' +
        '          <br/>\n' +
        '          Nullam dui turpis, facilisis\n' +
        '          et quam eu, ultrices auctor neque. Donec pretium sapien non eleifend consectetur. Nullam ligula ante, suscipit\n' +
        '          vel\n' +
        '          ex sit amet, semper feugiat arcu. Fusce vehicula leo placerat venenatis fermentum. Nullam eu eros tincidunt,\n' +
        '          aliquet felis ac, efficitur dolor. Sed malesuada nisi id neque fermentum, vel consequat leo ornare. Duis a\n' +
        '          turpis\n' +
        '          pulvinar, auctor turpis vel, facilisis velit. Cras fermentum quis felis in posuere.\n' +
        '          <br/>\n' +
        '          <br/>\n' +
        '          Proin in dictum nisi, vel\n' +
        '          luctus erat. Integer in libero est. Mauris aliquet libero in mauris porttitor, a tempor lacus lacinia.',
      answers: [
        {index: 'A', title: 'How was the Universe created?'},
        {index: 'B', title: 'Why are stars so big and humans so small?'},
        {index: 'C', title: 'Why are humans so insignificant?'},
        {index: 'D', title: 'What does it mean to be human?'},
      ]
    },
    {
      title: 'Which of the following statements is the best definition of Big History?',
      questionType: 'singlechoice',
      answers: [
        {index: 'A', title: 'How was the Universe created?'},
        {index: 'B', title: 'Why are stars so big and humans so small?'},
        {index: 'C', title: 'Why are humans so insignificant?'},
        {index: 'D', title: 'What does it mean to be human?'},
      ],
      descriptionType: 'video',
      description: 'https://www.youtube.com/embed/5Peo-ivmupE',
    },
    {
      title: 'Big History weaves expert thinking about the Universe into a coherent story and looks at the entire span of history at different scales. It’s a modern, scientific version of an origin story.',
      questionType: 'multilinetext',
      answer: ''
    },

    {
      title: 'Big History weaves expert thinking about the Universe into a coherent story and looks at the entire span of history at different scales. It’s a modern, scientific version of an origin story. Big History weaves expert thinking about the Universe into a coherent story and looks at the entire span of history at different scales. It’s a modern, scientific version of an origin story.',
      questionType: 'audio',
      answer: ''
    },
  ];

  currentIndex = 0;
  maxMessageLength = 250;
  submitted = false;

  constructor(
    private location: Location,
  ) {
  }

  ngOnInit(): void {
  }

  onBack(): void {
    this.location.back();
  }

  onNext(): void {
    if (this.currentIndex < (this.questions.length - 1)) {
      this.currentIndex++;
    } else {
      this.onBack();
    }
  }

}
