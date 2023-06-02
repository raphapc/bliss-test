import { Routes } from '@angular/router';
import { QuestionsComponent } from '../questions/questions.component';
import { QuestionDetailComponent } from '../question-detail/question-detail.component';

const routeConfig: Routes = [
  {
    path: '',
    redirectTo: '/questions',
    pathMatch: 'full',
  },
  {
    path: 'questions',
    component: QuestionsComponent,
    title: 'Questions List',
  },
  {
    path: 'question/:id',
    component: QuestionDetailComponent,
    title: 'Question Detail',
  },
];

export default routeConfig;
