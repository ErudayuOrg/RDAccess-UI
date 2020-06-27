import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {getHeader} from '../utils/auth.utils';

@Injectable({
  providedIn: 'root'
})

export class ApiClientService {
  host:string = "http://localhost:5000/";
  header:any;
  constructor( private http:HttpClient) {
   }

  throwError(err):string{
    let message:string = err.error.errorMessage;
    throw message || "Please try later";
  }
  
  //any should be replaced by respective model 
  getDepartments():Observable<any>{
    return this.http.get<any>(`${this.host}department/all-departments`); 
  }

  getDepartmentSnapshot():Observable<any>{
    return this.http.get<any>(`${this.host}department/snapshot`); 
  }

  getOverAllSnapshot():Observable<any>{
    return this.http.get<any>(`${this.host}department/over-all-snapshot`); 
  }
  
  createDepartment(departmentDetail):Observable<any>{
    return this.http.post<any>(`${this.host}department/create-department`,departmentDetail, getHeader())
    .pipe( catchError(err => this.throwError(err)) ); 
  }

  createResearchLab(researchLabDetail, departmentId):Observable<any>{
    return this.http.put<any>(`${this.host}department/create-research-lab/${departmentId}`,researchLabDetail, getHeader())
    .pipe( catchError(err => this.throwError(err)) ); 
  }

  getProjectsByLabId(researchLabId:string):Observable<any>{
    return this.http.get<any>(`${this.host}project/lab/${researchLabId}`, getHeader());
  }

  getProjectById(projectId:string):Observable<any>{
    return this.http.get<any>(`${this.host}project/overview/${projectId}`, getHeader());
  }

  createNewProject(projectDetails:any):Observable<any>{
    return this.http.post<any>(`${this.host}project/create-new`, projectDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }
  
  updateProject(projectDetails:any, projectId:string):Observable<any>{
    return this.http.put<any>(`${this.host}project/update/${projectId}`, projectDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) );
  }

  getUserById(userId:string):Observable<any>{
    return this.http.get<any>(`${this.host}user/profile/${userId}`, getHeader());
  }

  loginUser(loginDetails:any):Observable<any>{
    return this.http.post<any>(`${this.host}user/login`, loginDetails)
      .pipe( catchError(err => this.throwError(err)) );
  }

  getProjectByUserId(userId:string):Observable<any>{
    return this.http.get<any>(`${this.host}user/projects/${userId}`, getHeader());
  }

  getMatchingUserId(userId:string):Observable<any>{
    return this.http.get<any>(`${this.host}user/match-userId/${userId}`, getHeader())
      .pipe( catchError(err => this.throwError(err)) );
  }
  
  createUser(userDetails):Observable<any>{
    return this.http.post<any>(`${this.host}user/create`, userDetails, getHeader())
    .pipe( catchError(err => this.throwError(err)) ); 
  }
}
