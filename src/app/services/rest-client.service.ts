import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Health } from '../questions/models/health';
import { Question } from '../questions/models/question';

@Injectable({
  providedIn: 'root',
})
export class RestClientService {
  constructor(private http: HttpClient) {}

  getQuestions(options: any): Observable<Question[]> {
    return this.http.get<Question[]>(
      'https://private-anon-ead1ae51dd-blissrecruitmentapi.apiary-mock.com/questions',
      { params: options.params }
    );
  }

  checkHealth(): Observable<Health> {
    return this.http.get<Health>(
      'https://private-anon-ead1ae51dd-blissrecruitmentapi.apiary-mock.com/health'
    );
  }

  getQuestion(id: string): Observable<Question> {
    return this.http.get<Question>(
      `https://private-anon-ead1ae51dd-blissrecruitmentapi.apiary-mock.com/questions/${id}`
    );
  }

  updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(
      `https://private-anon-ead1ae51dd-blissrecruitmentapi.apiary-mock.com/questions/${question.id}`,
      question
    );
  }

  shareQuestion(url: string, email: string): Observable<Health> {
    return this.http.post<Health>(
      `https://private-anon-ead1ae51dd-blissrecruitmentapi.apiary-mock.com/share?destination_email=${email}&content_url=${url}`,
      {}
    );
  }
}
