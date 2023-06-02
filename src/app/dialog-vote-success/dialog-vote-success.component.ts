import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-vote-success',
  templateUrl: './dialog-vote-success.component.html',
  styleUrls: ['./dialog-vote-success.component.scss'],
})
export class DialogVoteSuccessComponent {
  constructor(private router: Router) {}

  goToQuestions(): void {
    this.router.navigate(['/questions']);
  }
}
