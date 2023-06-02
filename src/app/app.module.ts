import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogShareComponent } from './dialog-share/dialog-share.component';
import { DialogVoteSuccessComponent } from './dialog-vote-success/dialog-vote-success.component';
import { LoadingComponent } from './loading/loading.component';
import { OfflineComponent } from './offline/offline.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuestionsComponent } from './questions/questions.component';
import { RetryComponent } from './retry/retry.component';
import routeConfig from './routes/routes';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    QuestionDetailComponent,
    DialogVoteSuccessComponent,
    DialogShareComponent,
    LoadingComponent,
    RetryComponent,
    OfflineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  providers: [provideRouter(routeConfig)],
  bootstrap: [AppComponent],
})
export class AppModule {}
