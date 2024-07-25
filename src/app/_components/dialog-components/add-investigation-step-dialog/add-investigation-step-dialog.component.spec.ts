import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvestigationStepDialogComponent } from './add-investigation-step-dialog.component';

describe('AddInvestigationStepDialogComponent', () => {
  let component: AddInvestigationStepDialogComponent;
  let fixture: ComponentFixture<AddInvestigationStepDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInvestigationStepDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInvestigationStepDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
