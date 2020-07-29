import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { ApiClientService } from "../../../service/api-client.service";
import { GlobalStoreService } from './../../../service/global-store.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent{
  loginForm = new FormGroup({
    userId: new FormControl('',[Validators.required]),
    userPassword: new FormControl('',[Validators.required])
  });

  errorMessage:string = "";

  constructor(private service: ApiClientService,
    private router: Router,
    private globalStore: GlobalStoreService
    ) { }

  authenticateUser(){
    this.service.loginUser(this.loginForm.value).subscribe(response =>{
      localStorage.setItem('TOKEN',response.token);
      this.globalStore.setGlobalStore(response.user);
      this.router.navigate(['home']);
    },
    error => {
      this.errorMessage = error;
    })
  }
}
