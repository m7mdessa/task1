
import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
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
  constructor( private router: Router, private authService: AuthService,private toastr: ToastrService) {}
 
  registerForm :FormGroup = new FormGroup({

    username: new FormControl('', Validators.required),
    email:new FormControl( '', [Validators.required, ]),
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

    this.authService.Register(this.registerForm.value).subscribe((resp:any)=>{

      this.toastr.success('User Added successfully.', 'Success');
      this.router.navigate(['auth/login']);
        this.registerForm.reset();


    },err=>{
      
      this.toastr.error('Something went wrong !!', 'error');

    });
  }
 

  ngOnInit(): void {
    this.registerForm  = new FormGroup({
      username : new FormControl('',Validators.required),
      email:new FormControl ('',[Validators.required,Validators.email]),
      password:new FormControl  ('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/)]),
      repeatPassword:new FormControl  ('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/)])
    })
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

