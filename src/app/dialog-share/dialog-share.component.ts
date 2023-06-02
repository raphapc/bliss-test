import { Component, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { RestClientService } from '../services/rest-client.service';

@Component({
  selector: 'app-dialog-share',
  templateUrl: './dialog-share.component.html',
  styleUrls: ['./dialog-share.component.scss'],
})
export class DialogShareComponent implements OnDestroy {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  subscriptions: any[] = [];

  matcher = new MyErrorStateMatcher();

  constructor(private restClient: RestClientService) {}

  send(): void {
    this.emailFormControl.value;
    this.subscriptions.push(
      this.restClient
        .shareQuestion(
          window.location.href,
          this.emailFormControl.value as string
        )
        .subscribe((data) => {})
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
