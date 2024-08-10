import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInvestigationStepDialogComponent } from './update-investigation-step-dialog.component';

describe('UpdateInvestigationStepDialogComponent', () => {
  let component: UpdateInvestigationStepDialogComponent;
  let fixture: ComponentFixture<UpdateInvestigationStepDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateInvestigationStepDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateInvestigationStepDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
