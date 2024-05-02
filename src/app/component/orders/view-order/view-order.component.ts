// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-view-order',
//   templateUrl: './view-order.component.html',
//   styleUrl: './view-order.component.scss'
// })
// export class ViewOrderComponent {

// }

import { Component } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { orders } from '../../../models/order';
import { Users } from '../../../models/Users';
import { UserService } from '../../../services/user.service';
import { OrderService } from '../../../services/orders.service';


@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.scss'
})
export class ViewOrderComponent {
  arrOrders:orders[]=[]
  arrOrders1:orders[]=[]
  arrUsers:Users[]=[]
  idUpdated:string=''
  idUpdated1:string=''
  order:orders=new orders('','', '',0,[],[])

  constructor(private _formBuilder: FormBuilder, private orderService:OrderService, private userService:UserService){

    this.userService.getUsers().subscribe(data=>{this.arrUsers=data});

    this.orderService.getOrder().subscribe(data=>{
      this.arrOrders=data;
    })
  }

  onChangeUserId(evt:any){
    console.log(evt.target.value)
    var idObtained = evt.target.value
    this.idUpdated = (idObtained.split(':')[1].trim())
    console.log("this.idUpdated",this.idUpdated)
    
    this.orderService.getOrderByUserId(this.idUpdated).subscribe(data=>{
      this.arrOrders1=data;
    })
      
  }

  onChangeOrderId(evt:any){
    console.log(evt.target.value)
    var idObtained1 = evt.target.value
    this.idUpdated1 = (idObtained1.split(':')[1].trim())
    console.log("this.idUpdated",this.idUpdated1)

    this.orderService.getOrderByOrderId(this.idUpdated1).subscribe(data=>{
      
      this.order=data
      console.log(data)

      });
    }
  
}

