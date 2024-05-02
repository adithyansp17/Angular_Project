import { Dishes } from "./dishes"

export class Carts{
    id: string
    Amount: number
    arrDishes: Dishes[]
    quantity: number[]
    
    
    constructor(id:string,p:number,disharr:Dishes[],qty:number[]){
        this.id=id
        this.Amount = p
        this.arrDishes = disharr
        this.quantity =qty
    }
}