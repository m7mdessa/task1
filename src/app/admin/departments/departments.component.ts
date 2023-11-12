
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  @ViewChild('callCreateDialog') callCreateDialog! :TemplateRef<any>
  @ViewChild('callDeleteDailog') callDelete!:TemplateRef<any>
  @ViewChild('callEditDailog') callEditDailog!:TemplateRef<any>
  @ViewChild('callDetailDailog') callDetailDailog!:TemplateRef<any>

    departments: any[] = [];
    department: any;
    Employees: any[] = [];
    employeesAndDepartments: any[] = [];

    constructor( private employeeService: EmployeeService,private departmentService: DepartmentService,  private toastr: ToastrService,private dialog:MatDialog) {}
  
 
    ngOnInit(): void {
      this.getDepartments();
        this.mergeData();

    }
    
    getDepartments() {
      this.departmentService.getDepartments().subscribe((departments) => {
        this.departments = departments;
      });
  
    }
    getEmployees() {
      this.employeeService.getEmployees().subscribe((Employee) => {
        this.Employees = Employee;
      });
  
    }
    mergeData() {
      this.employeesAndDepartments = [...this.Employees, ...this.departments];
    }
    form :FormGroup = new FormGroup({
      departmentname: new FormControl('',[Validators.required]),
      departmentlocation: new FormControl('',[Validators.required])
    });
    
    edit :FormGroup = new FormGroup({
      departmentid: new FormControl(''),
      departmentname: new FormControl('',[Validators.required]),
      departmentlocation: new FormControl('',[Validators.required])

    });

OpenDialogAdd(){
    
  this.dialog.open(this.callCreateDialog);
  
  }
  OpenDialogDetail(id:number){
    
    this.dialog.open(this.callDetailDailog);
    this.departmentService.getDepartment(id).subscribe( (department) => {
        this.department = department;
      
      });  
    }


  openEditDailog(department: any){
    this.edit.setValue({
      departmentid: department.departmentid,
      departmentname: department.departmentname,
      departmentlocation: department.departmentlocation,
    
    });
    const dialogRef= this.dialog.open(this.callEditDailog);
    dialogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined)
       {
        if (result == 'yes') {
          this.departmentService.updateDepartment(this.edit.value).subscribe(
            (response) => {
              console.log( this.edit.value);
      
              console.log('Department updated successfully:', response);
              this.toastr.success('Department updated successfully.', 'Success');
              this.getDepartments(); 
              this.dialog.closeAll();      
    
            
            },
            (error) => {
              console.log( this.edit.value);
      
              console.log('Error while update Department:', error);
                this.toastr.error('Error while update Department.', 'Error'); 
      
            }
          );       
        } else if (result == 'no') {
          console.log("Thank you");
        }
        
           
       }
 
    })
   }

  openDeleteDailog(id:number){
    console.log(id)

    const dialogRef= this.dialog.open(this.callDelete);
    dialogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined)
       {
        if (result == 'yes') {
          this.departmentService.deleteDepartment(id).subscribe(
            () => {
              this.departments = this.departments.filter((department) => department.id !== id);
              console.log('department deleted successfully.');
              this.toastr.success('Department deleted successfully.', 'Success');

              this.dialog.closeAll(); 
              this.getDepartments();
     
            },
            (error) => {
              console.log('Error while deleting department:', error);
            }
          );         
        } else if (result == 'no') {
          console.log("Thank you");
        }
        
           
       }
 
    })
   }

   addDepartment() {

      this.departmentService.addDepartment(this.form.value).subscribe((resp:any)=>{

        this.toastr.success('Department Added successfully.', 'Success');
        this.getDepartments();
        this.dialog.closeAll();      
        this.form.reset();

      },err=>{
        
        this.toastr.error('Something went wrong !!', 'error');
  
      });
    }
   

  
  }
  

