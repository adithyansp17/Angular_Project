import { Injectable } from '@angular/core';
import { Dishes } from '../models/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {
    arrDish:Dishes[]
  constructor() {
    this.arrDish=[]
    //   new Dishes(1,"Burger",120,1,"../../../assets/images/images.jpg"),
    //   new Dishes(2,"Sandwich",50,1,"../../../assets/images/images (1).jpg"),
    //   new Dishes(3,"Cola",20,1,"../../../assets/images/images (2).jpg"),
    //   new Dishes(1,"Rolls",100,2,"../../../assets/images/images (3).jpg"),
    //   new Dishes(2,"Cream",40,2,"../../../assets/images/images (4).jpg"),
    //   new Dishes(1,"Masaladosa",30,3,"../../../assets/images/images (5).jpg"),
    //   new Dishes(2,"Tea",10,3,"../../../assets/images/images (6).jpg"),
    //   new Dishes(3,"Rice",50,3,"../../../assets/images/images (7).jpg")
    // ]
   }
   getDishes(){
    return this.arrDish
   }
}
