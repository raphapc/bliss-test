import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestClientService } from '../services/rest-client.service';
import { Choice, Question } from '../questions/models/question';
import { MatDialog } from '@angular/material/dialog';
import { DialogVoteSuccessComponent } from '../dialog-vote-success/dialog-vote-success.component';
import { DialogShareComponent } from '../dialog-share/dialog-share.component';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss'],
})
export class QuestionDetailComponent implements OnInit, OnDestroy {
  subscriptions: any[] = [];
  isLoading: boolean = false;
  question = {} as Question;
  selectedOption: Choice | undefined;

  constructor(
    private route: ActivatedRoute,
    private restClient: RestClientService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.fetchDetails(id);
  }

  fetchDetails(id: string): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.restClient.getQuestion(id).subscribe((data) => {
        this.question = data;
        this.isLoading = false;
      })
    );
  }

  selectOption(option: Choice): void {
    console.log(option);

    this.selectedOption = option;
  }

  vote(): void {
    this.restClient
      .updateQuestion(this.prepareQuestion(this.question))
      .subscribe((data) => {
        this.dialog.open(DialogVoteSuccessComponent, {
          width: '250px',
          enterAnimationDuration: 0,
          exitAnimationDuration: 200,
        });
      });
  }

  share(): void {
    this.dialog.open(DialogShareComponent, {
      width: '500px',
      enterAnimationDuration: 0,
      exitAnimationDuration: 200,
    });
  }

  prepareQuestion(question: Question): Question {
    question.choices.forEach((choice) => {
      if (choice === this.selectedOption) {
        choice.votes = 1;
      } else {
        choice.votes = 0;
      }
    });
    console.log(question);

    return question;
  }

  backtoList(): void {
    this.router.navigate(['/questions']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
