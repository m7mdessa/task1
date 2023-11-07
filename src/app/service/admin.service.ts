import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  [x: string]: any;
  constructor(private http: HttpClient) {}

  updateAdmin(admin: any): Observable<any> {
    return this.http.put<any>('https://localhost:7088/api/Admin/UpdateAdmin', admin);
  }

  getNumberOfUsers(): Observable<number> {
    return this.http.get<number>('https://localhost:7088/api/Admin/NumberOfUsers');
  }

  getNumberOfDepartments(): Observable<number> {
    return this.http.get<number>('https://localhost:7088/api/Admin/NumberOfDepartments');
  }
  
  GetNumberOfEmployees(): Observable<number> {
    return this.http.get<number>('https://localhost:7088/api/Admin/NumberOfEmployees');
  }
 

  
  
}
