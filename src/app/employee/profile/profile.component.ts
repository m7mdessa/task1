
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/service/employee.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  profile: any;

  constructor(private employee: ProfileService,private employeeService: EmployeeService,private toastr: ToastrService,private dialog:MatDialog ) {}

  
  ngOnInit(): void {
  
    this.getProfile();
  }


  infoForm : FormGroup = new FormGroup({
    
    id: new FormControl(),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),


   });

   passwordForm : FormGroup = new FormGroup({ 
    id: new FormControl(),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
   });

   imageForm : FormGroup = new FormGroup({
    id: new FormControl(),
    image: new FormControl('', [Validators.required]),
   });


 matchError() {
    if (this.passwordForm.controls['password'].value === this.passwordForm.controls['confirmPassword'].value) {
      this.passwordForm.controls['confirmPassword'].setErrors(null);
    } else {
      this.passwordForm.controls['confirmPassword'].setErrors({ misMatch: true });
    }
  }

 

  UpdateEmployeePassword(){
    
    const employee = localStorage.getItem('user');
    if (employee !== null) {

      const employeeData = JSON.parse(employee);
    
      var employeeId = employeeData.EmployeeId;
    
    } else {
      console.log('No user data found in local storage.');
    }
    
    this.passwordForm.get('id')?.setValue(employeeId);
    this.employee.UpdateEmployeePassword(this.passwordForm.value).subscribe(
      (responsee) => {
        console.log( this.passwordForm.value);

        console.log('User updated successfully:', responsee);
        this.toastr.success('User updated successfully.', 'Success');
         this.passwordForm.reset();
         this.getProfile();      
 
      
      },
      (error) => {
        console.log( this.passwordForm.value);

        console.log('Error while update User :', error);
          this.toastr.error('Error while update User .', 'Error'); 

      }
    );
  }
  UpdateImage() {
    
    const employee = localStorage.getItem('user');
    if (employee !== null) {

      const employeeData = JSON.parse(employee);
    
      var employeeId = employeeData.EmployeeId;
    
    } else {
      console.log('No user data found in local storage.');
    }
    
    this.imageForm.get('id')?.setValue(employeeId);
    this.employee.UpdateImage(this.imageForm.value).subscribe(
      (responsee) => {
        console.log( this.imageForm.value);

        console.log('Image updated successfully:', responsee);
        this.toastr.success('Image updated successfully.', 'Success');
         this.imageForm.reset();
         this.getProfile();      
 
      
      },
      (error) => {
        console.log( this.imageForm.value);

        console.log('Error while update Image :', error);
          this.toastr.error('Error while update Image .', 'Error'); 

      }
    ); 
  }
  UpdateEmployeeInfo() {
    
    const employee = localStorage.getItem('user');
    if (employee !== null) {

      const employeeData = JSON.parse(employee);
    
      var employeeId = employeeData.EmployeeId;
    
    } else {
      console.log('No user data found in local storage.');
    }
    
    this.infoForm.get('id')?.setValue(employeeId);
    this.employee.UpdateEmployeeInfo(this.infoForm.value).subscribe(
      (responsee) => {
        console.log( this.infoForm.value);

        console.log('User updated successfully:', responsee);
        this.toastr.success('User updated successfully.', 'Success');
         this.infoForm.reset();
         this.getProfile();      
 
      
      },
      (error) => {
        console.log( this.infoForm.value);

        console.log('Error while update User :', error);
          this.toastr.error('Error while update User .', 'Error'); 

      }
    );
  }

  getProfile() {
    const employee = localStorage.getItem('user');
    if (employee !== null) {

      const employeeData = JSON.parse(employee);
    
      var id = employeeData.EmployeeId;
    
    } else {
      console.log('No user data found in local storage.');
    }
    this.employeeService.getEmployee(id).subscribe((profile) => {
      this.profile = profile;
      console.log('profile',profile);

    });
  }
  
 
  UploadImage(file:any)
  {
  if(file.length==0)
  return ; 
  let fileToUpload=<File>file[0];
  const formDate=new FormData();
  formDate.append('file',fileToUpload,fileToUpload.name);
  this.employee.uploadAttachment(formDate);
  }
   
 


}
