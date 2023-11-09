import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class employeeguardGuard implements CanActivate {
  constructor(private router: Router,private toastr: ToastrService,) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('token');
    console.log(state);
    if (token) {
      if (state.url.indexOf('employee') >= 0) {
        const user:any  = localStorage.getItem('user');
        const userData = JSON.parse(user);
        
        var roleId = userData.Role; 
        console.log(user,"user");
        console.log(roleId,"roleId");

          if (user === '2') {
             this.toastr.success('Welcome in employee pages ');
            return true;
          } 
        } else {
          this.router.navigate(['Notfound']);
        }
      
    

      return true;
    } 
    else {
      this.router.navigate(['']);
      this.toastr.warning('you are not autherize !!')
      return false;
    }
  }
}
