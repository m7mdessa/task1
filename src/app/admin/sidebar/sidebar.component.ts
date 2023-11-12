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

  Employees: any[] = [];
  Employee: any;
  departments: any[] = [];
  department: any;

  employeesAndDepartments: any[] = [];

  filterText:string='';
  constructor( private employeeService: EmployeeService,private departmentService: DepartmentService,private router: Router,private dialog:MatDialog) {}

  ngOnInit(): void {
  this.getEmployees();
  this.getDepartments();
  this.mergeData();

  }
  getEmployee(id:number){
    
    this.employeeService.getEmployee(id).subscribe( (Employee) => {
        this.Employee = Employee;
      });  
    }

    getDepartments() {
      this.departmentService.getDepartments().subscribe((departments) => {
        this.departments = departments;
        this.mergeData();

      });
  
    }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((Employee) => {
      this.Employees = Employee;
      this.mergeData();

    });

    }
    OpenEmployeeDetail(id:number){
    
      this.dialog.open(this.callDetailEmployee);
      this.employeeService.getEmployee(id).subscribe( (Employee) => {
          this.Employee = Employee;
        
        });  
      }

      OpenDepartmentDetail(id:number){
    
        this.dialog.open(this.callDetailDepartment);
        this.departmentService.getDepartment(id).subscribe( (department) => {
            this.department = department;
          
          });  
        }

        
  mergeData() {
    this.employeesAndDepartments = [...this.Employees, ...this.departments];
  }
  OpenDialogSearch(){
    
    this.dialog.open(this.callSearchDialog);
    
    }
  
   logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
  
}