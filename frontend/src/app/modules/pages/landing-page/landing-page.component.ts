import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LandingPageComponent {
  tabIndex: number = 0;
  constructor() {}

  getTabIndex(num: number): void {
    this.tabIndex = num;
  }
}
