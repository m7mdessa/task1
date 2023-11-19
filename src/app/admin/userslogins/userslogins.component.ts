import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { UserLoginService } from 'src/app/service/userlogin.service';
import * as CryptoJS from 'crypto-js';

import { ToastrService } from 'ngx-toastr'; 
import { FormGroup, FormControl,Validators } from '@angular/forms';   
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/service/employee.service';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-users-logins',
  templateUrl: './userslogins.component.html',
  styleUrls: ['./userslogins.component.css'],

})
export class UsersLoginsComponent implements OnInit {
  @ViewChild('callCreateDialog') callCreateDialog! :TemplateRef<any>
  @ViewChild('callDeleteDailog') callDelete!:TemplateRef<any>
  @ViewChild('callEditDailog') callEditDailog!:TemplateRef<any>
  @ViewChild('callDetailDailog') callDetailDailog!:TemplateRef<any>

  Roles: any[] = [];
  Employees: any[] = [];
  User: any;
  users: any[] = [];
  hide = true;
  hidee = true;
  usernameAlreadyExists: boolean = false;

  constructor( private userLogin: UserLoginService,private RoleService: RoleService,private employeeService: EmployeeService,private toastr: ToastrService,private dialog:MatDialog) {}


  ngOnInit(): void {
    this.getUsers();
    this.getEmployees();
    this.getRoles();

  }

  form :FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    roleId: new FormControl('', [Validators.required]),
    employeeId: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),


  });

  edit :FormGroup  = new FormGroup({
    userId: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),

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
  getRoles() {
    this.RoleService.getRoles().subscribe((Roles) => {
      this.Roles = Roles;
    });

  }
  getEmployees() {
    this.employeeService.getEmployees().subscribe((Employee) => {
      this.Employees = Employee;
    });

  }

  getUsers() {
    this.userLogin.getUsers().subscribe((users) => {
      this.users = users;
    });

  }

  displayPassword(password: string): string {
    const hashedPassword = CryptoJS.SHA256(password).toString();
    return hashedPassword;
  }
 

    openEditDailog(user: any){
      this.edit.setValue({
        userId: user.userId,
        userName: user.userName,
     
      });
    
    const dialogRef= this.dialog.open(this.callEditDailog);
    dialogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined)
       {
        if (result == 'yes') {
          this.userLogin.updateUser(this.edit.value).subscribe(
            (response) => {
              console.log( this.edit.value);
      
              console.log('User name updated successfully:', this.edit.value);
              this.toastr.success('User updated successfully.', 'Success');
              this.getUsers(); 
      
              this.dialog.closeAll();
            
            },
            (error) => {
              console.log( this.edit.value);
      
              console.log('Error while update user:', error);
                this.toastr.error('Error while update user.', 'Error'); 
                if (error.error && error.error.error) {
                  if (error.error.error === 'username already exists') {
                    this.usernameAlreadyExists = true;
                  }
                
                } else {
                  console.log(error);
                }
            }
          );   
        } else if (result == 'no') {
          console.log("Thank you");
        }
        
           
       }
 
    })
   }
 
  
  OpenDialogDetail(id:number){
    
    this.dialog.open(this.callDetailDailog);
    this.userLogin.getUser(id).subscribe( (User) => {
        this.User = User;
      
      });  
    }

  openDeleteDailog(id:number){
    console.log(id)

    const dialogRef= this.dialog.open(this.callDelete);
    dialogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined)
       {
        if (result == 'yes') {
          this.userLogin.deleteUser(id).subscribe(
            () => {
              this.users = this.users.filter((user) => user.id !== id);
              console.log('User deleted successfully.');
              this.dialog.closeAll(); 
              this.getUsers();
     
            },
            (error) => {
              console.log('Error while deleting user:', error);
            }
          );         
        } else if (result == 'no') {
          console.log("Thank you");
        }
        
           
       }
 
    })
     
 
   }

  addUser(){
    console.log(this.form.value);
    this.userLogin.addUser(this.form.value).subscribe((_res:any) => {
         console.log('User created successfully!');
         this.toastr.success('User added successfully.', 'Success');
         this.getUsers(); 
         this.dialog.closeAll();
         this.form.reset();
          },
          (error) => {
            console.log( this.form.value);
            if (error.error && error.error.error) {
              if (error.error.error === 'username already exists') {
                this.usernameAlreadyExists = true;
              }
            
            } else {
              console.log(error);
            }
              this.toastr.error('Error while add user.', 'Error'); 
    
          });
          
  }


}
function hashPassword(password: any, string: any) {
  throw new Error('Function not implemented.');
}

