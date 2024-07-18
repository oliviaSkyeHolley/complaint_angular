

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InvestigationService} from "../../_services/investigation.service";

@Component({
  selector: 'app-investigation-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './investigation-details.component.html',
  styleUrl: './investigation-details.component.scss'
})
export class InvestigationDetailsComponent implements OnInit {
  investigationId: string;
  investigationDetails: any;
  investigationQuestions: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private investigationService: InvestigationService,
  ) {
    this.investigationId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    console.log('in the investigation details');
    this.getInvestigationDetail();
  }

  getInvestigationDetail(): void {
    const headers = this.authService.getHeaders();
    this.investigationService.getInvestigation(this.investigationId, headers).subscribe(
      (data) => {
        this.investigationDetails = data;
        this.investigationQuestions = data.steps;
        console.log('Investigation Details:', data);
        console.log(this.investigationQuestions);
      },
      (error) => {
        console.error('Error fetching investigation details:', error);
      }
    );
  }

  addStep() {
    const investigationId = '123'; 
    const stepData = {
  stepLabel: 'EORTCQLQC30_Q03',
      description: 'Do you have difficulty sleeping?'
     
    };

    this.investigationService.addStepToInvestigation(investigationId, stepData)
      .subscribe(
        response => {
          console.log('Step added successfully:', response);
          
        },
        error => {
          console.error('Error adding step:', error);
         
        }
      );
  }
}