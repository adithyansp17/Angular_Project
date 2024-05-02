import { Component } from '@angular/core';
import { Address } from '../../../models/address';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RestaurantService } from '../../../services/restaurantService';
import { Resturants } from '../../../models/restaurant';
import { Dishes } from '../../../models/dishes';

@Component({
  selector: 'app-edit-restauarnt',
  templateUrl: './edit-restauarnt.component.html',
  styleUrl: './edit-restauarnt.component.scss',
})
export class EditRestauarntComponent {
  isLinear = false;
  arrRes: Resturants[] = [];
  firstFormGroup: FormGroup;
  idup: string = '';
  r: Resturants = new Resturants('', '', '', [], [], true);
  secondFormGroup: FormGroup;
  addressListForm: FormGroup;
  thirdFormGroup: FormGroup;
  dishListForm: FormGroup;
  tempRes: Resturants = new Resturants('', '', '', [], [], true);
  arrAdd: Address[] = [];
  tempAdd: Address = new Address('', '', '', '', '', '', '');
  tempDish: Dishes = new Dishes('', '', 0, '', '', true);
  addId: number = 1;
  dishId: number = 1;

  constructor(private fb: FormBuilder, private restService: RestaurantService) {
    this.firstFormGroup = this.fb.group({
      id: [null],
      rNameCtrl: [''],
      ROpen:['']
    });

    this.secondFormGroup = this.fb.group({});

    this.addressListForm = this.fb.group({
      addresses: this.fb.array([]),
    });

    this.thirdFormGroup = this.fb.group({
      dishes: this.fb.array([]),
    });

    this.dishListForm = this.fb.group({
      dishes: this.fb.array([]),
    });

    restService.getRestaurant().subscribe((data) => {
      this.arrRes = data;
    });
  }

  get addressControls() {
    return (this.addressListForm.get('addresses') as FormArray).controls;
  }

  get dishControls() {
    return (this.dishListForm.get('dishes') as FormArray).controls;
  }

  saveThirdStepData(formData: any) {
    console.log('Saved:', formData);
  }

  onSubmit(): void {
    const id = this.firstFormGroup.get('id')?.value;
    const rName = this.firstFormGroup.get('rNameCtrl')?.value;
    const open = this.firstFormGroup.get('ROpen')?.value;

    const addressData = this.addressListForm.value.addresses.map(
      (address: any) => ({
        id: address.id,
        houseno: address.houseno,
        street: address.street,
        area: address.area,
        city: address.city,
        pincode: address.pincode,
        country: address.country,
      })
    );

    const dishData = this.dishListForm.value.dishes.map((dish: any) => ({
      id: dish.id,
      dName: dish.dName,
      price: dish.price,
      img_path: dish.img_path,
      isAvailable: dish.isAvailable,
    }));

    const updatedRestaurantData = {
      id: id,
      rName: rName,
      ROpen:open,
      arrAddress: addressData,
      dishlist: dishData,
    };

    this.restService.updateRestaurant(id, updatedRestaurantData).subscribe(
      (updatedRestaurant) => {
        console.log('Restaurant updated successfully:', updatedRestaurant);
      },
      (error) => {
        console.error('Failed to update restaurant:', error);
      }
    );
  }

  onChangeType(evt: any) {
    const selectedRestaurantId = evt.target.value;
    this.idup = (selectedRestaurantId.split(':')[0].trim());
    console.log('This.idup: ', this.idup);

    this.restService.getRestById(this.idup).subscribe((data) => {
      console.log('Restaurant data:', data);
      this.r = data;
      if (this.r) {
        this.firstFormGroup.get('rNameCtrl')?.setValue(this.r.rName);
        this.firstFormGroup.get('ROpen')?.setValue(this.r.ROpen?'yes':'no');

        const addressesFormArray = this.addressListForm.get(
          'addresses'
        ) as FormArray;
        addressesFormArray.clear();
        if (this.r.arrAddress) {
          this.r.arrAddress.forEach((address) => {
            const addressFormGroup = this.fb.group({
              houseno: [address.houseno, Validators.required],
              street: [address.street, Validators.required],
              area: [address.area, Validators.required],
              city: [address.city, Validators.required],
              pincode: [address.pincode, Validators.required],
              country: [address.country, Validators.required],
            });
            addressesFormArray.push(addressFormGroup);
          });
        }

        const dishesFormArray = this.dishListForm.get('dishes') as FormArray;
        dishesFormArray.clear();
        if (this.r.dishlist) {
          console.log('has dishes');
          this.r.dishlist.forEach((dish) => {
            const dishFormGroup = this.fb.group({
              dName: [dish.dName, Validators.required],
              price: [dish.price, Validators.required],
              img_path: [dish.img_path],
              isAvailable: [dish.isAvailable ? 'yes' : 'no'],
            });
            dishesFormArray.push(dishFormGroup);
          });
        }
      }
    });
  }

  addItineraryFormGroup() {
    const addressFormGroup = this.fb.group({
      houseno: [''],
      street: [''],
      area: [''],
      city: [''],
      pincode: [''],
      country: [''],
    });

    (this.addressListForm.get('addresses') as FormArray).push(addressFormGroup);
  }

  removeOrClearItinery(index: number) {
    (this.addressListForm.get('addresses') as FormArray).removeAt(index);
  }

  addDishFormGroup() {
    const dishesFormArray = this.fb.group({
      dName: ['', Validators.required],
      price: ['', Validators.required],
      img_path: [''],
      isAvaiable: ['yes'],
    });

    (this.dishListForm.get('dishes') as FormArray).push(dishesFormArray);
  }

  removeOrClearDish(index: number) {
    (this.dishListForm.get('dishes') as FormArray).removeAt(index);
  }

  saveSecondStepData(formData: any) {
    console.log(formData);
  }
}
