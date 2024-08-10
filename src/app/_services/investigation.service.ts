import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ListOfInvestigation} from "../_classes/list-of-investigations";
import { Investigation } from '../_classes/investigation';
import {AuthService} from "./auth.service";
import { Step } from '../_classes/step';

@Injectable({
  providedIn: 'root'
})
export class InvestigationService {


  constructor(private http: HttpClient, private authService: AuthService) {}

  getInvestigationList(): Observable<ListOfInvestigation[]> {
    const headers = this.authService.getHeaders();
    return this.http.get<ListOfInvestigation[]>(environment.getInvestigationListURL, { headers });
  }
  createInvestigation(data: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.post<Investigation>(environment.createInvestigationURL, data, { headers });
  }
  duplicateInvestigation(data: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.post<Investigation>(environment.duplicateInvestigationURL, data, { headers });
  }

  updateInvestigation(investigationId:string, data:any): Observable<any>{
    const headers = this.authService.getHeaders();
    return this.http.patch<Investigation>(`${environment.updateInvestigationURL}${investigationId}`, data, {headers});
  }
  
  deleteInvestigation(investigationId:string): Observable<any>{
   
    const headers =this.authService.getHeaders();
    return this.http.delete<Investigation>(`${environment.deleteInvestigationURL}${investigationId}`,{headers});
  }

  

  getInvestigationSteps(investigationId: string, headers: HttpHeaders): Observable<Investigation> {

    return this.http.get<Investigation>(`${environment.getInvestigationURL}${investigationId}?_format=json`, { headers });
  }

  addInvestigationStep(investigationId: string, stepData: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.patch<Investigation>(`${environment.addInvestigationStepURL}${investigationId}`, stepData, {headers});
  }

  deleteInvestigationStep(investigationId:string, stepUuid: string): Observable<any>{
    const headers = this.authService.getHeaders();
    const url = `${environment.deleteInvestigationStepURL.replace('{investigationId}', investigationId).replace('{stepUuid}', stepUuid)}`;
    return this.http.patch<Step>(url, {headers});

  }
    
    updateInvestigationStep(investigationId:string,stepUuid: string, stepData: any): Observable<any> {
      const headers = this.authService.getHeaders();
      const url = `${environment.updateInvestigationStepURL.replace('{investigationId}', investigationId).replace('{stepUuid}', stepUuid)}`;
      return this.http.patch<Step>(url, stepData, {headers});
    }

    updateInvestigationStepOrder(investigationId:string, stepsData: any): Observable<any> {
      const headers = this.authService.getHeaders();
      return this.http.patch<Step>(`${environment.updateInvestigationStepOrderURL}${investigationId}`, stepsData, {headers});
    }

}
