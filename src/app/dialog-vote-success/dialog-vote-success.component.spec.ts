import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVoteSuccessComponent } from './dialog-vote-success.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DialogVoteSuccessComponent', () => {
  let component: DialogVoteSuccessComponent;
  let fixture: ComponentFixture<DialogVoteSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogVoteSuccessComponent],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    });
    fixture = TestBed.createComponent(DialogVoteSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a 'Go to questions' button`, () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Ok');
  });

  it(`should navigate to '/questions' when 'Go to questions' button is clicked`, () => {
    const compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('button');
    spyOn(component['router'], 'navigate');
    button.click();
    expect(component['router'].navigate).toHaveBeenCalledWith(['/questions']);
  });
});
