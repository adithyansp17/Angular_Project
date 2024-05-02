import { Injectable } from "@angular/core";
import { Dishes } from "../models/dishes";
import { Resturants } from "../models/restaurant";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class RestaurantService {
  arrRes: Resturants[];
  constructor(private httpClient: HttpClient) {
    this.arrRes = [];
    //   new Resturants(1,"KFC",3,[
    //     new Dishes(1,"Burger",120,1,"../../../assets/images/images.jpg"),
    //     new Dishes(2,"Sandwich",50,1,"../../../assets/images/images (1).jpg"),
    //     new Dishes(3,"Cola",20,1,"../../../assets/images/images (2).jpg")
    //   ],[

    //   ]),
    //   new Resturants(2,"BR",3,[
    //     new Dishes(1,"Rolls",100,2,"../../../assets/images/images (3).jpg"),
    //     new Dishes(2,"Cream",40,2,"../../../assets/images/images (4).jpg")
    //   ],[

    //   ]),
    //   new Resturants(3,"Chaithanya",3,[
    //     new Dishes(1,"Masaladosa",30,3,"../../../assets/images/images (5).jpg"),
    //     new Dishes(2,"Tea",10,3,"../../../assets/images/images (6).jpg"),
    //     new Dishes(3,"Rice",50,3,"../../../assets/images/images (7).jpg")
    //   ],[

    //   ])
    //  ]
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

  getRestaurant(): Observable<Resturants[]> {
    return this.httpClient
      .get<Resturants[]>(this.baseUrl + "/restaurants")
      .pipe(catchError(this.httpError));
  }

  getRestById(rid: string) : Observable<Resturants>{
    return this.httpClient
      .get<Resturants>(this.baseUrl + "/restaurants/" + rid)
      .pipe(catchError(this.httpError));
  }


  addRestaurant(r:Resturants):Observable<Resturants>{
    return this.httpClient
    .post<Resturants>(this.baseUrl + "/restaurants",JSON.stringify(r),this.httpHeader)
    .pipe(catchError(this.httpError));

  }

  updateRestaurant(rid: string, updatedRestaurantData: any): Observable<Resturants> {
    return this.httpClient
      .put<Resturants>(`${this.baseUrl}/restaurants/${rid}`, updatedRestaurantData, this.httpHeader)
      .pipe(catchError(this.httpError));
  }
  
  deleteRestaurant(rid: string): Observable<any> {
    return this.httpClient
      .delete<any>(this.baseUrl + "/restaurants/" + rid)
      .pipe(catchError(this.httpError));
  }
  
}  
