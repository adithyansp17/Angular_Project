import { Address } from "./address"

export class Users{
    id: string
    firstName: string
    lastName: string
    role: string
    email:string
    password:string
    address:Address
    DOB:Date
    
    
    constructor(id:string,fn:string,ln:string,r:string,eml:string, pwd:string,add:Address,dob:Date){
        this.id=id
        this.firstName=fn
        this.lastName=ln
        this.role=r
        this.email=eml
        this.password=pwd
        this.address =add
        this.DOB = dob
    }
}
