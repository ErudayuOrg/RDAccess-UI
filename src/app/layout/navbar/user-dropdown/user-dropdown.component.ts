import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.css']
})
export class UserDropdownComponent{
  @Input() userName: any;
  constructor(private route: Router){}

  logout(){
    localStorage.clear();
    this.route.navigate(['auth/login']);
  }
}
