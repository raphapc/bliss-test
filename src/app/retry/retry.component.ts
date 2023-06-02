import { Component, EventEmitter, Output } from '@angular/core';
import { RestClientService } from '../services/rest-client.service';

@Component({
  selector: 'app-retry',
  templateUrl: './retry.component.html',
  styleUrls: ['./retry.component.scss'],
})
export class RetryComponent {
  @Output() fetchDataParent = new EventEmitter<void>();

  retry(): void {
    this.fetchDataParent.emit();
  }
}
