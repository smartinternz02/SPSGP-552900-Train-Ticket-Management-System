import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainComponent } from './add-train.component';

describe('AddTrainComponent', () => {
  let component: AddTrainComponent;
  let fixture: ComponentFixture<AddTrainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTrainComponent]
    });
    fixture = TestBed.createComponent(AddTrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
