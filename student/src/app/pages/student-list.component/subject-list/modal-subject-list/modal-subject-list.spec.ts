import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSubjectList } from './modal-subject-list';

describe('ModalSubjectList', () => {
  let component: ModalSubjectList;
  let fixture: ComponentFixture<ModalSubjectList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSubjectList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSubjectList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
