import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  host:string = "http://localhost:5000/";
  constructor( private http:HttpClient) { }
  
  //any should be replaced by respective model 
  getDepartments():Observable<any>{
    return this.http.get<any>(this.host + "department/all-departments");
  }

  getProjectsByLabId(researchLabId:string):Observable<any>{
    return this.http.get<any>(this.host + "project/lab/" + researchLabId);
  }
  
  getUserById(userId:string):Observable<any>{
    return this.http.get<any>(this.host + "user/profile/" + userId);
  }
}
