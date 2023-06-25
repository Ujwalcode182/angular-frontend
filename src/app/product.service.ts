import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = "https://product-admin-panel-api.vercel.app";

  constructor(private httpClient: HttpClient) { }
  
  getProductList(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseURL}/product/getProduct`) .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }
  
  createProduct(product:any): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/addProduct`, product);
  }

  updateProduct(id: number, product: any): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, product);
  }

  getProductbyId(id:number):Observable<Product>{
    return this.httpClient.get<Product>(`${this.baseURL}/${id}`);
  }

  deleteProduct(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}