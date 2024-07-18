import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStepDialogComponent } from './update-step-dialog.component';

describe('UpdateStepDialogComponent', () => {
  let component: UpdateStepDialogComponent;
  let fixture: ComponentFixture<UpdateStepDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStepDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStepDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
