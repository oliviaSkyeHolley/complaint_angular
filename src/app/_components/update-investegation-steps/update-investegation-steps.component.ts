import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { MatIconModule } from '@angular/material/icon';
import {InvestigationService} from "../../_services/investigation.service";
import { CdkDragDrop, CdkDropList, CdkDrag,  moveItemInArray } from '@angular/cdk/drag-drop'; 
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableModule } from '@angular/material/table';
import { UpdateInvestigationStepDialogComponent } from '../dialog-components/update-investigation-step-dialog/update-investigation-step-dialog.component';
import { Step } from '../../_classes/step';
import { Investigation } from '../../_classes/investigation';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-update-investegation-steps',
  standalone: true,
  imports: [MatIconModule,CdkDropList, CdkDrag, CommonModule, FormsModule, RouterLink, MatTableModule, MatTable],
  templateUrl: './update-investegation-steps.component.html',
  styleUrl: './update-investegation-steps.component.scss'
})
export class UpdateInvestegationStepsComponent implements OnInit {
  // @ViewChild('table', {static:true}) table: MatTable<Invest>;
  investigationId: string;
  investigationDetails: any;
  investigationSteps: Step[]=[];
  displayedColumns: string[] = ['id', 'description', 'displayType', 'required', 'actions'];
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cd: ChangeDetectorRef,
    private authService: AuthService,
    private investigationService: InvestigationService,
    private dialog: MatDialog,
  ) {
    this.investigationId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    console.log('in the investigation update details');
    this.getInvestigationDetail();
  }

  getInvestigationDetail(): void {
    const headers = this.authService.getHeaders();
    this.investigationService.getInvestigationSteps(this.investigationId, headers).subscribe(
      (data) => {
        this.investigationDetails = data;
        this.investigationSteps = data.steps;
      },
      (error) => {
        console.error('Error fetching investigation details:', error);
      }
    );
  }

  drop(event: CdkDragDrop<string>) {
    const previousIndex = this.investigationSteps.findIndex(d => d === event.item.data);
    const movedStep = this.investigationSteps[previousIndex];
    console.log("Moved step: ", this.investigationSteps[previousIndex]);
    // Log the current and new index
    console.log('Moving step from index:', previousIndex, 'to index:', event.currentIndex);
  
    moveItemInArray(this.investigationSteps, previousIndex, event.currentIndex);
  
    this.investigationSteps.forEach((step, index) => {
      step.id = index + 1; 
    });
    
    // Verify the new order
    console.log('New order:', this.investigationSteps);
    
    // this.investigationService.addInvestigationStep(this.investigationId, this.)
  
}

openEditDialog(step: any): void {
  const dialogRef = this.dialog.open(UpdateInvestigationStepDialogComponent, {
    width: '60%',
    data: { step: step, stepsData: this.investigationSteps }
  });

  dialogRef.afterClosed().subscribe((result: any) => {
    if (result) {
      this.investigationService.updateInvestigationStep(this.investigationDetails.entityId,result.stepUuid, result).subscribe({
        next: (response) => {
          console.log('Successfully updated step id:', result.id);
          this.getInvestigationDetail();
        },
        error: (err) => {
          console.error('Error updating step:', err);
        }
      });
    }
    
  });
}
saveChanges(){
  this.investigationService.updateInvestigationStepOrder(this.investigationId, this.investigationSteps).subscribe({
    next: (response) => {
      console.log('Successfully updated all steps');
      this.getInvestigationDetail();
    },
    error: (err) => {
      console.error('Error updating steps:', err);
    }
  })
}

}