
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class EmployeeService {


  constructor(private http: HttpClient) { }


 
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7088/api/Employee');
  }

  searchEmployees(searchTerm:any): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7088/api/Employee/Search/'+searchTerm);
  }
  
  getEmployee(id: number): Observable<any> {
    return this.http.get<any>('https://localhost:7088/api/Employee/GetEmployeeById/'+id);
  }


  addEmployee(Employee: any): Observable<any>{

    return  this.http.post('https://localhost:7088/api/Employee',Employee);
 
  }

  updateEmployee(Employee: any): Observable<any> {

    return this.http.put('https://localhost:7088/api/Employee/Update/',Employee);

  }

  deleteEmployee(id:number): Observable<any> {
    return this.http.delete('https://localhost:7088/api/Employee/Delete/'+id);
  }

  
}
