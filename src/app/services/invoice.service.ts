import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private httpClient: HttpClient) {}

  GetInfOfInvoicesByCus(id: string): Observable<any> {
    return this.httpClient.get(
      `https://localhost:44349/api/donhang/nguoimua/${id}`
    );
  }
  GetInfOfInvoicesByStore(id: string): Observable<any> {
    return this.httpClient.get(
      `https://localhost:44349/api/donhang/cuahang/${id}`
    );
  }
  CancelInvoice(id: string): Observable<any> {
    const body = { title: 'CancelInvoice' };
    return this.httpClient.put(
      `https://localhost:44349/api/donhang/huydonhang/${id}`,
      body
    );
  }
}
