import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface user {
  userId : number;
  name : string;
}

export interface product {
  productId:number;
  name:string;
  description:string;
  category:string;
  price: number;
  quantity:number;
}

export interface cart {
  productId:number;
  userId: number;
  quantity:number;
}

export interface order {
  orderId:number;
  userId: number;
  totalPrice:number;
}

export interface productOrdered {
  productId:number;
  orderId: number;
  quantity: number;
}
@Injectable({
  providedIn: 'root'
})
export class HttpFacadeService {

  private backendUrl = 'http://localhost:3000';
  constructor(private httpClient:HttpClient) { }

  getProduct(productId: number): Observable<product> {
    return this.httpClient.get<product>(`${this.backendUrl}/products/${productId}`);
  }

  getAllProducts(): Observable<product[]> {
    return this.httpClient.get<product[]>(`${this.backendUrl}/products`);
  }
}
