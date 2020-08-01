import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';

import { GlobalStoreService } from '../../../service/global-store.service';
import { ApiClientService } from '../../../service/api-client.service';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css']
})

export class PasswordFormComponent implements OnInit {
  passwordUpdateForm = new FormGroup({
    oldPassword: new FormControl('',[Validators.required, Validators.minLength(8)]),
    newPassword: new FormControl('',[Validators.required, Validators.minLength(8)]),
    confirmNewPassword: new FormControl('',[Validators.required, Validators.minLength(8)])
  });
  successMessage:string;
  errorMessage:string;

  constructor(private service: ApiClientService, private globalStore: GlobalStoreService) { }

  ngOnInit(): void {

  }
  
  updateUserPassword(){
    const {userId} = this.globalStore.getGlobalStore(); 
    const passwordDetail = this.passwordUpdateForm.value;
    if(passwordDetail.newPassword !== passwordDetail.confirmNewPassword){
      this.clearMessage();
      this.errorMessage = "New password and Confirm password are different";
    }
    else{
      let {confirmNewPassword, ...passwords} = passwordDetail;
      this.service.updatePassword(passwords, userId).subscribe(response =>{
        this.clearMessage();
        this.successMessage = response.message;
        this.passwordUpdateForm.reset();
      },
      error=>{
        this.clearMessage();
        this.errorMessage = error;
      })
    }
  };
  
    

  clearMessage(){
    this.errorMessage = "";
    this.successMessage = "";
  };

}
