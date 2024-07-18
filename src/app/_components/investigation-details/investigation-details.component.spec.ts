import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationDetailsComponent } from './investigation-details.component';

describe('InvestigationDetailsComponent', () => {
  let component: InvestigationDetailsComponent;
  let fixture: ComponentFixture<InvestigationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestigationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestigationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
