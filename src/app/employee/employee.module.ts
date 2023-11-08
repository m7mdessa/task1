import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProfileComponent

  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule
    
  ]
})
export class EmployeeModule { }
