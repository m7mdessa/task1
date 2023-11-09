import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
//import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})


export class SidebarComponent implements OnInit {
  @ViewChild('callSearchDialog') callSearchDialog! :TemplateRef<any>
  @ViewChild('callSearchDialog') callDetailDailog! :TemplateRef<any>

  Employees: any[] = [];
  Employee: any;

  notifications: any[] = [];
  NumberOffNotifications: number =0;
  filterText:string='';
  constructor( private employeeService: EmployeeService,private router: Router,private dialog:MatDialog) {}
  ngOnInit(): void {
  this.getEmployees();

  }
  getEmployee(id:number){
    
    this.dialog.open(this.callDetailDailog);
    this.employeeService.getEmployee(id).subscribe( (Employee) => {
        this.Employee = Employee;
      });  
    }

getEmployees() {
    this.employeeService.getEmployees().subscribe((Employee) => {
      this.Employees = Employee;
    });

  }
  
  OpenDialogSearch(){
    
    this.dialog.open(this.callSearchDialog);
    
    }
  
   logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
  
}