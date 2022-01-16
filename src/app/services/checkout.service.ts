import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private httpClient: HttpClient) {}
  getInformation(id: string): Observable<any> {
    return this.httpClient.get(`https://localhost:44349/api/checkout/${id}`);
  }
  
}
