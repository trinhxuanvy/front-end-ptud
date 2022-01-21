import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetailInvoice } from '../components/invoice-detail/invoice-detail.component';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailService {

  constructor(private httpClient: HttpClient) { }
  GetInvoiceDetail(id: string): Observable<DetailInvoice[]> {
    return this.httpClient.get<DetailInvoice[]>(
      `https://localhost:44349/api/ChiTietDonHang/getHaveName/${id}`
    );
  }
}
