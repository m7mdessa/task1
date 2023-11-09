import { Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../service/employee.service';
import { DepartmentService } from '../service/department.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  constructor( private employeeService: EmployeeService, private departmentService: DepartmentService,private toastr: ToastrService) {}

  transform(value: any[], filterText: string) {
    if (value.length === 0 || filterText === '') {
      return value;
    } else {
      const filteredItems = value.filter((item) => {
        if (item.firstname) {

          const employeeName = item.firstname.toLowerCase();
          return employeeName.includes(filterText.toLowerCase());
        } else if (item.departmentname) {

          const departmentname = item.departmentname.toLowerCase();
          return departmentname.includes(filterText.toLowerCase());
        }
        return false;
      });

      if (filteredItems.length === 0) {
        this.toastr.warning('No matching employees or departments found', 'No Match');
      }

      return filteredItems;
    }
  }
}
