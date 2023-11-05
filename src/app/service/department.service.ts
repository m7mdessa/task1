
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class DepartmentService {


  constructor(private http: HttpClient) { }

  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7225/api/Department');
  }

  getDepartment(id: number): Observable<any> {
    return this.http.get<any>('https://localhost:7225/api/Department/GetDepartmentById/'+id);
  }


  addDepartment(department: any): Observable<any>{

    return  this.http.post('https://localhost:7225/api/Department',department);
 
  }

  updateDepartment(id: number,department: any): Observable<any> {

    return this.http.put('https://localhost:7225/api/Department/Update/'+id,department);

  }

  deleteDepartment(id:number): Observable<any> {
    return this.http.delete('https://localhost:7225/api/Department/Delete/'+id);
  }

  
}
