import {Component} from '@angular/core';
import {ShareddataService} from './services/shareddata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kallisprep';
  loading = false;

  constructor(
    public shareddataService: ShareddataService,
  ) {
    shareddataService.loading.subscribe((loading) => {
      this.loading = loading;
    });
  }
}
