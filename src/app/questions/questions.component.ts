import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestClientService } from '../services/rest-client.service';
import { Health } from './models/health';
import { Question } from './models/question';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit, OnDestroy {
  filter: string = '';
  isLoading: boolean = false;
  questionsList: any[] = [];
  searchTerm: string = '';
  shouldRetry: boolean = false;
  startIndex: number = 0;
  subscriptions: any[] = [];

  constructor(
    private restClient: RestClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkHealth();
    this.filter = this.route.snapshot.queryParamMap.get('filter') || '';
    this.searchTerm = this.filter;
  }

  checkHealth(): void {
    this.subscriptions.push(
      this.restClient.checkHealth().subscribe((health: Health) => {
        if (health.status === 'OK') {
          this.fetchData();
          this.shouldRetry = false;
        } else {
          this.shouldRetry = true;
        }
      })
    );
  }

  fetchData(): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.restClient
        .getQuestions({
          params: {
            start: this.startIndex.toString(),
            limit: '10',
            filter: this.filter,
          },
        })
        .subscribe((data) => {
          this.questionsList = this.filter
            ? (this.questionsList = data)
            : this.questionsList.concat(data);
          this.isLoading = false;
        })
    );
  }

  search(): void {
    this.filter = this.searchTerm;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { filter: this.filter },
    });

    this.fetchData();
  }

  loadMoreData(): void {
    this.startIndex += 10;
    this.fetchData();
  }

  selectQuestion(question: Question): void {
    this.router.navigate(['question', question.id]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
