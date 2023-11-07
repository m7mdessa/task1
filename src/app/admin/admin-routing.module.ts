import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { DepartmentsComponent } from './departments/departments.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [  
{path:'', component:EmployeesComponent},

//{path:'profile', component:ProfileComponent},

{path:'Departments', component:DepartmentsComponent},

{path:'Users', component:UsersComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
