import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly apiURL = 'https://localhost:44349/api/nguoidung/cart';
  constructor(private httpClient: HttpClient) { }
  getCartById(id:String):Observable<any>{
    return this.httpClient.get(this.apiURL+`/${id}`);
  }
  insertProductToCart(proid:String,cusid:string):Observable<any>{
    return this.httpClient.get(this.apiURL+`/${cusid}/${proid}`);
  }
  updateNumProductInCart(cusid:String,proid:String,num:number):Observable<any>{
    return this.httpClient.get(this.apiURL+`/${cusid}/${proid}/${num}`);
  }

  uploadCus(cus: any): Observable<any> {
    return this.httpClient.put<any>('https://localhost:44349/api/nguoidung', cus);
  }
}
