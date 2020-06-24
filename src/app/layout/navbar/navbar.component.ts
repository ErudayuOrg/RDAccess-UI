import { Component, OnInit } from '@angular/core';

import { ApiClientService } from './../../service/api-client.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  departments:any;
  userName: string;

  constructor(private service:ApiClientService) { }

  ngOnInit(): void {
    this.service.getDepartments().subscribe(departments =>{
      let allDepartments = departments.map(
          dept => ({"departmentId" : dept.departmentId, "departmentName" :dept.departmentName})
      );
      this.departments = allDepartments;
      this.userName = localStorage.getItem('USERNAME');
    })
  }

}
