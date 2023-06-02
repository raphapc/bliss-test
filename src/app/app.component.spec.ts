import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'bliss-test'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('bliss-test');
  });

  it(`should have as isOnline 'true'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOnProperty(navigator, 'onLine').and.returnValue(true);
    window.dispatchEvent(new Event('online'));
    expect(app.isOnline).toEqual(true);
  });

  it(`should have as isOnline 'false'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOnProperty(navigator, 'onLine').and.returnValue(false);
    window.dispatchEvent(new Event('offline'));
    expect(app.isOnline).toEqual(false);
  });

  it('#updateNetworkStatus should set isOnline to value of navigator.onLine', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOnProperty(navigator, 'onLine').and.returnValue(true);
    app.updateNetworkStatus();
    expect(app.isOnline).toEqual(true);
  });
});
