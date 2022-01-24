import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice, InvoiceDetail } from '../components/invoice/invoice.component';
import { Detail, Response } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailService {
  private readonly apiUrl = "https://localhost:44349/api/ChiTietDonHang";

  constructor(private httpClient: HttpClient) { }
  GetInvoiceDetail(id: string): Observable<Invoice> {
    return this.httpClient.get<Invoice>(
      `https://localhost:44349/api/ChiTietDonHang/getHaveName/${id}`
    );
  }

  getInvoiceDetailByInvoice(id: string): Observable<Detail[]> {
    return this.httpClient.get<Detail[]>(this.apiUrl + "/" + id);
  }

  getAllInvoiceOfStore(id: string): Observable<Response[]> {
    return this.httpClient.get<Response[]>(this.apiUrl + "/store/" + id);
  }
}
