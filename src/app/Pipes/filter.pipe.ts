import { Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../service/employee.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  constructor(private employeeService:EmployeeService,private toastr: ToastrService) { }

  transform(value: any[], filterText:string) {

    if(value.length==0||filterText=='')
    return value;
    else {
      const filteredEmployees = value.filter((employee) => {
        return employee.firstname.toLowerCase().includes(filterText.toLowerCase());
      });
   
      if (filteredEmployees.length === 0) {
        this.toastr.warning('No Employee found with this name', 'No Match');
      }
   
      return filteredEmployees;
    }
  }

}
