import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-test-direction',
  templateUrl: './test-direction.component.html',
  styleUrls: ['./test-direction.component.scss']
})
export class TestDirectionComponent implements OnInit {

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
    this.router.navigate(['section-direction'], {
      queryParams: {
        data: JSON.stringify(this.data)
      }
    });
  }

  onFinishSectionClick(): void {
    this.router.navigate(['practice-tests']);
  }

}
