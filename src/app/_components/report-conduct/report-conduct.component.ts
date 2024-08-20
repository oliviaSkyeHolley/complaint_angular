import { Component, inject, OnInit, signal, computed } from '@angular/core';
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
import { Step } from '../../_classes/step';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { FileUploadComponent } from '../file-upload/file-upload.component';




@Component({
  selector: 'app-report-conduct',
  standalone: true,
  imports: [MatButtonModule,MatIconModule, MatSidenavModule, MatDivider, CommonModule, MatToolbarModule, MatSidenavModule, MatListModule, MatRadioModule, EditorComponent, FormsModule, MatCheckbox, FileUploadComponent],
  templateUrl: './report-conduct.component.html',
  styleUrls: ['./report-conduct.component.scss']
})

export class ReportConductComponent implements OnInit {
  reportId: string;
  reportDetails: any;
  investigationJson: any;
  selectedValue: any;
  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount'
  };

  //Ruban's variables
  collapsed = signal(false);
  completedStep = false;
  sideNavWidth = computed(() => this.collapsed() ? '65px': '350px' );
  oneStep: any;
  completedSteps: Set<string> = new Set();
  userChoices: Map<string, string> = new Map();

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
    this.getReportDetail();
    // -- Get the json values of the investigation first, and then the process.
    //this.getReportDetail().subscribe(
    //  (reportDetails) => {
    //    this.reportDetails = reportDetails;
    //    if (this.reportDetails.investigationId) {
    //      this.getProcessSteps();
    //      this.selectedValue = this.reportDetails.steps[0];
    //    }
    //    else {
    //      console.error("investgation ID is missing")
    //    }
    //  },
    //  (error) => {
    //    console.error('Error fetching investigation details:', error)
    //  }
    //);
  }

  onSave() {
    // Handle the form submission logic here
    console.log('Form submitted:', this.reportDetails);
    this.reportService.updateReport(this.reportDetails.entityId, this.reportDetails).subscribe(
      (error) => {
        console.error('Error saving investigation answers:', error)
      }
    );
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
  
 //getReportDetail(): Observable<any> {
 //  console.log('Calling Report Details!');
 //  const headers = this.authService.getHeaders();
 //  return this.reportService.getReport(this.reportId, headers);
 //  
 //}

  getReportDetail(): void {
    console.log('Calling Report Details!');
    const headers = this.authService.getHeaders();
    this.reportService.getReport(this.reportId, headers).subscribe(
      (data) => {
          this.reportDetails = data;
        if(this.reportDetails.steps){
          this.reportDetails.steps[0].isVisible = true;
          this.oneStep = this.reportDetails.steps[0];
        }
      },
      (error) => {
        console.error('Error fetching report details:', error);
      }
    );
  }

  // -- DIVIDER Ruban's methods below

  getStep(stepUuid:string){
    for(const step of this.reportDetails.steps){
      if(step && step.stepUuid == stepUuid){
        this.oneStep = step;
      }
    }
    return [];
  }
  onRadioChange(event: any, step: Step) {
    //store the choice in userChoices
    this.userChoices.set(step.stepUuid, event.value);
    this.completedSteps.add(step.stepUuid);
    step.isCompleted = true;
    console.log(this.reportDetails.steps);
    var currentindex = step.id;
    for(currentindex; currentindex < this.reportDetails.steps.length; currentindex++ ){
      this.reportDetails.steps[currentindex].isVisible = false;
      this.userChoices.delete(this.reportDetails.steps[currentindex].stepUuid);
      this.completedSteps.delete(this.reportDetails.steps[currentindex].stepUuid);
    }
    //determine the next step based on conditions
    this.updateSteps();
  }

  onCheckboxChange(event: any, step: Step) {
    //store the choice in userChoices
    this.userChoices.set(step.stepUuid, event.value);
    this.completedSteps.add(step.stepUuid);
    step.isCompleted = true;
    console.log(this.reportDetails.steps);
    var currentindex = step.id;
    for(currentindex; currentindex < this.reportDetails.steps.length; currentindex++ ){
      this.reportDetails.steps[currentindex].isVisible = false;
      this.userChoices.delete(this.reportDetails.steps[currentindex].stepUuid);
      this.completedSteps.delete(this.reportDetails.steps[currentindex].stepUuid);
    }
    //determine the next step based on conditions
    this.updateSteps();
  }

  getChoiceLabel(choiceUuid: any){
    for(const step of this.reportDetails.steps){
       for(const choice of step.choices){
        if(choice.choiceUuid == choiceUuid){
          return choice.description;
        }
       }
    }
    return "";
  }
  updateSteps() {
    for (const step of this.reportDetails.steps) {
      step.isVisible = this.checkVisibility(step);
    }
  }
  checkVisibility(step: any): boolean {
    //if there are no conditions, the step is always visible
    if (!step.conditions || step.conditions.length === 0) {
      return true;
    }
    //check each condition
    for (const condition of step.conditions) {
      const userChoice = this.userChoices.get(condition.stepUuid);
    if(userChoice === condition.choiceUuid){
        return true;
      }
    }
    return false;
  }
  //check if step is completed
  isStepCompleted(stepUuid: string): boolean {
    return this.completedSteps.has(stepUuid);
  }
}