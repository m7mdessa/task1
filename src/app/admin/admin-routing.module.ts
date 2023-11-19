import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { DepartmentsComponent } from './departments/departments.component';
import { UsersLoginsComponent } from './userslogins/userslogins.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [  

{path:'Employees', component:EmployeesComponent},

{path:'', component:DashboardComponent},

{path:'profile', component:ProfileComponent},

{path:'Departments', component:DepartmentsComponent},

{path:'Users-Logins', component:UsersLoginsComponent},

{path:'Roles', component:RolesComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
