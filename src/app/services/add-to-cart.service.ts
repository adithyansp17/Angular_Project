import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Carts } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class AddToCartService {
  constructor(private httpClient: HttpClient) {}

  baseUrl: string = 'http://localhost:3000';

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  httpError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = 'Error code:${error.status}\nMessage:${error.message}';
    }
    return throwError(msg);
  }

  getCart(): Observable<Carts[]> {
    return this.httpClient
      .get<Carts[]>(this.baseUrl + '/carts')
      .pipe(catchError(this.httpError));
  }

  getCartById(rid: string): Observable<Carts> {
    return this.httpClient
      .get<Carts>(this.baseUrl + '/carts/' +rid)
      .pipe(catchError(this.httpError));
  }

  updateCart(rid: string, updatedCartData: any): Observable<Carts> {
    return this.httpClient
      .put<Carts>(
        this.baseUrl + '/carts/' + rid,
        updatedCartData,
        this.httpHeader
      )
      .pipe(catchError(this.httpError));
  }

  AddCart(updatedCartData: any): Observable<Carts> {
    return this.httpClient
      .post<Carts>(this.baseUrl + '/carts/', updatedCartData, this.httpHeader)
      .pipe(catchError(this.httpError));
  }

  DeleteCart(id: string): Observable<any> {
    return this.httpClient
      .delete<Carts>(this.baseUrl + '/carts/' + id)
      .pipe(catchError(this.httpError));
  }
}
