import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { UsersService } from 'src/app/service/users.service';

import { ToastrService } from 'ngx-toastr'; 
import { FormGroup, FormControl,Validators } from '@angular/forms';   
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],

})
export class UsersComponent implements OnInit {
  @ViewChild('callCreateDialog') callCreateDialog! :TemplateRef<any>
  @ViewChild('callDeleteDailog') callDelete!:TemplateRef<any>
  @ViewChild('callEditDailog') callEditDailog!:TemplateRef<any>

  users: any[] = [];
  hide = true;
  hidee = true;

  constructor( private usersService: UsersService,private toastr: ToastrService,private dialog:MatDialog) {}


  ngOnInit(): void {
    this.getUsers();
  
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
  getUsers() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });

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
          this.usersService.deleteUser(id).subscribe(
            () => {
              this.users = this.users.filter((user) => user.id !== id);
              console.log('User deleted successfully.');
              this.dialog.closeAll();      
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
    this.usersService.addUser(this.form.value).subscribe((_res:any) => {
         console.log('User created successfully!');
         this.toastr.success('User added successfully.', 'Success');
         this.getUsers(); 
         this.dialog.closeAll();
         this.form.reset();
          },
          (error) => {
            console.log( this.form.value);
    
            console.log('Error while add user:', error);
              this.toastr.error('Error while add user.', 'Error'); 
    
          });
          
  }


}
