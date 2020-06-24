import { Injectable } from '@angular/core';
import { Router, CanActivateChild, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivateChild, CanActivate{
  constructor(private route: Router) { }
  
  canActivate():boolean{
    if(localStorage.getItem("TOKEN") === null ){
      return true;
    }
    this.route.navigate(['/home']);
    return false; 
   
  }

  canActivateChild():boolean{
    if(localStorage.getItem("TOKEN") === null ){
      this.route.navigate(['/auth/login']);
      return false; 
    }
    return true;
  }
  
}
