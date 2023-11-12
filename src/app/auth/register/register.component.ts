
import { Component, OnInit } from '@angular/core';
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
  errorMessage: string | undefined;

  constructor( private router: Router, private authService: AuthService,private departmentService: DepartmentService,private toastr: ToastrService) {}
  
  ngOnInit(): void {
    this.getDepartments();
    
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


  getDepartments() {
    this.departmentService.getDepartments().subscribe((departments) => {
      this.departments = departments;
      console.log("departments" ,departments)
    });

  }
  register() {
    const username = this.registerForm.get('username')?.value;

    this.authService.IsUsernameTaken(username).subscribe(
      (isUsernameTaken) => {
        console.log('Is Username Taken:', isUsernameTaken);

        if (isUsernameTaken) {
          this.errorMessage = 'Username is already taken.';
          console.log('Username is already taken.');
        } else {
          console.log('Proceeding with registration.');
          this.authService.Register(this.registerForm).subscribe(
            (resp: any) => {
              console.log('Registration successful:', resp);
              // Handle successful registration
            },
            (error) => {
              console.error('Error during registration:', error);
              // Handle registration error
            }
          );
        }
      },
      (error) => {
        console.error('Error checking username availability:', error);
        // Handle error while checking username availability
      }
    );
  }
  
  IsUsernameTaken() {
    const username = this.registerForm.get('username')?.value;
    if (username) {
      return this.authService.IsUsernameTaken(username);
    }
    return of(false); // Return a default value if username is not provided
  }
  
  IsEmailTaken() {
    const email = this.registerForm.get('email')?.value;
    if (email) {
      return this.authService.IsEmailTaken(email);
    }
    return of(false); // Return a default value if email is not provided
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

