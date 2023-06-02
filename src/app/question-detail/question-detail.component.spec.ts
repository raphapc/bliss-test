import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDetailComponent } from './question-detail.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from '../app.module';
import { of } from 'rxjs';

describe('QuestionDetailComponent', () => {
  let component: QuestionDetailComponent;
  let fixture: ComponentFixture<QuestionDetailComponent>;
  const mockQuestion = {
    id: 1,
    question: 'Favourite programming language?',
    image_url:
      'https://dummyimage.com/600x400/000/fff.png&text=question+1+image+(600x400)',
    thumb_url:
      'https://dummyimage.com/120x120/000/fff.png&text=question+1+image+(120x120)',
    published_at: '2015-08-05T08:40:51.620Z',
    choices: [
      {
        choice: 'Swift',
        votes: 2048,
      },
      {
        choice: 'Python',
        votes: 1024,
      },
      {
        choice: 'Objective-C',
        votes: 512,
      },
      {
        choice: 'Ruby',
        votes: 256,
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionDetailComponent],
      imports: [HttpClientTestingModule, AppModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get(): string {
                  return '123';
                },
              },
            },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(QuestionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#fetchDetails should fetch data successfully and set loading to false', () => {
    spyOn(component['restClient'], 'getQuestion').and.returnValue(
      of(mockQuestion)
    );
    component.fetchDetails('123');
    expect(component.question).toBe(mockQuestion);
    expect(component.isLoading).toBeFalse();
  });

  it('#selectOption should set selectedOption', () => {
    component.selectOption(mockQuestion.choices[0]);
    expect(component.selectedOption).toBe(mockQuestion.choices[0]);
  });

  it('#vote should open dialog when vote is successful', () => {
    spyOn(component['restClient'], 'updateQuestion').and.returnValue(
      of(mockQuestion)
    );
    component.question = mockQuestion;
    component.selectedOption = mockQuestion.choices[0];
    spyOn(component['dialog'], 'open');
    component.vote();
    expect(component['dialog'].open).toHaveBeenCalled();
  });

  it('#prepareQuestion should set votes to 1 for selected option', () => {
    component.selectedOption = mockQuestion.choices[0];
    const question = component.prepareQuestion(mockQuestion);
    expect(question.choices[0].votes).toBe(1);
  });

  it('#prepareQuestion should set votes to 0 for non-selected option', () => {
    component.selectedOption = mockQuestion.choices[0];
    const question = component.prepareQuestion(mockQuestion);
    expect(question.choices[1].votes).toBe(0);
  });

  it('#share should open dialog', () => {
    spyOn(component['dialog'], 'open');
    component.share();
    expect(component['dialog'].open).toHaveBeenCalled();
  });

  it('#ngOnInit should call fetchDetails', () => {
    spyOn(component, 'fetchDetails');
    component.ngOnInit();
    expect(component.fetchDetails).toHaveBeenCalled();
  });

  it('#ngOnDestroy should unsubscribe from subscriptions', () => {
    spyOn(component['subscriptions'][0], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['subscriptions'][0].unsubscribe).toHaveBeenCalled();
  });

  it('#backtoList should navigate to /questions', () => {
    spyOn(component['router'], 'navigate');
    component.backtoList();
    expect(component['router'].navigate).toHaveBeenCalledWith(['/questions']);
  });
});
