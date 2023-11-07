
import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { DepartmentService } from 'src/app/service/department.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent implements OnInit{
  test : Date = new Date();
  focus: any;
  focus1: any;
  focus2: any;
  departments: any[] = [];

  constructor( private router: Router, private authService: AuthService,private departmentService: DepartmentService,private toastr: ToastrService) {}
  
  ngOnInit(): void {
    this.getDepartments();
    }

  registerForm :FormGroup = new FormGroup({

    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email:new FormControl( '', [Validators.required, ]),
    password:new FormControl( '', [Validators.required, Validators.minLength(8), ]),
    repeatPassword: new FormControl('', [Validators.required, Validators.minLength(8) ]),
    departmentid: new FormControl('', [Validators.required]),

  })

  matchError() {
    if (this.registerForm.controls['password'].value === this.registerForm.controls['repeatPassword'].value) {
      this.registerForm.controls['repeatPassword'].setErrors(null);
    } else {
      this.registerForm.controls['repeatPassword'].setErrors({ misMatch: true });
    }
  }


  getDepartments() {
    this.departmentService.getDepartments().subscribe((departments) => {
      this.departments = departments;
      console.log("departments" ,departments)
    });

  }
  register() {

    this.authService.Register(this.registerForm.value).subscribe((resp:any)=>{

      this.toastr.success('User Added successfully.', 'Success');
      this.router.navigate(['auth/login']);
        this.registerForm.reset();


    },err=>{
      
      this.toastr.error('Something went wrong !!', 'error');

    });
  }
 
  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form submitted!', this.registerForm.value);
    }
  }
  toLogin(){
    this.router.navigate(['auth/login']);
  }

}

