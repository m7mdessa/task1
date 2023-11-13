
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class UsersService {


  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7088/api/Users');
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>('https://localhost:7088/api/Users/GetUserById/'+id);
  }


  addUser(user: any): Observable<any>{

    return  this.http.post('https://localhost:7088/api/Users',user);
 
  }

  updateUser(user: any): Observable<any> {

    return this.http.put('https://localhost:7088/api/Users/Update/',user);

  }

  deleteUser(id:number): Observable<any> {
    return this.http.delete('https://localhost:7088/api/Users/Delete/'+id);
  }

  
}
