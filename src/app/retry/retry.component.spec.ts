import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetryComponent } from './retry.component';

describe('RetryComponent', () => {
  let component: RetryComponent;
  let fixture: ComponentFixture<RetryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetryComponent],
    });
    fixture = TestBed.createComponent(RetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#retry should emit an event to parent to refresh the questions list', () => {
    spyOn(component.fetchDataParent, 'emit');
    component.retry();
    expect(component.fetchDataParent.emit).toHaveBeenCalled();
  });
});
