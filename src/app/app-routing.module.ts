import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
//import { AutherizationGuard } from './autherization.guard';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [

  {path:'admin', loadChildren:()=>AdminModule},

  {path:'employee', loadChildren:()=>EmployeeModule},

  {path:'auth', loadChildren:()=>AuthModule},
  
  { path:'',  component:LoginComponent},



  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
