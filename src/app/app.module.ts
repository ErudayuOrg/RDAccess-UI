import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { ApiClientService } from './service/api-client.service';
import { AuthGuardService } from './service/auth-guard.service';
import { GlobalStoreService } from './service/global-store.service';

import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { UserDropdownComponent } from './layout/navbar/user-dropdown/user-dropdown.component';
import { DepartmentListComponent } from './layout/navbar/department-list/department-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    ContentLayoutComponent,
    NavbarComponent,
    UserDropdownComponent,
    DepartmentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    ApiClientService,
    AuthGuardService, 
    GlobalStoreService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 