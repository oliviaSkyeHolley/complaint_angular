import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../_services/auth.service';
import { CommonModule } from "@angular/common";
import {  RouterLink } from '@angular/router';
import { ListOfInvestigation } from "../../_classes/list-of-investigations";
import { InvestigationService } from "../../_services/investigation.service";
import { MatButton } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { AddInvestigationDialogComponent } from '../dialog-components/add-investigation-dialog/add-investigation-dialog.component';
import { MatDialog} from '@angular/material/dialog';
import { DuplicateInvestigationDialogComponent } from '../dialog-components/duplicate-investigation-dialog/duplicate-investigation-dialog.component';
import { Step } from '../../_classes/step';
import { UpdateInvestigationDialogComponent } from '../dialog-components/update-investigation-dialog/update-investigation-dialog.component';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-investigation-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatTable, MatTableModule, MatFormField, MatInput, ReactiveFormsModule, FormsModule],
  templateUrl: './investigation-list.component.html',
  styleUrl: './investigation-list.component.scss'

})


export class InvestigationListComponent implements OnInit {
  investigations: ListOfInvestigation[] = [];
  step:Step[] = [];
  displayedColumns: string[] = ['entityid', 'label', 'revisionStatus', 'createdTime', 'updatedTime', 'actions'];

  constructor(private http: HttpClient, private authService: AuthService, private investigationService: InvestigationService, private dialog: MatDialog) { }

  changeColor() {
    // set new color here
    document.documentElement.style.setProperty(`--background-color`, 'red');
  }



  /*ngOnInit(): void {
    console.log('In the investigation list');
    this.getInvestigationList();
  }
*/
  getInvestigationList(): void {
    this.investigationService.getInvestigationList().subscribe({
      next: (data) => this.investigations = data,
      error: (err) => console.error('Error fetching investigations', err)
    });
  }

  addInvestigation(): void {
    const dialogRef = this.dialog.open(AddInvestigationDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.investigationService.createInvestigation(result).subscribe({
          next: (response) => {
            console.log('Successfully added investigation:', result);
            this.getInvestigationList();
          },
          error: (err) => {
            console.error('Error adding investigation:', err);
          }
        });
      }
    });
  }

  updateInvestigation(investigation: any): void {

    const dialogRef = this.dialog.open(UpdateInvestigationDialogComponent, {
      width: '400px', data: {
        investigation: investigation,

      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.investigationService.updateInvestigation(investigation.entityId, result).subscribe({
          next: (response) => {
            console.log('Successfully updated investigation:', result);
            this.getInvestigationList();
          },
          error: (err) => {
            console.error('Error updating investigation:', err);
          }
        });
      }else{

      }
    });
  }

  duplicateInvestigation(investigation: any): void {

    const dialogRef = this.dialog.open(DuplicateInvestigationDialogComponent, {
      width: '400px', data: {
        investigation: investigation,

      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.investigationService.duplicateInvestigation(result).subscribe({
          next: (response) => {
            console.log('Successfully duplicated investigation:', result);
            this.getInvestigationList();
          },
          error: (err) => {
            console.error('Error duplicating investigation:', err);
          }
        });
      }else{

      }
    });
  }
  deleteInvestigation(id: string): void {

    this.investigationService.deleteInvestigation(id).subscribe({
      next: (response) => {
        this.getInvestigationList();
      },
      error: (err) => {
        console.error('Error deleting investigation:', err);
      }
    })

  }

  ngOnInit(): void {
  }


}
