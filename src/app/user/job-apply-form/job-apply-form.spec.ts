import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplyForm } from './job-apply-form';

describe('JobApplyForm', () => {
  let component: JobApplyForm;
  let fixture: ComponentFixture<JobApplyForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobApplyForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobApplyForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
