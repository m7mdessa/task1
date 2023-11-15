
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
  async register() {
    const username = this.registerForm.get('username')?.value;
    const email = this.registerForm.get('email')?.value;
  
    if (username && email) {
      try {

        await Promise.all([
          this.authService.IsUsernameTaken(username).toPromise(),
          this.authService.IsEmailTaken(email).toPromise()
        ]);
  
        await this.authService.Register(this.registerForm.value).toPromise();
  
        this.toastr.success('User Added successfully.', 'Success');
        this.router.navigate(['auth/login']);
        this.registerForm.reset();
      } catch (errorResponse:any) {
        console.error('Registration error:', errorResponse);
  
        if (errorResponse.error && errorResponse.error.usernameTaken) {
          this.registerForm.get('username')?.setErrors({ 'usernameTaken': true });
          this.usernameMessage = 'Username is already taken.';
        }
  
        if (errorResponse.error && errorResponse.error.emailTaken) {
          this.registerForm.get('email')?.setErrors({ 'emailTaken': true });
          this.emailMessage = 'Email is already taken.';
        }
  
        this.toastr.error('Registration failed. Please try again.', 'Error');
      }
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

