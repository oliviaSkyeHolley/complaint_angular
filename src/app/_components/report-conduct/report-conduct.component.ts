import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {RouterLink} from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { ReportService } from '../../_services/report.service';
import { InvestigationService } from '../../_services/investigation.service';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-report-conduct',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatTable, MatTableModule, MatRadioModule, MatFormField, MatInputModule, MatCheckbox, EditorComponent, MatLabel],
  templateUrl: './report-conduct.component.html',
  styleUrls: ['./report-conduct.component.scss']
})

export class ReportConductComponent implements OnInit {
  reportId: string;
  reportDetails: any;
  investigationJson: any;
  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount'
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private reportService: ReportService,
    private dialog: MatDialog,
    private processService: InvestigationService
  ) {
    this.reportId = this.route.snapshot.params['id'];
    this.reportDetails = this.route.snapshot.params['json_string'];
  }

  ngOnInit() {
    console.log('In the investigation details');
    // -- Get the json values of the investigation first, and then the process.
    this.getReportDetail().subscribe(
      (reportDetails) => {
        this.reportDetails = reportDetails;
        if (this.reportDetails.investigationId) {
          this.getProcessSteps();
        }
        else {
          console.error("investgation ID is missing")
        }
      },
      (error) => {
        console.error('Error fetching investigation details:', error)
      }
    );
  }

  onSave() {
    // Handle the form submission logic here
    console.log('Form submitted:', this.reportDetails);
  }  
  
  getProcessSteps(): void {
    console.log('Getting the process steps of Investigation ID', this.reportDetails.investigationId);
    const headers = this.authService.getHeaders();
    this.processService.getInvestigationSteps(this.reportDetails.investigationId, headers).subscribe(
      (data) => {
        this.investigationJson = data;
        console.log('Process Details:', data);
      },
      (error) => {
        console.error('Error fetching process details:', error);
      }
    )
  }
  
  getReportDetail(): Observable<any> {
    console.log('Calling Report Details!');
    const headers = this.authService.getHeaders();
    return this.reportService.getReport(this.reportId, headers);
  }

}