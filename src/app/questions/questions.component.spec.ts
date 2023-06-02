import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { QuestionsComponent } from './questions.component';
import { of } from 'rxjs';

describe('QuestionsComponent', () => {
  let component: QuestionsComponent;
  let httpMock: HttpTestingController;

  const mockData = [
    {
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
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        QuestionsComponent,
        { provide: ActivatedRoute, useValue: {} },
      ],
    });

    component = TestBed.inject(QuestionsComponent);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch data successfully', () => {
    const mockData = [
      {
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
      },
      {
        id: 2,
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
      },
    ];
    component.questionsList = [];

    component.fetchData();

    const req = httpMock.expectOne(
      'https://private-anon-ead1ae51dd-blissrecruitmentapi.apiary-mock.com/questions?start=0&limit=10&filter='
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockData);

    expect(component.questionsList).toEqual(mockData);
    expect(component.isLoading).toBe(false);
  });

  it('should fetch data successfully with filter', () => {
    component.questionsList = [];
    component.filter = 'test';
    component.fetchData();

    const req = httpMock.expectOne(
      'https://private-anon-ead1ae51dd-blissrecruitmentapi.apiary-mock.com/questions?start=0&limit=10&filter=test'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockData);

    expect(component.questionsList).toEqual(mockData);
    expect(component.isLoading).toBe(false);
  });

  it('#checkHealth should set shouldRetry to true if it fails', () => {
    component.shouldRetry = false;
    component.checkHealth();
    const req = httpMock.expectOne(
      'https://private-anon-ead1ae51dd-blissrecruitmentapi.apiary-mock.com/health'
    );

    expect(req.request.method).toBe('GET');
    req.flush({ status: 'ERROR' });

    expect(component.shouldRetry).toBe(true);
  });

  it('#checkHealth should set shouldRetry to false if it succeeds', () => {
    component.shouldRetry = true;
    component.checkHealth();
    const req = httpMock.expectOne(
      'https://private-anon-ead1ae51dd-blissrecruitmentapi.apiary-mock.com/health'
    );
    spyOn(component, 'fetchData');
    expect(req.request.method).toBe('GET');
    req.flush({ status: 'OK' });

    expect(component.shouldRetry).toBe(false);
  });

  it('#search should set filter and call fetchData', () => {
    const spy = spyOn(component, 'fetchData');
    component.searchTerm = 'test';
    component.search();
    expect(component.filter).toBe('test');
    expect(spy).toHaveBeenCalled();
  });

  it('#loadMoreData should increment startIndex and call fetchData', () => {
    const spy = spyOn(component, 'fetchData');
    component.startIndex = 0;
    component.loadMoreData();
    expect(component.startIndex).toBe(10);
    expect(spy).toHaveBeenCalled();
  });

  it('#selectQuestion should navigate to question/:id', () => {
    const spy = spyOn(component['router'], 'navigate');
    component.selectQuestion(mockData[0]);
    expect(spy).toHaveBeenCalledWith(['question', 1]);
  });

  it('#ngOnDestroy should unsubscribe from subscriptions', () => {
    component.subscriptions = [of().subscribe()];
    const spy = spyOn(component['subscriptions'][0], 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
