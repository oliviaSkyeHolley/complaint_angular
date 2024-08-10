import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInvestegationStepsComponent } from './update-investegation-steps.component';

describe('UpdateInvestegationStepsComponent', () => {
  let component: UpdateInvestegationStepsComponent;
  let fixture: ComponentFixture<UpdateInvestegationStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateInvestegationStepsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateInvestegationStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
