import { Component, OnInit } from '@angular/core';

import {ApiClientService} from '../../../service/api-client.service';
import { SocketService } from './../../../service/socket.service';

import { RD_CONSTANT } from '../../../keys/constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  departmentSnapshot: any;
  overAllSnapshot:any;
  constructor(private service: ApiClientService, private socket:SocketService) { }

  ngOnInit(): void {
    this.socket.getNotification().subscribe(msg=>{
      console.log('got a msg: ' + msg);
    })

    this.service.getDepartmentSnapshot().subscribe( response => {
        this.departmentSnapshot = response;
        this.departmentSnapshot.forEach( dept =>{
          dept.completedCount = Math.floor((Math.random() * 90) + 1);
          dept.onGoingCount = Math.floor((Math.random() * 80) + 1);
          dept.contributors = Math.floor((Math.random() * 40) + 1);
        })
    });
    this.service.getOverAllSnapshot().subscribe( response=>{
      this.overAllSnapshot = [{
        tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.LABS,
        tileCount:response.researchLabs
      },
      {
        tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.PROJECTS,
        tileCount:'500+'
      },
      {
        tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.PUBLICATIONS,
        tileCount:'100+'
      },
      {
        tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.MOUS,
        tileCount:'50+'
      }
    ]

    });
  }

}
