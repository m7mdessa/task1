import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  updateAdmin(admin: any): Observable<any> {
    return this.http.put<any>('https://localhost:7088/api/Profile/UpdateAdmin/', admin);
  }
  GetProfileAdmin(id: any): Observable<any> {
    return this.http.get<any>('https://localhost:7088/api/Profile/GetProfileAdmin/'+id);
  }


  GetProfileEmployee(id: number): Observable<any> {
    return this.http.get<any>('https://localhost:7088/api/Profile/GetProfileEmployee/'+id);
  }

  UpdateEmployee(employee: any): Observable<any> {

    return this.http.put('https://localhost:7088/api/Profile/UpdateEmployee/', employee);

  }
}
