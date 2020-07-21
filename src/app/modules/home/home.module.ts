import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './page/home.component';
import { SharedComponentModule } from '../../shared-components/shared-component.module';



@NgModule({
  declarations: [
    HomeComponent
    ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedComponentModule
  ]
})
export class HomeModule { }
