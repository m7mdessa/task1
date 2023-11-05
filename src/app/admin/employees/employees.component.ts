
import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { ToastrService } from 'ngx-toastr'; 
import { FormGroup, FormControl,Validators } from '@angular/forms';   
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']

})
export class EmployeesComponent implements OnInit {
  @ViewChild('callCreateDialog') callCreateDialog! :TemplateRef<any>
  @ViewChild('callDeleteDailog') callDelete!:TemplateRef<any>
  @ViewChild('callEditDailog') callEditDailog!:TemplateRef<any>

  Employees: any[] = [];
  hide = true;
  hidee = true;
id :any
  constructor( private employeeService: EmployeeService,private toastr: ToastrService,private dialog:MatDialog) {}


  ngOnInit(): void {
    this.getEmployees();
  
  }

  form :FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('',[Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),


  });

  edit :FormGroup  = new FormGroup({
    id: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl(''),
    password: new FormControl('')

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
  getEmployees() {
    this.employeeService.getEmployees().subscribe((Employee) => {
      this.Employees = Employee;
    });

  }

  getRoleName(roleid: number): string {
    const roleMap: { [key: number]: string } = {
      1: 'Admin',
      2: 'User',
    };
    return roleMap[roleid] || 'Unknown'; 
  }

  displayPassword(password: string): string {
    return '*'.repeat(password.length); 
  }

  
  openEditDailog(user: any) {
    this.edit.setValue({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
    
    });
    this.dialog.open(this.callEditDailog);

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
    
          });
          
  }
  updateEmployee() {
    this.employeeService.updateEmployee(this.id, this.edit.value).subscribe(
      (response) => {
        console.log( this.edit.value);

        console.log('Employee name updated successfully:', response);
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
  }

}