import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  host:string = "http://localhost:5000/";
 
  constructor( private http:HttpClient) { }

  throwError(err):string{
    let message:string = err.error.errorMessage;
    throw message || "Please try again";
  }
  
  //any should be replaced by respective model 
  getDepartments():Observable<any>{
    return this.http.get<any>(`${this.host}department/all-departments`);
  }

  getProjectsByLabId(researchLabId:string):Observable<any>{
    return this.http.get<any>(`${this.host}project/lab/${researchLabId}`);
  }

  getProjectById(projectId:string):Observable<any>{
    return this.http.get<any>(`${this.host}project/overview/${projectId}`);
  }

  createNewProject(projectDetails:any):Observable<any>{
    console.log(projectDetails);
    return this.http.post<any>(`${this.host}project/create-new`, projectDetails)
    .pipe( catchError(err => this.throwError(err)) );
  }
  
  getUserById(userId:string):Observable<any>{
    return this.http.get<any>(`${this.host}user/profile/${userId}`);
  }

  loginUser(loginDetails:any):Observable<any>{
    return this.http.post<any>(`${this.host}user/login`, loginDetails)
      .pipe( catchError(err => this.throwError(err)) );
  }

  getProjectByUserId(userId:string):Observable<any>{
    return this.http.get<any>(`${this.host}user/projects/${userId}`);
  }

  getMatchingUserId(userId:string):Observable<any>{
    return this.http.get<any>(`${this.host}user/match-userId/${userId}`)
      .pipe( catchError(err => this.throwError(err)) );
  }
}
