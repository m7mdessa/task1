import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
//import { AutherizationGuard } from './autherization.guard';

const routes: Routes = [

  {path:'admin', loadChildren:()=>AdminModule},

  {path:'employee', loadChildren:()=>EmployeeModule},

  {path:'auth', loadChildren:()=>AuthModule},



  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
