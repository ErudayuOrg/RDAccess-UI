import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiClientService } from "../../../service/api-client.service";
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent{
  userId:string;
  userPassword:string;
  errorMessage:string = "";
  constructor(private service: ApiClientService, private router: Router) { }

  authenticate(data){
    this.service.loginUser(data).subscribe(response =>{
      console.log(response);
      localStorage.setItem('TOKEN',response.token);
      localStorage.setItem('USERID',response.user.userId);
      localStorage.setItem('USERNAME',response.user.userName);
      localStorage.setItem('DEPARTMENTID',response.user.userDepartmentId);
      localStorage.setItem('DESIGNATION',response.user.userDesignation);
      this.router.navigate(['home']);
    },
    error => {
      this.errorMessage = error;
    })
  }
}
