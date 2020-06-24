import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './service/auth-guard.service';

import {ContentLayoutComponent} from "./layout/content-layout/content-layout.component";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent, canActivateChild:[AuthGuardService],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'department',
        loadChildren: () =>
          import('./modules/department/department.module').then(m => m.DepartmentModule)
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./modules/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'project',
        loadChildren: () =>
          import('./modules/project/project.module').then(m => m.ProjectModule)
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent, 
    canActivate :[AuthGuardService],
    loadChildren: () => 
      import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
