import { Component, Input } from '@angular/core';
import { Users } from '../../../models/Users';
import { Address } from '../../../models/address';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

export function DOBValidator (control: AbstractControl): ValidationErrors | null { 
  const eighteenYearsInMillis = 5.67648e11;
  let birthDate = new Date(control.value);
  //console.log(birthDate);
  if (new Date().getTime() - new Date(birthDate).getTime() <= eighteenYearsInMillis)
  return { invalidDOB: true };
  return null;
  }

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

  @Input() defaultValue: string | undefined;
  @Input() disableRole: boolean = false;
  arrUsers:Users[]=[]
  arrAdd:Address[]=[]
  tempUser:Users = new Users('','','','','','',new Address('','','','','','',''),new Date)
  tempAdd:Address = new Address('','','','','','','')
  addUserForm:FormGroup;
  firstName: AbstractControl;
  lastName: AbstractControl;
  DOB: AbstractControl;
 // role: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  cpassword: AbstractControl;
  houseno: AbstractControl;
  street: AbstractControl;
  area: AbstractControl;
  city: AbstractControl;
  pincode: AbstractControl;
  country: AbstractControl;

  constructor(fb:FormBuilder,private us:UserService,private route: ActivatedRoute){
    this.addUserForm = fb.group({
      'firstName':['',Validators.required],
      'lastName':['',Validators.required],
      'DOB':['',Validators.compose([Validators.required,DOBValidator])],
     // 'role': [this.defaultValue || '', Validators.required],
      'email':['',Validators.required],
      'password':['',Validators.required],
      'cpassword':['',[Validators.required, this.confirmPasswordValidator.bind(this)]],
      'houseno':['',Validators.required],
      'street':['',Validators.required],
      'area':['',Validators.required],
      'city':['',Validators.required],
      'pincode':['',Validators.required],
      'country':['',Validators.required]
    });
    this.firstName = this.addUserForm.controls['firstName']
    this.lastName = this.addUserForm.controls['lastName'];
    this.DOB = this.addUserForm.controls['DOB'];
    
    this.email = this.addUserForm.controls['email'];
    this.password = this.addUserForm.controls['password'];
    this.cpassword = this.addUserForm.controls['cpassword'];
    this.houseno = this.addUserForm.controls['houseno'];
    this.street = this.addUserForm.controls['street'];
    this.area = this.addUserForm.controls['area'];
    this.city = this.addUserForm.controls['city'];
    this.pincode = this.addUserForm.controls['pincode'];
    this.country = this.addUserForm.controls['country'];

    this.route.queryParams.subscribe(params => {
      const defaultValue = params['defaultValue'];
      if (defaultValue) {
        this.addUserForm.patchValue({
          role: defaultValue,
        });
        this.addUserForm.get('role')?.disable(); 
      }
    });
    
  }
  ngOnInit() {
    console.log('defaultValue:', this.defaultValue);
    console.log('disableRole:', this.disableRole);
  }

  confirmPasswordValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.root.get('password');
    const confirmPassword = control.value;

    if (password && confirmPassword !== password.value) {
      return { passwordMismatch: true };
    }

    return null;
  }

  OnSubmit(addUserFormValue: any): void {
    if (this.addUserForm.invalid) {
      return;
    }
  
    if (this.addUserForm.hasError('passwordMismatch')) {
      return;
    }
    this.us.getUsers().subscribe(data=>{
      const Lid = Math.max(...data.map(item=>parseInt(item.id)))+1

      console.log('Submited: ',addUserFormValue)
      console.log(addUserFormValue.firstName)
     
      //var datePipe = new DatePipe("");
      //addUserFormValue.DOB = datePipe.transform(addUserFormValue.DOB, 'dd/MM/yyyy');
      this.tempAdd = new Address("1",addUserFormValue.houseno,addUserFormValue.street,addUserFormValue.area,addUserFormValue.city,addUserFormValue.pincode,addUserFormValue.country)
      this.tempUser = new Users(Lid.toString(),addUserFormValue.firstName,addUserFormValue.lastName,'user',addUserFormValue.email,addUserFormValue.password,this.tempAdd,addUserFormValue.DOB)
      this.us.AddUser(this.tempUser).subscribe(data=>{
        console.log(data)
      })
    })
    
  }
}
