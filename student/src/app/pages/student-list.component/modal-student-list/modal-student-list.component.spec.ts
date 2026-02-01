import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStudentListComponent } from './modal-student-list.component';

describe('ModalStudentListComponent', () => {
  let component: ModalStudentListComponent;
  let fixture: ComponentFixture<ModalStudentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalStudentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalStudentListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
