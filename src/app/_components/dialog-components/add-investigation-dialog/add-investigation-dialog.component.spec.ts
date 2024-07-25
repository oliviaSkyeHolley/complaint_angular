import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvestigationDialogComponent } from './add-investigation-dialog.component';

describe('AddInvestigationDialogComponent', () => {
  let component: AddInvestigationDialogComponent;
  let fixture: ComponentFixture<AddInvestigationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInvestigationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInvestigationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
