import { Component } from '@angular/core';
import { Address } from '../../../models/address';
import { Users } from '../../../models/Users';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {
  arrUsers:Users[]=[]
  arrAdd:Address[]=[]
  tempUser:Users = new Users('','','','','','',new Address('','','','','','',''),new Date)
  user:Users = new Users('','','','','','',new Address('','','','','','',''), new Date)
  tempAdd:Address = new Address('','','','','','','')
  updateUserForm:FormGroup;
  idup:string=''

  constructor(fb:FormBuilder,private us:UserService){
    this.updateUserForm = fb.group({
      'id':[0], 
      'firstName':[''],
      'lastName':[''],
      'DOB':[''],
     // 'role':[''],
      'email':[''],
      'password':[''],
      'houseno':[''],
      'street':[''],
      'area':[''],
      'city':[''],
      'pincode':[''],
      'country':['']
    });
    us.getUsers().subscribe(data=>{
      this.arrUsers = data
    })
  }
  OnSubmit(updateUserFormValue: any):void
  {
    console.log('Submited: ',updateUserFormValue)
    console.log(updateUserFormValue.firstName)
    this.tempAdd = new Address("1",updateUserFormValue.houseno,updateUserFormValue.street,updateUserFormValue.area,updateUserFormValue.city,updateUserFormValue.pincode,updateUserFormValue.country)
    this.tempUser = new Users(this.idup,updateUserFormValue.firstName,updateUserFormValue.lastName,'user',updateUserFormValue.email,updateUserFormValue.password,this.tempAdd,updateUserFormValue.DOB)
    this.us.UpdateUser(this.idup,this.tempUser).subscribe(data=>
      console.log("Updated",data)
    )
  }

  onChangeType(evt: any) {
    const selectedUserId = parseInt(evt.target.value, 10);
    this.idup = selectedUserId.toString();
  
    this.us.getUserById(this.idup).subscribe(data => {
      this.user = data;
      if (this.user) {
        this.updateUserForm.patchValue({
          id: this.user.id,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          DOB: this.user.DOB,
          //role: this.user.role,
          email: this.user.email,
          password: this.user.password,
          houseno: this.user.address.houseno,
          street: this.user.address.street,
          area: this.user.address.area,
          city: this.user.address.city,
          pincode: this.user.address.pincode,
          country: this.user.address.country
        });
      }
    });
  }
  
  
  
  
 }
