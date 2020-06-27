import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnProfileGuardService } from '../../service/auth-guard.service';

import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  {
    path: '',
    component: UserPageComponent,
    canActivate :[OwnProfileGuardService],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [OwnProfileGuardService]
})

export class UserRoutingModule { }
