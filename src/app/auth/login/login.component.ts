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

  constructor(public authService: AuthService,private router: Router) {

  }
  focus: any;
focus1: any;
  hide = true;

  username:FormControl = new FormControl('',[Validators.required]);
  password:FormControl= new FormControl('');
  
  
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
