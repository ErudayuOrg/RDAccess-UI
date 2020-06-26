import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiClientService } from "../../../service/api-client.service";
import { GlobalStoreService } from './../../../service/global-store.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent{
  userId:string;
  userPassword:string;
  errorMessage:string = "";
  constructor(private service: ApiClientService, private router: Router, private globalStore: GlobalStoreService) { }

  authenticate(data){
    this.service.loginUser(data).subscribe(response =>{
      console.log(response);
      localStorage.setItem('TOKEN',response.token);
      localStorage.setItem('USERID',response.user.userId);
      localStorage.setItem('USERNAME',response.user.userName);
      this.globalStore.setGlobalStore(response.user);
      this.router.navigate(['home']);
    },
    error => {
      this.errorMessage = error;
    })
  }
}
