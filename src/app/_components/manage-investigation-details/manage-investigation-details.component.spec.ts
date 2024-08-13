import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInvestigationDetailsComponent } from './manage-investigation-details.component';

describe('InvestigationDetailsTabnavComponent', () => {
  let component: ManageInvestigationDetailsComponent;
  let fixture: ComponentFixture<ManageInvestigationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageInvestigationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageInvestigationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
