import { Component, OnInit , ElementRef, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('reportTable', { static: true }) reportTable: ElementRef | undefined;
  numberOfUsers: number = 0;
  numberOfDepartments: number = 0;
  numberOfEmployees: number = 0;
  constructor(private adminService: AdminService) {}

  
  ngOnInit(): void {
    this.getNumberOfUsers();
    this.GetNumberOfEmployees();
    this.getNumberOfDepartments();
  

  }

  getNumberOfUsers() {
    this.adminService.getNumberOfUsers().subscribe(
      (numberOfUsers) => {
        this.numberOfUsers = numberOfUsers;
      },
      (error) => {
        console.error('Error while fetching number of users:', error);
      }
    );
  }
  getNumberOfDepartments() {
    this.adminService.getNumberOfDepartments().subscribe(
      (numberOfDepartments) => {
        this.numberOfDepartments = numberOfDepartments;
      },
      (error) => {
        console.error('Error while fetching number of Departments:', error);
      }
    );
  }
  
  GetNumberOfEmployees() {
    this.adminService.GetNumberOfEmployees().subscribe(
      (numberOfEmployees) => {
        this.numberOfEmployees = numberOfEmployees;
      },
      (error) => {
        console.error('Error while fetching number of Employees:', error);
      }
    );
  }


 
}