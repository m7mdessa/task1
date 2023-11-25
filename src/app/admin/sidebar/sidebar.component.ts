import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';
//import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})


export class SidebarComponent implements OnInit {
  @ViewChild('callSearchDialog') callSearchDialog! :TemplateRef<any>
  @ViewChild('callDetailEmployee') callDetailEmployee! :TemplateRef<any>
  @ViewChild('callDetailDepartment') callDetailDepartment! :TemplateRef<any>

  employees: any[] = [];
  employee: any;
  noResultsMessage: string = '';
  searchTerm: string = '';

  constructor( private employeeService: EmployeeService,private departmentService: DepartmentService,private router: Router,private dialog:MatDialog) {}

  ngOnInit(): void {
  this.searchEmployees();

  }

 searchEmployees()
  {
  
    if (this.searchTerm.trim() === '')
    {
        this.employees = [];
        return;
    }
  
    this.employeeService.searchEmployees(this.searchTerm).subscribe((Employee) => {
      this.employees = Employee;
      if (this.employees.length === 0) {
        this.noResultsMessage = 'No results found.';
      } else {
        this.noResultsMessage = '';
      }

    });
  }


    OpenEmployeeDetail(id:number)
    {
    
      this.dialog.open(this.callDetailEmployee);
      this.employeeService.getEmployee(id).subscribe( (employee) => {
          this.employee = employee;
        
        });  
    }
 
  OpenDialogSearch()
  {
    this.dialog.open(this.callSearchDialog);
  } 
  
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
  
}