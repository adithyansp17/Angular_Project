import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../../models/Users';
import { Address } from '../../models/address';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactUsComponent  implements OnInit, OnChanges {
 
  @Input() user: Users = {
    id: '',
    firstName: '',
    lastName:'',
    email: '',
    role:'user',
    password:"",
    DOB:new Date,
    address:new Address('','','','','','','')

  };

  @Output() save = new EventEmitter<Users>();

  form: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      id: [this.user.id],
      name: [this.user.firstName, Validators.required],
      email: [this.user.email, Validators.required]
    });
  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.user) {
      this.form.patchValue({...this.user});
    }
  }

  submit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }

  }

}
