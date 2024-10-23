import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-page',
  templateUrl: './title-page.component.html',
  styleUrl: './title-page.component.scss'
})
export class TITLEPAGEComponent {
  @Input() pageTitle!:any;
  @Input() detailPageTitle!:string;
}
