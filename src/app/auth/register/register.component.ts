
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
  usernameMessage: string | undefined;
  emailMessage: string | undefined;

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

  register() {

    const username = this.registerForm.get('username')?.value;
    const email = this.registerForm.get('email')?.value;

  if(username){

  
    this.authService.IsUsernameTaken(username).subscribe(
      (resp: any) => {
        this.authService.Register(this.registerForm.value).subscribe(
          (registrationResp: any) => {
            this.toastr.success('User Added successfully.', 'Success');
            this.router.navigate(['auth/login']);
            this.registerForm.reset();
          },
          (registrationErr) => {
            console.error('Registration error:', registrationErr);
            this.toastr.error('Registration failed. Please try again.', 'Error');
          }
        );
      },
      (usernameTakenErr) => {
        this.registerForm.get('username')?.setErrors({ 'usernameTaken': true });

        this.usernameMessage ='username is already taken'
        console.log(this.usernameMessage); 
      // this.toastr.error('Username is already taken. Please choose another one.', 'Error');

      }
    );
  }

  if(email){

  
    this.authService.IsEmailTaken(email).subscribe(
      (resp: any) => {
        this.authService.Register(this.registerForm.value).subscribe(
          (registrationResp: any) => {
            this.toastr.success('User Added successfully.', 'Success');
            this.router.navigate(['auth/login']);
            this.registerForm.reset();
          },
          (registrationErr) => {
            console.error('Registration error:', registrationErr);
            this.toastr.error('Registration failed. Please try again.', 'Error');
          }
        );
      },
      (emailTakenErr) => {
        this.registerForm.get('email')?.setErrors({ 'emailTaken': true });

        this.emailMessage ='email is already taken.'
        console.log(this.emailMessage); 
      // this.toastr.error('Username is already taken. Please choose another one.', 'Error');

      }
    );
  }




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

