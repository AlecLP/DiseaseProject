import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseForm } from './disease-form';

describe('DiseaseForm', () => {
  let component: DiseaseForm;
  let fixture: ComponentFixture<DiseaseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiseaseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiseaseForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
