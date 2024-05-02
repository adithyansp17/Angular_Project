// import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, catchError, throwError } from 'rxjs';
// import { orders } from '../models/order';

// @Injectable({
//   providedIn: 'root'
// })
// export class OrdersService {

//   constructor(private httpClient: HttpClient) { }

//   baseUrl: string = "http://localhost:3000";

//   httpHeader = {
//     headers: new HttpHeaders({
//       "Content-Type": "application/json",
//     }),
//   };

//   httpError(error: HttpErrorResponse) {
//     let msg = "";
//     if (error.error instanceof ErrorEvent) {
//       msg = error.error.message;
//     } else {
//       msg = "Error code:${error.status}\nMessage:${error.message}";
//     }
//     return throwError(msg);
//   }

//   addOrder(or:orders):Observable<orders>{
//     return this.httpClient
//     .post<orders>(this.baseUrl + "/orders",JSON.stringify(or),this.httpHeader)
//     .pipe(catchError(this.httpError));

//   }
// }


import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { orders } from '../models/order';
import { Users } from '../models/Users';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  arrOrders:orders[]
  
   constructor(private httpClient:HttpClient){
    this.arrOrders=[]}

    baseUrl:string="http://localhost:3000"

    httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  httpError(error:HttpErrorResponse){ 
    let msg=""
    if(error.error instanceof ErrorEvent){
      msg=error.error.message
    }
    else{
      msg='Error code:${error.status}\nMessage:${error.message}';
    }
    return throwError(msg)
  }

  addOrder(o:orders):Observable<orders>{
    console.log(o)
    return this.httpClient.post<orders>(this.baseUrl+'/orders',JSON.stringify(o),this.httpHeader)
    .pipe(
        catchError(this.httpError)
    )
  }

getOrder():Observable<orders[]> {
return this.httpClient.get<orders[]>(this.baseUrl+'/orders')
.pipe(
  catchError(this.httpError)
)
}

updateOrder(oid:number,updatedOrderData:any):Observable<orders>{
return this.httpClient.put<orders>(this.baseUrl+'/orders/'+oid,updatedOrderData,this.httpHeader)
.pipe(
  catchError(this.httpError)
)
}

getOrderByUserId(uid:string):Observable<orders[]> {
return this.httpClient.get<orders[]>(this.baseUrl+'/orders?userId='+uid)
.pipe(
  catchError(this.httpError)
)
}

getOrderByOrderId(oid:string):Observable<orders> {
  return this.httpClient.get<orders>(this.baseUrl+'/orders/'+oid)
  .pipe(
    catchError(this.httpError)
  )
  }

// Add Order
// addOrder(u:User):Observable<User>{
// return this.httpClient.post<User>(this.baseUrl+'/users',JSON.stringify(u),this.httpHeader)
// .pipe(
//   catchError(this.httpError)
// )
// }
}