import {Component, Input, OnInit, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-video-duration-indicator',
  templateUrl: './video-duration-indicator.component.html',
  styleUrls: ['./video-duration-indicator.component.scss']
})
export class VideoDurationIndicatorComponent implements OnInit {
  @Input() percent = 0;
  @ViewChild('circle', {read: ElementRef}) circle: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
    const arcLengthPercent = this.percent / 100;
    const pi = 3.14159265358979;
    const twopi = pi * 2;
    const circumference = twopi * 139;
    // const element = document.getElementsByClassName('circle');


    setTimeout(() => {
      const dd = this.circle.nativeElement;
      dd.style.strokeDasharray = arcLengthPercent * circumference + ' ' + circumference;
    }, 500);
  }


}
