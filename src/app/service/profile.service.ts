import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  upload_Image: any;

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

  UpdateEmployeeInfo(employee: any): Observable<any> {

    return this.http.put('https://localhost:7088/api/Profile/UpdateEmployeeInfo/', employee);

  }

  UpdateEmployeePassword(employee: any): Observable<any> {

    return this.http.put('https://localhost:7088/api/Profile/UpdateEmployeePassword/', employee);

  }

  
  UpdateImage(employee: any): Observable<any> {
    employee.image = this.upload_Image;

    return this.http.put('https://localhost:7088/api/Profile/UpdateImage/', employee);

  }

  uploadAttachment(file:FormData){
    this.http.post('https://localhost:7088/api/Profile/uploadImage' ,file).subscribe((resp:any)=>{
    this.upload_Image = resp.image; 
    },err=>{
      console.log('Something went wrong !!');
    })
  
  }
}
