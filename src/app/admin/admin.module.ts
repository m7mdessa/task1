import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EmployeesComponent } from './employees/employees.component';
import { DepartmentsComponent } from './departments/departments.component';
import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersLoginsComponent } from './userslogins/userslogins.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { RolesComponent } from './roles/roles.component';


@NgModule({
  declarations: [
    EmployeesComponent,
    DepartmentsComponent,
    NavComponent,
    SidebarComponent,
    UsersLoginsComponent,
    DashboardComponent,
    ProfileComponent,
    RolesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule

  ]
})
export class AdminModule { }
