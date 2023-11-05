import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})


export class SidebarComponent implements OnInit {

  notifications: any[] = [];
  NumberOffNotifications: number =0;

  constructor( private router: Router) {}
  ngOnInit(): void {
  
//this.GetAllNotifications();
   // this.GetNumberOfNotifications();

  }

  //GetAllNotifications() {
   //this.adminService.GetAllNotifications().subscribe(
      //(notifications) => {
       // this.notifications = notifications;
     
     // },
    //  (error) => {
       // console.error('Error while fetching notifications:', error);
    //  }
      
    //); 
    
  // }
   logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
   //GetNumberOfNotifications() {
   // this.adminService.GetNumberOfNotifications().subscribe(
   //   (NumberOffNotifications) => {
       // this.NumberOffNotifications = NumberOffNotifications;
      //},
    //  (error) => {
      //  console.error('Error while fetching number of notifications:', error);
    //  }
    //);
  //}
}