import { Component, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'

import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FEADACOWEBSITECOMPANY';

  constructor(
    private translate : TranslateService,
    private elementRef: ElementRef,
    private cookieService:CookieService
  ){
    translate.setDefaultLang('en')

    this.elementRef.nativeElement.ownerDocument.documentElement.className = 'light'
  }
}
