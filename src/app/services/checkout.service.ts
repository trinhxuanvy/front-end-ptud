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
  makeInvoice(invoice: any): Observable<any> {
    return this.httpClient.post(`https://localhost:44349/api/donhang`, invoice);
  }
  makeInvoiceDetails(invoicedetails: any): Observable<any> {
    return this.httpClient.post(
      `https://localhost:44349/api/chitietdonhang`,
      invoicedetails
    );
  }
  goToStripe(): Observable<any> {
    const body = { title: 'GoToStripe' };
    return this.httpClient.post(
      `https://localhost:44349/api/checkout/online`,
      body
    );
  }

  goToStrip1e(): Observable<any> {
    const body = { title: 'GoToStripe' };
    return this.httpClient.post(
      `http://localhost:44348/online`,
      body
    );
  }
  clearCart(id: string): Observable<any> {
    const body = { title: 'ClearCart' };
    return this.httpClient.put(
      `https://localhost:44349/api/nguoidung/xoagiohang/${id}`,
      body
    );
  }
  doSomeThingWithPaymentByHand() {
    return 'doSomeThingWithPaymentByHand';
  }
}
