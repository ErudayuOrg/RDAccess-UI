import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GlobalStoreService {
    private userId:string; 
    private userDesignationCode:string;
    private userDepartmentId:string;
    constructor(){

    }
    getGlobalStore(){
        return {userId:this.userId,
            userDesignationCode:this.userDesignationCode,
            userDepartmentId:this.userDepartmentId}
    }
    setGlobalStore({userId, userDesignationCode, userDepartmentId}){
        this.userId = userId;
        this.userDesignationCode = userDesignationCode;
        this.userDepartmentId = userDepartmentId;
    }
    clearGlobalStore(){
        this.userId = "";
        this.userDesignationCode = "";
        this.userDepartmentId = "";
    }

}