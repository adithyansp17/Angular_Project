import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { orders } from '../../../models/order';
import { Users } from '../../../models/Users';
import { OrderService } from '../../../services/orders.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrl: './update-order.component.scss'
})
export class UpdateOrderComponent {
  order:orders=new orders('','','',0,[],[])
  order1:orders[]=[]
  oid:number=0
  // public OrderForm:FormGroup
  updateOrderFirstFormGroup:FormGroup
  updateSecondFormGroup:FormGroup
  dishListForm:FormGroup
  count: number=0;
  arrUsers:Users[]=[]
  idUpdated:string=''
  arrOrders:orders[]=[]
  cnt:number=0
  orderDate=""
  orderAmount=0
  
constructor(private _formBuilder: FormBuilder, private orderService:OrderService, private userService:UserService) {
  
  this.userService.getUsers().subscribe(data=>{this.arrUsers=data});
  console.log(this.arrUsers)

  this.updateOrderFirstFormGroup = this._formBuilder.group({
    'userId': ['', Validators.required],
    'id':['', Validators.required],
  });

  this.updateSecondFormGroup = this._formBuilder.group({
  });

  this.dishListForm = this._formBuilder.group({
    dishes: this._formBuilder.array([]) // Initialize addresses as a FormArray
  });

}

get dishControls() {
  return (this.dishListForm.get('dishes') as FormArray).controls;
}

  

  viewFirstStepData(formdata:FormGroup){

    this.oid=formdata.value.oid;
    
    this.orderService.getOrder().subscribe(data=>{
      this.order1=data
      console.log(this.order1)}
    );

    console.log(this.oid);
    
}

updateSecondStepData(formdata:FormGroup){
  console.log(formdata)
  }

  public removeOrClearOrder(i: number) {
  }
  

  onChangeUserId(evt:any){
    console.log(evt.target.value)
    var idObtained = evt.target.value
    this.idUpdated = (idObtained.split(':')[1].trim())
    console.log("this.idUpdated",this.idUpdated)
    
    this.orderService.getOrderByUserId(this.idUpdated).subscribe(data=>{
      this.arrOrders=data;
    })
      
  }
  onChangeOrderId(evt:any){
    var idObtained = evt.target.value
    console.log(evt.target.value)
    this.idUpdated = (idObtained.split(':')[1].trim())
    console.log("this.idUpdated",this.idUpdated)

    //To put date amount as it is
    this.orderService.getOrderByOrderId(this.idUpdated).subscribe(data=>{this.orderDate=data.orderDate
      this.orderAmount=data.orderAmount
    })

    this.orderService.getOrderByOrderId(this.idUpdated).subscribe(data=>{
      
      this.order=data

      const dishesFormArray = this.dishListForm.get('dishes') as FormArray;

      dishesFormArray.clear(); this.cnt=0
      this.order.arrDishes.forEach(dish => {
        const dishFormGroup = this._formBuilder.group({
          dName: [dish.dName, Validators.required],
          price: [dish.price, Validators.required],
          quantity : [this.order.quantity[this.cnt], Validators.required],
        });
        dishesFormArray.push(dishFormGroup);
      });
    }
  
    )
  }

  removeOrClearDish(index: number) {
    (this.dishListForm.get('dishes') as FormArray).removeAt(index);
  }

  UpdateOrderFormGroup() {
    const dishesFormArray = this._formBuilder.group({
      dName: [''],
      price: [''],
      quantity:['']
    });
    (this.dishListForm.get('dishes') as FormArray).push(dishesFormArray);
  }
  

  onSubmit():void{
    const id = this.updateOrderFirstFormGroup.get('id')?.value;
    
    const userId = this.updateOrderFirstFormGroup.get('userId')?.value;

    const dishData = this.dishListForm.value.dishes.map((dish: any) => ({
      id: dish.id,
      dName: dish.dName,
      price:parseInt(dish.price)
    }));


    const qtyData: number[] = this.dishListForm.value.dishes.map((dish: any) => parseInt(dish.quantity));
    this.orderAmount=0;
    this.orderAmount = dishData.reduce((total: number, dish: { price: number; }, index: number) => {
      const totalPrice = dish.price * qtyData[index];
      return total + totalPrice;
  }, 0);
    
    const updatedOrderData = {
      id: id,
      orderDate:this.orderDate,
      orderAmount:this.orderAmount,
      userId:userId,
      arrDishes: dishData,
      quantity:qtyData
    };

    this.orderService.updateOrder(id, updatedOrderData).subscribe(
      (updatedOrder) => {
        console.log('Restaurant updated successfully:', updatedOrder);
        console.log(updatedOrder.orderAmount)
      },
      (error) => {
        console.error('Failed to update restaurant:', error);
      }
    );
  }

}
