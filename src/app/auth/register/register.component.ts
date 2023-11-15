
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { of } from 'rxjs/internal/observable/of';
import { AuthService } from 'src/app/service/auth.service';
import { DepartmentService } from 'src/app/service/department.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent implements OnInit{
  
  departments: any[] = [];
  usernameMessage: string ='';
  emailMessage: string ='';
  usernameAlreadyExists: boolean = false;
  emailAlreadyExists: boolean = false;
  registerSuccess: boolean = false;

  constructor( private router: Router, private authService: AuthService,private departmentService: DepartmentService,private toastr: ToastrService) {}
  
  ngOnInit() {
    
    }

  registerForm :FormGroup = new FormGroup({

    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
    phone:new FormControl( '', [Validators.required, ]),
    password:new FormControl( '', [Validators.required, Validators.minLength(8), ]),
    repeatPassword: new FormControl('', [Validators.required, Validators.minLength(8) ]),

  })

  matchError() {
    if (this.registerForm.controls['password'].value === this.registerForm.controls['repeatPassword'].value) {
      this.registerForm.controls['repeatPassword'].setErrors(null);
    } else {
      this.registerForm.controls['repeatPassword'].setErrors({ misMatch: true });
    }
  }
  
  register(): void {
    //this.showValidations = true;
   // this.registerSuccess = false;
    this.usernameAlreadyExists = false;
    this.emailAlreadyExists = false;
//debugger;
  
    this.authService.Register(this.registerForm.value).subscribe(
      
      (res: any) => {
        //debugger;
        this.toastr.success('User Added successfully.', 'Success');
        this.router.navigate(['auth/login']);
          this.registerForm.reset();
  
      },
      (error: HttpErrorResponse) => {
      //  debugger;
        this.registerSuccess = false;
        console.log(error);

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
      }
    );
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

