import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../_services/auth.service';
import { CommonModule } from "@angular/common";
import { RouterLink } from '@angular/router';
import { ListOfReport } from "../../_classes/list-of-reports";
import { ReportService } from "../../_services/report.service";
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { AddReportDialogComponent } from '../dialog-components/add-report-dialog/add-report-dialog.component';
import { DuplicateReportDialogComponent } from '../dialog-components/duplicate-report-dialog/duplicate-report-dialog.component';
import { MatDialog} from '@angular/material/dialog';
import { Step } from '../../_classes/step';
@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatTable, MatTableModule],
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.scss'
})
export class ReportListComponent {
  reports: ListOfReport[] = [];
  step:Step[] = [];   // Not sure if we need steps in the Reports...
  displayedColumns: string[] = ['entityid', 'label', 'revisionStatus', 'createdTime', 'actions'];

  constructor(private http: HttpClient, private authService: AuthService, private reportService: ReportService, private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log('In the report list');
    this.getReportList();
  }

  getReportList(): void {
    this.reportService.getReportList().subscribe({
      next: (data) => this.reports = data,
      error: (err) => console.error('Error fetching reports', err)
    });
  }

  addReport(): void {

    const dialogRef = this.dialog.open(AddReportDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        const formattedData = {
          label: result.label,
          revision_status: result.revision_status, 
          json_string: JSON.stringify({ label: result.label,steps: this.step })
        }

        this.reportService.addReport(formattedData).subscribe({
          next: (response) => {
            console.log('Successfully added report:', formattedData);
            this.getReportList();
          },
          error: (err) => {
            console.error('Error adding report', err);
          }
        });
      }
    });
  }

  duplicateReport(report: any): void {

    const dialogRef = this.dialog.open(DuplicateReportDialogComponent, {
      width: '400px', data: {
        report: report,

      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("This is result", result)
      if (result) {
        const formattedData = {
          label: result.label,
          revision_status: result.revision_status, 
          json_string: result.json_string
          //have to add the remeining data fields
        }
        this.reportService.addReport(formattedData).subscribe({
          next: (response) => {
            console.log('Successfully duplicated report:', formattedData);
            this.getReportList();
          },
          error: (err) => {
            console.error('Error duplicating report:', err);
          }
        });
      }else{

      }
    });
  }

  deleteReport(id: string): void {

    console.log(id)
    this.reportService.deleteReport(id).subscribe({
      next: (data) => this.reports = data,
      error: (err) => console.error('Error fetching reports', err)
    })

  }

}