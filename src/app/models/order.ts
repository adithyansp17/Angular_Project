import { Dishes } from "./dishes"

export class orders{
    id: string
    userId: string
    orderDate:string
    orderAmount: number
    arrDishes:Dishes[]
    quantity:number[]
    constructor(id:string,rid:string,date:string,amt:number,dlist:Dishes[],qty:number[]){
        this.id=id
        this.userId=rid
        this.orderDate = date
        this.orderAmount =amt
        this.arrDishes = dlist
        this.quantity = qty
    }
}