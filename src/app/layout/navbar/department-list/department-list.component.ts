import { Component } from '@angular/core';

import { DEPARTMENTS } from './../../../keys/constant';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})

export class DepartmentListComponent{

  departments = DEPARTMENTS;

}
