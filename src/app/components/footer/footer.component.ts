import {Component, OnInit} from '@angular/core';
import {ForgotpasswordComponent} from '../../modals/forgotpassword/forgotpassword.component';
import {MatDialog} from '@angular/material/dialog';
import {ContactUsComponent} from '../../modals/contact-us/contact-us.component';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  abouts = [
    {title: 'News', link: ''},
    {title: 'Impact', link: ''},
    {title: 'Our team', link: ''},
    {title: 'Our interns', link: ''},
    {title: 'Our supporters', link: ''},
    {title: 'Our finances', link: ''},
    {title: 'Careers', link: ''},
  ];

  contacts = [
    {title: 'Help Center', link: ''},
    {title: 'Support Community', link: ''},
    {title: 'Share your story', link: ''},
    {title: 'Press', link: ''},
    {title: 'iOS app', link: ''},
  ];

  courses = [
    {title: 'Math', link: ''},
    {title: 'Math by grade', link: ''},
    {title: 'Science and enginnering', link: ''},
    {title: 'Computing', link: ''},
    {title: 'Arts and Humaities', link: ''},
    {title: 'Economics and finance', link: ''},
    {title: 'Test prep', link: ''},
    {title: 'College careers and more', link: ''},
    {title: 'Math', link: ''},
  ];

  languages = [
    {title: 'English', code: 'en'},
    {title: 'Spanish', code: 'es'},
    {title: 'Hindi', code: 'hi'},
    {title: 'Turkish', code: 'tr'},
  ];

  langauge = 'tr';

  constructor(
    public dialog: MatDialog,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'flag-us',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/images/flag-us.svg'));
    iconRegistry.addSvgIcon(
      'flag-in',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/images/flag-in.svg'));
    iconRegistry.addSvgIcon(
      'flag-mx',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/images/flag-mx.svg'));
    iconRegistry.addSvgIcon(
      'flag-bz',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/images/flag-bz.svg'));
  }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(ContactUsComponent, {
      id: 'contactusmodal',
      disableClose: true,
      role: 'dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
