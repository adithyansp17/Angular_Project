import { Injectable } from '@angular/core';
import { Users } from '../models/Users';
import { Address } from '../models/address';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { orders } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  arrUser:Users[]
  constructor(private httpClient: HttpClient) { 
    this.arrUser = []
    //   new Users(1,"John","Doe","user","johnd@gmail.com","password",new Address(1,"123","3rd Cross St.","Madiwala","Bangalore","580056","India")),
    //   new Users(2,"Mary","Jane","user","Maryj@gmail.com","password",new Address(2,"234","2nd Cross St.","Victoria Layout","Bangalore","580057","India")),
    //   new Users(3,"Admin","l","admin","admin","admin",new Address(3,"345","1st Cross St.","St. Johns Hsptl","Bangalore","580058","India"))
    // ]
  }

  baseUrl: string = "http://localhost:3000";

  httpHeader = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  httpError(error: HttpErrorResponse) {
    let msg = "";
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = "Error code:${error.status}\nMessage:${error.message}";
    }
    return throwError(msg);
  }

  getUsers():Observable<Users[]>
  {
    return this.httpClient
    .get<Users[]>(this.baseUrl + "/users")
    .pipe(catchError(this.httpError));
  }

  getUserById(id:string):Observable<Users>{
    return this.httpClient
    .get<Users>(this.baseUrl + "/users/" + id)
    .pipe(catchError(this.httpError));
  }

  getOrderById(id:string):Observable<orders>{
    return this.httpClient
    .get<orders>(this.baseUrl + "/orders/userId" + id)
    .pipe(catchError(this.httpError));
  }

  
  AddUser(u:Users):Observable<Users>{
    return this.httpClient
    .post<Users>(this.baseUrl + "/users",JSON.stringify(u),this.httpHeader)
    .pipe(catchError(this.httpError));
  }

  UpdateUser(id:string, updatedUser:any):Observable<Users>{
    return this.httpClient
    .put<Users>(this.baseUrl + "/users/" + id,updatedUser,this.httpHeader)
    .pipe(catchError(this.httpError));
  }

 
}
