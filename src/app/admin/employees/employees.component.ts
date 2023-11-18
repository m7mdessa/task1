
import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { ToastrService } from 'ngx-toastr'; 
import { FormGroup, FormControl,Validators } from '@angular/forms';   
import { MatDialog } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']

})
export class EmployeesComponent implements OnInit {
  @ViewChild('callCreateDialog') callCreateDialog! :TemplateRef<any>
  @ViewChild('callDeleteDailog') callDelete!:TemplateRef<any>
  @ViewChild('callEditDailog') callEditDailog!:TemplateRef<any>
  @ViewChild('callDetailDailog') callDetailDailog!:TemplateRef<any>

  Employees: any[] = [];
  Employee: any;
  hide = true;
  hidee = true;
  departments: any[] = [];
  usernameAlreadyExists: boolean = false;
  emailAlreadyExists: boolean = false;
  isLinear = false;

  constructor( private employeeService: EmployeeService,private departmentService: DepartmentService, private toastr: ToastrService,private dialog:MatDialog) {}


  ngOnInit(): void {
    this.getEmployees();
    this.getDepartments();

  }

  form :FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required]),
    email: new FormControl('',[Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
    departmentId: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  edit :FormGroup  = new FormGroup({
    employeeId: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required]),
    email: new FormControl(''),
    departmentId: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),

  });

  matchError() {
    if (this.form.controls['password'].value === this.form.controls['confirmPassword'].value) {
      this.form.controls['confirmPassword'].setErrors(null);
    } else {
      this.form.controls['confirmPassword'].setErrors({ misMatch: true });
    }
  }

    OpenDialogAdd(){
    
  this.dialog.open(this.callCreateDialog);
  
  }
  OpenDialogDetail(id:number){
    
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

  
    getDepartments() {
      this.departmentService.getDepartments().subscribe((departments) => {
        this.departments = departments;
        console.log("departments" ,departments)
      });
  
    }
      
   
  openEditDailog(employee: any){
    this.edit.setValue({
      employeeId: employee.employeeId,
      firstName: employee.firstName,
      lastName: employee.lastName,
      salary: employee.salary,
      email: employee.email,
      departmentId: employee.departmentId,
      phone: employee.phone,
   

    });
    
    const dialogRef= this.dialog.open(this.callEditDailog);
    dialogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined)
       {
        if (result == 'yes') {
          this.employeeService.updateEmployee(this.edit.value).subscribe(
            (response) => {
              console.log( this.edit.value);
      
              console.log('Employee name updated successfully:', this.edit.value);
              this.toastr.success('Employee updated successfully.', 'Success');
              this.getEmployees(); 
      
              this.dialog.closeAll();
            
            },
            (error) => {
              console.log( this.edit.value);
      
              console.log('Error while update employee:', error);
                this.toastr.error('Error while update employee.', 'Error'); 
      
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
          this.employeeService.deleteEmployee(id).subscribe(
            () => {
              this.Employees = this.Employees.filter((Employee) => Employee.id !== id);
              console.log('Employee deleted successfully.');
              this.dialog.closeAll();  
              this.getEmployees(); 
    
            },
            (error) => {
              console.log('Error while deleting Employee:', error);
            }
          );         
        } else if (result == 'no') {
          console.log("Thank you");
        }
        
           
       }
 
    })
     
 
   }

  addEmployee(){
    console.log(this.form.value);
    this.employeeService.addEmployee(this.form.value).subscribe((_res:any) => {
         console.log('Employee created successfully!');
         this.toastr.success('Employee added successfully.', 'Success');
         this.getEmployees(); 
         this.dialog.closeAll();
         this.form.reset();
          },
          (error) => {
            console.log( this.form.value);
    
            console.log('Error while add employee:', error);
              this.toastr.error('Error while add employee.', 'Error'); 
              if (error.error && error.error.error) {
                if (error.error.error === 'username already exists') {
                  this.usernameAlreadyExists = true;
                }
                if (error.error.error === 'email already exists') {
                  this.emailAlreadyExists = true;
                }
              } else {
                console.log(error);
              }
    
          });
          
  }


}