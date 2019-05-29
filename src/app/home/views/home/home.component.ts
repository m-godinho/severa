import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private media: MediaObserver) {}

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }
}
