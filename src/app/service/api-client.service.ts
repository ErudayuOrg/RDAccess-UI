import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {getHeader, getHeaderForUpload, getHeaderForDownload} from '../utils/auth.utils';

@Injectable({
  providedIn: 'root'
})

export class ApiClientService {
  host:string = "http://localhost:5000";
  header:any;
  constructor( private http:HttpClient) {
   }

  throwError(err):string{
    let message:string = err.error.errorMessage;
    throw message || "Please try later";
  }
  
  //any should be replaced by respective model 

  /*===============DEPARTMENT================= */
  getDepartments():Observable<any>{
    return this.http.get<any>(`${this.host}/department/all-departments`); 
  }

  getDepartmentSnapshot():Observable<any>{
    return this.http.get<any>(`${this.host}/department/snapshot`); 
  }

  getOverAllSnapshot():Observable<any>{
    return this.http.get<any>(`${this.host}/department/over-all-snapshot`); 
  }
  
  createDepartment(departmentDetail):Observable<any>{
    return this.http.post<any>(`${this.host}/department/create-department`,departmentDetail, getHeader())
    .pipe( catchError(err => this.throwError(err)) ); 
  }

  createResearchLab(researchLabDetail, departmentId):Observable<any>{
    return this.http.put<any>(`${this.host}/department/create-research-lab/${departmentId}`,researchLabDetail, getHeader())
    .pipe( catchError(err => this.throwError(err)) ); 
  }
  
  /*===============PROJECT================= */
  getAllProjectsSummary():Observable<any>{
    return this.http.get<any>(`${this.host}/project/all-summary`, getHeader());
  }

  getProjectsByLabId(researchLabId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/project/lab/${researchLabId}`, getHeader());
  }

  getProjectById(projectId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/project/overview/${projectId}`, getHeader());
  }

  createNewProject(projectDetails:any):Observable<any>{
    return this.http.post<any>(`${this.host}/project/create-new`, projectDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }
  
  updateProject(projectDetails:any, projectId:string):Observable<any>{
    return this.http.put<any>(`${this.host}/project/update/${projectId}`, projectDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }

  getMatchingProject(searchText:string):Observable<any>{
    return this.http.get<any>(`${this.host}/project/search-project/${searchText}`, getHeader());
  }

  /*===============PUBLICATION================= */
  getAllPublicationsSummary():Observable<any>{
    return this.http.get<any>(`${this.host}/publication/all-summary`, getHeader());
  }
  
  createNewPublication(publicationDetails:any):Observable<any>{
    return this.http.post<any>(`${this.host}/publication/create-new`, publicationDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }

  /*===============FUNDING================= */
  
  getAllFundingsSummary():Observable<any>{
    return this.http.get<any>(`${this.host}/funding/all-summary`, getHeader());
  }

  createNewFunding(fundingDetails:any):Observable<any>{
    return this.http.post<any>(`${this.host}/funding/create-new`, fundingDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }
  
  getfundingDetailsById(fundingId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/funding/detail/${fundingId}`, getHeader());
  }
  
  updateFunding(fundingDetails:any, fundingId:string):Observable<any>{
    return this.http.put<any>(`${this.host}/funding/update/${fundingId}`, fundingDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }

  /*========FUNDING-PROJECT=======*/
  getfundingProjectById(fundingProjectId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/funding/funding-project/detail/${fundingProjectId}`, getHeader());
  }

  getFundingsByProjectId(projectId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/funding/funding-project/project/${projectId}`, getHeader());
  }

  addRecievedFundingProject(fundingProjectDetails:any):Observable<any>{
    return this.http.post<any>(`${this.host}/funding/funding-project/create`, fundingProjectDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }

  updateReceivedFundingProject(fundingProjectDetails:any, fundingProjectId:string):Observable<any>{
    return this.http.put<any>(`${this.host}/funding/funding-project/update/${fundingProjectId}`, fundingProjectDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }
  
  uploadFilledApplication(formData:any, fundingProjectId:string):Observable<any>{
    return this.http.put<any>(`${this.host}/funding/funding-project/filled-uplaod/${fundingProjectId}`, formData, getHeaderForUpload())
    .pipe( catchError(err => this.throwError(err)) );
  }

  uploadFpAck(formData:any, fundingProjectId:string):Observable<any>{
    return this.http.put<any>(`${this.host}/funding/funding-project/ack-uplaod/${fundingProjectId}`, formData, getHeaderForUpload())
    .pipe( catchError(err => this.throwError(err)) );
  }
  
  downloadFundingProjectDoc(path:any):Observable<any>{
    return this.http.post<any>(`${this.host}/funding/funding-project/download`,path, getHeaderForDownload())
    .pipe( catchError(err => this.throwError(err)) );
  }
  
  /*===============USER================= */
  
  getUserById(userId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/user/profile/${userId}`, getHeader());
  }

  loginUser(loginDetails:any):Observable<any>{
    return this.http.post<any>(`${this.host}/user/login`, loginDetails)
      .pipe( catchError(err => this.throwError(err)) );
  }

  getProjectByUserId(userId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/user/projects/${userId}`, getHeader());
  }

  getPublicationsByUserId(userId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/user/publications/${userId}`, getHeader());
  }

  getFundingProjectByUserId(userId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/user/funding-project/${userId}`, getHeader());
  }
  
  getMatchingUserId(userId:string):Observable<any>{
    return this.http.get<any>(`${this.host}/user/match-userId/${userId}`, getHeader())
      .pipe( catchError(err => this.throwError(err)) );
  }
  
  createUser(userDetails):Observable<any>{
    return this.http.post<any>(`${this.host}/user/create`, userDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) ); 
  }

  updatePassword(passwords, userId):Observable<any>{
    return this.http.put<any>(`${this.host}/user/update-password/${userId}`, passwords, getHeader())
    .pipe( catchError(err => this.throwError(err)) ); 
  }
}
