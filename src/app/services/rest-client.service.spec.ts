import { TestBed } from '@angular/core/testing';

import { RestClientService } from './rest-client.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('RestClientService', () => {
  let service: RestClientService;
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

  const mockHealth = {
    status: 'OK',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RestClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getQuestions should return an Observable<Question[]>', () => {
    service.getQuestions({}).subscribe((questions) => {
      expect(questions.length).toBe(1);
      expect(questions).toEqual(mockData);
    });
    const req = httpMock.expectOne(
      'https://private-anon-ead1ae51dd-blissrecruitmentapi.apiary-mock.com/questions'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('#checkHealth should return an Observable<Health>', () => {
    service.checkHealth().subscribe((health) => {
      expect(health.status).toBe('OK');
      expect(health).toEqual(mockHealth);
    });
    const req = httpMock.expectOne(
      'https://private-anon-ead1ae51dd-blissrecruitmentapi.apiary-mock.com/health'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockHealth);
  });

  it('#getQuestion should return an Observable<Question>', () => {
    service.getQuestion('1').subscribe((question) => {
      expect(question.id).toBe(1);
      expect(question).toEqual(mockData[0]);
    });
    const req = httpMock.expectOne(
      'https://private-anon-ead1ae51dd-blissrecruitmentapi.apiary-mock.com/questions/1'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData[0]);
  });

  it('#updateQuestion should return an updated Observable<Question>', () => {
    service.updateQuestion(mockData[0]).subscribe((question) => {
      expect(question.id).toBe(1);
      expect(question).toEqual(mockData[0]);
    });
    const req = httpMock.expectOne(
      'https://private-anon-ead1ae51dd-blissrecruitmentapi.apiary-mock.com/questions/1'
    );
    expect(req.request.method).toBe('PUT');
    req.flush(mockData[0]);
  });

  it('#shareQuestion should send email and return an Observable<Health>', () => {
    service.shareQuestion('url', 'email').subscribe((health) => {
      expect(health.status).toBe('OK');
      expect(health).toEqual(mockHealth);
    });
    const req = httpMock.expectOne(
      'https://private-anon-ead1ae51dd-blissrecruitmentapi.apiary-mock.com/share?destination_email=email&content_url=url'
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockHealth);
  });
});
