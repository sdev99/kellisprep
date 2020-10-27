import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-section-direction',
  templateUrl: './section-direction.component.html',
  styleUrls: ['./section-direction.component.scss']
})
export class SectionDirectionComponent implements OnInit {
  data;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params && params.data) {
        this.data = JSON.parse(params.data);
      }
    });
  }

  ngOnInit(): void {
  }

  onBack(): void {
    this.location.back();
  }

  onNext(): void {
    this.router.navigate(['writing-section'], {
      queryParams: {
        data: JSON.stringify(this.data)
      }
    });
  }

  onFinishSectionClick(): void {
    this.router.navigate(['practice-tests']);
  }

}
