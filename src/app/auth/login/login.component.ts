import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {
required: any;

  constructor(public authService: AuthService,private router: Router) {

  }
 

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  
  
  

  loginError: string | null = null; 

  login() {
    this.authService.Login(this.username, this.password)
    this.loginError = 'Invalid username or password';
  }

  toRegister(){
    this.router.navigate(['auth/register']);
  }
  toForgotPassword(){
    this.router.navigate(['auth/ForgotPassword']);
  }
}
