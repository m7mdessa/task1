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
  

  }

   logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
  
}