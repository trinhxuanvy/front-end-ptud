import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiURL = 'https://localhost:44349/api/sanpham';

  constructor(private http: HttpClient) {}

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(this.apiURL + `/${id}`);
  }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURL);
  }

  getProductByStoreID(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURL + `/store/` + `${id}`);
  }
  getProductsByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURL + `/find/${name}`);
  }
  geEssentialProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURL + `/essential`);
  }

  getProductById2(id: any): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURL + `/${id}`);
  }
  upLoadProductsByExcel(form:FormData,id:String):Observable<Product[]>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const httpOptions = { headers: headers };
    return this.http.post<Product[]>(this.apiURL+`/uploadexcel/${id}`,form,httpOptions);
  }
}
