import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../../_services/auth.service';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { MatIconModule } from '@angular/material/icon';
import {InvestigationService} from "../../../_services/investigation.service";
import { CdkDragDrop, CdkDropList, CdkDrag,  moveItemInArray } from '@angular/cdk/drag-drop'; 
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableModule } from '@angular/material/table';
import { UpdateStepDialogComponent } from '../update-step-dialog/update-step-dialog.component';
@Component({
  selector: 'app-update-investegation-steps',
  standalone: true,
  imports: [MatIconModule,CdkDropList, CdkDrag, CommonModule, FormsModule, RouterLink, MatTableModule, MatTable],
  templateUrl: './update-investegation-steps.component.html',
  styleUrl: './update-investegation-steps.component.scss'
})
export class UpdateInvestegationStepsComponent implements OnInit {
  investigationId: string;
  investigationDetails: any;
  investigationSteps: any;
  displayedColumns: string[] = ['id', 'description', 'displayType', 'required', 'actions'];
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
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
    this.investigationService.getInvestigation(this.investigationId, headers).subscribe(
      (data) => {
        this.investigationDetails = data;
        this.investigationSteps = data.steps;
        console.log('Investigation Details:', data);
        console.log(this.investigationSteps);
      },
      (error) => {
        console.error('Error fetching investigation details:', error);
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    
    moveItemInArray(this.investigationSteps, event.previousIndex, event.currentIndex);
  
}

openEditDialog(question: any): void {
  const dialogRef = this.dialog.open(UpdateStepDialogComponent, {
    width: '600px',
    data: {
      question: question,
      
    },
  });

  dialogRef.afterClosed().subscribe((updatedQuestion: any) => {
    // if (updatedQuestion) {
    //   console.log(updatedQuestion.question.id);
    //   const headers = this.authService.getHeaders();
    // const url = `${environment.apiUrl}/api/update-assessment/${updatedQuestion.question.id}`;

    // this.http.patch(url, updatedQuestion, { headers }).subscribe(
    //   (response) => {
    //     console.log('Assessment updated successfully:', response);
    //     // Optionally, update the local data if needed
    //   },
    //   (error) => {
    //     console.error('Error updating assessment:', error);
    //     // Handle error as needed
    //   }
    // );
    //   }
    
  });
}
}