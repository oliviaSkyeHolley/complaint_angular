
import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AuthService } from '../../_services/auth.service';
import { environment } from '../../../environments/environment';
import {CommonModule} from "@angular/common";
import {Router, RouterLink} from '@angular/router';
import {ListOfInvestigation} from "../../_classes/list-of-investigations";
import {InvestigationService} from "../../_services/investigation.service";

@Component({
  selector: 'app-investigation-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink],
   templateUrl: './investigation-list.component.html',
  styleUrl: './investigation-list.component.scss'
  
})


export class InvestigationListComponent implements OnInit {
  investigations: ListOfInvestigation[] = [];

  constructor(private http: HttpClient, private authService: AuthService, private investigationService: InvestigationService) {}

  ngOnInit(): void {
    console.log('in the investigation list');
    this.getInvestigationList();
  }

  getInvestigationList(): void {
    this.investigationService.getInvestigationList().subscribe({
      next: (data) => this.investigations = data,
      error: (err) => console.error('Error fetching investigations', err)
    });
  }

  addInvestigation(): void {
    const newInvestigationData = {

      label: 'New Investigation',
      description: 'This is a new investigation.'
      
    };

    this.investigationService.addInvestigation(newInvestigationData).subscribe({
      next: (response) => {
        console.log('Successfully added investigation:', response);
       
        this.getInvestigationList();
      },
      error: (err) => {
        console.error('Error adding investigation:', err);
        
      }
    });
  }
}