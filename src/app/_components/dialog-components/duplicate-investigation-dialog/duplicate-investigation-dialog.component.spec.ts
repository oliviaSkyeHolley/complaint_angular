import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateInvestigationDialogComponent } from './duplicate-investigation-dialog.component';

describe('DuplicateInvestigationDialogComponent', () => {
  let component: DuplicateInvestigationDialogComponent;
  let fixture: ComponentFixture<DuplicateInvestigationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuplicateInvestigationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuplicateInvestigationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
