import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RestaurantService } from '../../../services/restaurantService';
import { Address } from '../../../models/address';
import { Resturants } from '../../../models/restaurant';
import { Dishes } from '../../../models/dishes';

@Component({
  selector: 'app-add-restauarnt',
  templateUrl: './add-restauarnt.component.html',
  styleUrl: './add-restauarnt.component.scss',
})
export class AddRestauarntComponent {
  count: number = 0;
  countSecondFormSubmit: number = 0;
  restaurant: Resturants;
  arrAddress: Address[] = [];
  isLinear = false;
  addId: string = "1";
  dishId: string = "1";
  thirdFormGroup: FormGroup;
  dishListForm: FormGroup;
  iid:number= 0;

  public addressListForm: FormGroup;

  firstFormGroup = this.formBuilder.group({
    rNameCtrl: ['', Validators.required],
    rLocationCtrl: ['', Validators.required],
    ROpen: ['yes']
    //rUserIdCtrl: ['', Validators.required],
  });

  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  countThirdFormSubmit: any;

  constructor(
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantService
  ) {
    this.restaurant = new Resturants('', '', '', [], [], true);
    this.thirdFormGroup = this.formBuilder.group({
      dName: ['', Validators.required],
    });
    this.addressListForm = this.formBuilder.group({
      addresses: this.formBuilder.array([this.createAddressListFormGroup()]),
    });

    this.dishListForm = this.formBuilder.group({
      dishes: this.formBuilder.array([this.createDishFormGroup()]),
    });
  }

  createAddressListFormGroup(): FormGroup {
    this.count++;
    return new FormGroup({
      houseno: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      area: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    });
  }

  createDishFormGroup(): FormGroup {
    return this.formBuilder.group({
      dName: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      img_path: new FormControl('', Validators.required),
      isAvailable: new FormControl('yes'),
    });
  }

  saveFirstStepData(formData: FormGroup) {
    if (formData.valid) {
      console.log(formData.value);
      this.restaurantService.getRestaurant().subscribe((data) => {
        const largestId = Math.max(...data.map((item) => parseInt(item.id)));
        console.log(largestId);
        this.restaurant.id = (largestId + 1).toString();
      });
      this.restaurant.rName = formData.value.rNameCtrl;
      this.restaurant.location = formData.value.rLocationCtrl;
      this.restaurant.ROpen = formData.value.ROpen;
    }
  }

  saveSecondStepData(formdata: FormGroup) {
    if (formdata.valid) {
      this.countSecondFormSubmit++;
      console.log(this.restaurant);
      if (this.countSecondFormSubmit === this.count) {
        console.log(formdata);
      }

      const addressesArray = formdata.get('addresses') as FormArray;
      
      addressesArray.controls.forEach((control: AbstractControl) => {
        const addressFormGroup = control as FormGroup;
        console.log(addressFormGroup.value);
        this.iid = parseInt(this.addId)+1
        this.restaurant.arrAddress.push(
          new Address(
            this.iid.toString(),
            addressFormGroup.value.houseno,
            addressFormGroup.value.street,
            addressFormGroup.value.area,
            addressFormGroup.value.city,
            addressFormGroup.value.pincode,
            addressFormGroup.value.country
          )
        );
      });

      console.log(this.restaurant);
    }
  }

  getAddressControls(): AbstractControl[] {
    return (this.addressListForm.get('addresses') as FormArray).controls;
  }

  getAddressControl(index: number): AbstractControl {
    return (this.addressListForm.get('addresses') as FormArray).at(index);
  }

  Addresses(): FormArray {
    return this.addressListForm.get('addresses') as FormArray;
  }

  public addItineryFormGroup() {
    const addresses = this.addressListForm.get('addresses') as FormArray;
    addresses.push(this.createAddressListFormGroup());
  }

  public removeOrClearItinery(i: number) {
    const addresses = this.addressListForm.get('addresses') as FormArray;
    if (addresses.length > 1) {
      addresses.removeAt(i);
    } else {
      addresses.reset();
    }
  }

  Dishes(): FormArray {
    return this.dishListForm.get('dishes') as FormArray;
  }

  addDishFormGroup(): void {
    const dishes = this.dishListForm.get('dishes') as FormArray;
    dishes.push(this.createDishFormGroup());
  }

  removeOrClearDish(index: number): void {
    const dishes = this.dishListForm.get('dishes') as FormArray;
    if (dishes.length > 1) {
      dishes.removeAt(index);
    } else {
      dishes.reset();
    }
  }

  saveThirdStepData(formData: FormGroup): void {
    this.countThirdFormSubmit++;

    console.log(this.restaurant);

    if (this.countThirdFormSubmit === this.count) {
      console.log(formData);
    }

    const dishArr = Object.values(formData);
    console.log(dishArr[0]);

    dishArr[0].forEach((dish: any) => {
      console.log(dish);
      this.iid = parseInt(this.dishId)+1
      this.restaurant.dishlist.push(
        new Dishes(
          this.iid.toString(),
          dish.dName,
          dish.price,
          this.restaurant.id,
          dish.img_path,
          dish.isAvailable
        )
      );
    });

    console.log(this.restaurant);

    this.restaurantService.addRestaurant(this.restaurant).subscribe((data) => {
      console.log(data);
    });
  }
}
