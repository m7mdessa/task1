
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  @ViewChild('callEditDailog') callEditDailog!:TemplateRef<any>

  profile: any[] = [];

  constructor(private admin: ProfileService,private toastr: ToastrService,private dialog:MatDialog ) {}

  
  ngOnInit(): void {
  
    this.getProfile();
  }


  updateForm : FormGroup = new FormGroup({
    
    userid: new FormControl(),
   // image: new FormControl([Validators.required]),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),


   });


 matchError() {
    if (this.updateForm.controls['password'].value === this.updateForm.controls['confirmPassword'].value) {
      this.updateForm.controls['confirmPassword'].setErrors(null);
    } else {
      this.updateForm.controls['confirmPassword'].setErrors({ misMatch: true });
    }
  }


   
  updateAdmin() {
    
    const user = localStorage.getItem('user');
    if (user !== null) {

      const userData = JSON.parse(user);
    
      var userId = userData.UserId;
    
    } else {
      console.log('No user data found in local storage.');
    }
    this.updateForm.get('userid')?.setValue(userId);
    this.admin.updateAdmin(this.updateForm.value).subscribe(
      (responsee) => {
        console.log( this.updateForm.value);

        console.log('User updated successfully:', responsee);
        this.toastr.success('User updated successfully.', 'Success');
         this.updateForm.reset();
         this.dialog.closeAll();      
 
      
      },
      (error) => {
        console.log( this.updateForm.value);

        console.log('Error while update User :', error);
          this.toastr.error('Error while update User .', 'Error'); 

      }
    );
  }

  getProfile() {
    const user = localStorage.getItem('user');
    if (user !== null) {

      const userData = JSON.parse(user);
    
      var userId = userData.UserId;
    
    } else {
      console.log('No user data found in local storage.');
    }
    this.admin.GetProfileAdmin(userId).subscribe((profile) => {
      this.profile = profile;
      console.log('profile',profile);

    });
  }
  openEditDailog() {
  
    this.dialog.open(this.callEditDailog);

  }
  
 


}
