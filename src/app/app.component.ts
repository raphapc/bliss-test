import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'bliss-test';
  isOnline: boolean = navigator.onLine;

  constructor() {
    window.addEventListener('online', this.updateNetworkStatus.bind(this));
    window.addEventListener('offline', this.updateNetworkStatus.bind(this));
  }

  updateNetworkStatus() {
    this.isOnline = navigator.onLine;
  }
}
