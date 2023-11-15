import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { interval, takeWhile, timer } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})

export class ResetpasswordComponent implements OnInit{
  focus: any;
  focus2: any;
  timerValue: number = 0;

  constructor( private router: Router, private authService: AuthService,private toastr: ToastrService) {}
 
  

  ngOnInit() {
 
    interval(1000)
    .pipe(
      takeWhile(() => this.timerValue < 60)
    )
    .subscribe(() => {
      this.timerValue++;
    });
}
    

    resetpassword() {
      console.log(this.resetForm.value);
  
      this.authService.Resetpassword(this.resetForm.value).subscribe((resp:any)=>{
        this.toastr.success('Password reseted successfully.', 'Success');
        this.toLogin();
        this.resetForm.reset();
        this.verificationForm.reset();
  
      },err=>{
        
        this.toastr.error('Something went wrong !!', 'error');
  
      });
    }
   
    verificationForm :FormGroup = new FormGroup({
      verificationcode1: new FormControl(''),
      verificationcode2: new FormControl(''),
      verificationcode3: new FormControl(''),
      verificationcode4: new FormControl(''),
      verificationcode5: new FormControl(''),
      verificationcode6: new FormControl(''),
   
      
    })
   
    resetForm :FormGroup = new FormGroup({
      verificationcode:new FormControl( ''),
      newpassword:new FormControl( '', [Validators.required, Validators.minLength(8), ]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(8) ]),
      
    })
    matchError() {
      if (this.resetForm.controls['newpassword'].value === this.resetForm.controls['repeatPassword'].value) {
        this.resetForm.controls['repeatPassword'].setErrors(null);
      } else {
        this.resetForm.controls['repeatPassword'].setErrors({ misMatch: true });
      }
    }
    startTimer() {
      setInterval(() => {
        if (this.timerValue > 0) {
          this.timerValue--;
        } else {
          // Timer has reached 0, handle this case
        }
      }, 1000);
    }
    onCodeInput(position: number, event: Event) {
      const concatenatedValue = this.getConcatenatedVerificationCode();
      this.resetForm.get('verificationcode')?.setValue(concatenatedValue);
      const target = event.target as HTMLInputElement;
      const currentInputValue = target.value;
    
     if (currentInputValue.length === 1) {
         const nextPosition = position < 6 ? position + 1 : position;
         const nextControlName = `verificationcode${nextPosition}`;
          const nextControl = this.verificationForm.get(nextControlName);
    
       if (nextControl) {
            const nextInputElement = document.querySelector(`[formControlName="${nextControlName}"]`) as HTMLInputElement;
           if (nextInputElement) {
             nextInputElement.focus();
           }
          }
        }
     }
     
    getConcatenatedVerificationCode() {
      return [
        this.verificationForm.get('verificationcode1')?.value,
        this.verificationForm.get('verificationcode2')?.value,
        this.verificationForm.get('verificationcode3')?.value,
        this.verificationForm.get('verificationcode4')?.value,
        this.verificationForm.get('verificationcode5')?.value,
        this.verificationForm.get('verificationcode6')?.value,
      ].join('');
    }
  
  
  
  toLogin(){
    this.router.navigate(['auth/login']);
  }

}

