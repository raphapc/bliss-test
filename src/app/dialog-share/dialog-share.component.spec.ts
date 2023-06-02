import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShareComponent } from './dialog-share.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from '../app.module';
import { Health } from '../questions/models/health';
import { of } from 'rxjs';

describe('DialogShareComponent', () => {
  let component: DialogShareComponent;
  let fixture: ComponentFixture<DialogShareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogShareComponent],
      imports: [HttpClientTestingModule, AppModule],
    });
    fixture = TestBed.createComponent(DialogShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#send should send email', () => {
    component.emailFormControl.setValue('email@email.com');
    const spy = spyOn(component['restClient'], 'shareQuestion').and.returnValue(
      of({ status: 'OK' } as Health)
    );
    component.send();
    expect(spy).toHaveBeenCalled();
  });
});
