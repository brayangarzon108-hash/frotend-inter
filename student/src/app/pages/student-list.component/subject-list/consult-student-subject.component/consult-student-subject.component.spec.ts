import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultStudentSubjectComponent } from './consult-student-subject.component';

describe('ConsultStudentSubjectComponent', () => {
  let component: ConsultStudentSubjectComponent;
  let fixture: ComponentFixture<ConsultStudentSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultStudentSubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultStudentSubjectComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
