import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../components/invoice/invoice.component';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailService {

  constructor(private httpClient: HttpClient) { }
  GetInvoiceDetail(id: string): Observable<Invoice> {
    return this.httpClient.get<Invoice>(
      `https://localhost:44349/api/ChiTietDonHang/getHaveName/${id}`
    );
  }
}
