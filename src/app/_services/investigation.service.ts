import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ListOfInvestigation} from "../_classes/list-of-investigations";
import { Investigation } from '../_classes/investigation';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class InvestigationService {


  constructor(private http: HttpClient, private authService: AuthService) {}

  getInvestigationList(): Observable<ListOfInvestigation[]> {
    const headers = this.authService.getHeaders();
    return this.http.get<ListOfInvestigation[]>(environment.investigationListURL, { headers });
  }
  addInvestigation(data: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.post<any>(environment.addInvestigationListURL, data, { headers });
  }


  getInvestigation(investigationId: string, headers: HttpHeaders): Observable<Investigation> {
    return this.http.get<Investigation>(`${environment.getInvestigationURL}${investigationId}?_format=json`, { headers });
  }


  //yet to implement
  addStepToInvestigation(investigationId: string, stepData: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.post<any>(`${environment.addStepURL}/${investigationId}`, stepData, { headers });
  }

    
    updateStep(stepId: string, data: any): Observable<any> {
      const headers = this.authService.getHeaders();
      return this.http.patch<any>(`${environment.updateStepURL}/${stepId}`, data, { headers });
    }
}
