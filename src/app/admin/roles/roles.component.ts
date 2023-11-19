import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  @ViewChild('callCreateDialog') callCreateDialog! :TemplateRef<any>
  @ViewChild('callDeleteDailog') callDelete!:TemplateRef<any>
  @ViewChild('callEditDailog') callEditDailog!:TemplateRef<any>
  @ViewChild('callDetailDailog') callDetailDailog!:TemplateRef<any>

    Roles: any[] = [];
    Role: any;
  

    constructor(private RoleService: RoleService,  private toastr: ToastrService,private dialog:MatDialog) {}
  
 
    ngOnInit(): void {
      this.getRoles();

    }
    
    getRoles() {
      this.RoleService.getRoles().subscribe((Roles) => {
        this.Roles = Roles;
      });
  
    }
 
    form :FormGroup = new FormGroup({
      roleName: new FormControl('',[Validators.required]),
    });
    
    edit :FormGroup = new FormGroup({
      roleId: new FormControl(''),
      roleName: new FormControl('',[Validators.required]),

    });

OpenDialogAdd(){
    
  this.dialog.open(this.callCreateDialog);
  
  }
  OpenDialogDetail(id:number){
    
    this.dialog.open(this.callDetailDailog);
    this.RoleService.getRole(id).subscribe( (Role) => {
        this.Role = Role;
      
      });  
    }


  openEditDailog(Role: any){
    this.edit.setValue({
      roleId: Role.roleId,
      roleName: Role.roleName,
    
    });
    const dialogRef= this.dialog.open(this.callEditDailog);
    dialogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined)
       {
        if (result == 'yes') {
          this.RoleService.updateRole(this.edit.value).subscribe(
            (response) => {
              console.log( this.edit.value);
      
              console.log('Role updated successfully:', response);
              this.toastr.success('Role updated successfully.', 'Success');
              this.getRoles(); 
              this.dialog.closeAll();      
    
            
            },
            (error) => {
              console.log( this.edit.value);
      
              console.log('Error while update Role:', error);
                this.toastr.error('Error while update Role.', 'Error'); 
      
            }
          );       
        } else if (result == 'no') {
          console.log("Thank you");
        }
        
           
       }
 
    })
   }

  openDeleteDailog(id:number){
    console.log(id)

    const dialogRef= this.dialog.open(this.callDelete);
    dialogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined)
       {
        if (result == 'yes') {
          this.RoleService.deleteRole(id).subscribe(
            () => {
              this.Roles = this.Roles.filter((Role) => Role.id !== id);
              console.log('Role deleted successfully.');
              this.toastr.success('Role deleted successfully.', 'Success');

              this.dialog.closeAll(); 
              this.getRoles();
     
            },
            (error) => {
              console.log('Error while deleting Role:', error);
            }
          );         
        } else if (result == 'no') {
          console.log("Thank you");
        }
        
           
       }
 
    })
   }

   addRole() {

      this.RoleService.addRole(this.form.value).subscribe((resp:any)=>{

        this.toastr.success('Role Added successfully.', 'Success');
        this.getRoles();
        this.dialog.closeAll();      
        this.form.reset();

      },err=>{
        
        this.toastr.error('Something went wrong !!', 'error');
  
      });
    }
   

  
  }