
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class RoleService {


  constructor(private http: HttpClient) { }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7088/api/Role');
  }

  getRole(id: number): Observable<any> {
    return this.http.get<any>('https://localhost:7088/api/Role/GetRoleById/'+id);
  }


  addRole(Role: any): Observable<any>{

    return  this.http.post('https://localhost:7088/api/Role',Role);
 
  }

  updateRole(Role: any): Observable<any> {

    return this.http.put('https://localhost:7088/api/Role/Update/',Role);

  }

  deleteRole(id:number): Observable<any> {
    return this.http.delete('https://localhost:7088/api/Role/Delete/'+id);
  }

  
}
