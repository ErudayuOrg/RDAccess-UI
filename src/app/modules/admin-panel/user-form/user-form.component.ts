import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';

import { RD_CONSTANT } from '../../../keys/constant';
import { ApiClientService } from '../../../service/api-client.service';
import {getDepartmentName, getDesignationName} from '../../../utils/project.utils';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm = new FormGroup({
    userId: new FormControl('',[Validators.required, Validators.minLength(5)]),
    userName: new FormControl('',[Validators.required, Validators.minLength(3)]),
    userDesignationCode: new FormControl('',[Validators.required]),
    userDepartmentId: new FormControl('',[Validators.required])
  });
  
  departments;
  designation;
  needDepartment:boolean;
  successMessage:string;
  errorMessage:string;

  constructor(private service: ApiClientService) { }

  ngOnInit(): void {
    this.designation = RD_CONSTANT.DESIGNATION;
    this.service.getDepartments().subscribe(departments =>{
      let allDepartments = departments.map(
          dept => ({"departmentId" : dept.departmentId, "departmentName" :dept.departmentName})
      );
      this.departments = allDepartments;
    })
  }
  setDepartment(){
    if(RD_CONSTANT.ROLE_WITH_NO_DEPARTMENT.includes(this.userForm.value.userDesignationCode)){
        this.needDepartment = false;
        this.userForm.patchValue({userDepartmentId:'NILL'});
    }else{
        this.needDepartment = true;
        this.userForm.patchValue({userDepartmentId:''});
    }
  }

  createUser(){
    let userDetails = this.userForm.value;
    userDetails.userPassword = 'Welcome1';
    userDetails.userDesignation = getDesignationName(userDetails.userDesignationCode);
    if(userDetails.userDepartmentId !== 'NILL')
      userDetails.userDepartment = getDepartmentName(userDetails.userDepartmentId, this.departments);

    this.service.createUser(userDetails).subscribe(response =>{
      this.clearMessage();
      this.successMessage = response.message;
      this.userForm.reset();
    },
    error=>{
      this.clearMessage();
      this.errorMessage = error.errorMessage;
    })
  };

  clearMessage(){
    this.errorMessage = "";
    this.successMessage = "";
  };

}
