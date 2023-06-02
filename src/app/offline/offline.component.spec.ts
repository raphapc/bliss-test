import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineComponent } from './offline.component';
import { AppModule } from '../app.module';

describe('OfflineComponent', () => {
  let component: OfflineComponent;
  let fixture: ComponentFixture<OfflineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfflineComponent],
      imports: [AppModule],
    });
    fixture = TestBed.createComponent(OfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
