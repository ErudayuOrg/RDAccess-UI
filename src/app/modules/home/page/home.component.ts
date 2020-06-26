import { Component, OnInit } from '@angular/core';

import {ApiClientService} from '../../../service/api-client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  departmentSnapshot: any;
  overAllSnapshot:any;
  constructor(private service: ApiClientService) { }

  ngOnInit(): void {
    this.service.getDepartmentSnapshot().subscribe( response => {
        this.departmentSnapshot = response;
    });
    this.service.getOverAllSnapshot().subscribe( response=>{
      this.overAllSnapshot = response;
    });
  }

}
