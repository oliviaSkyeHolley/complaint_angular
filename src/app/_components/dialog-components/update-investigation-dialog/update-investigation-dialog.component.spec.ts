import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInvestigationDialogComponent } from './update-investigation-dialog.component';

describe('UpdateInvestigationDialogComponent', () => {
  let component: UpdateInvestigationDialogComponent;
  let fixture: ComponentFixture<UpdateInvestigationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateInvestigationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateInvestigationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
